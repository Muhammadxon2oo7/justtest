import { NextResponse } from 'next/server';
import { calculateCV, calculateGini, calculateTheil, calculateDecileRatio, calculateStdDeviation } from '@/lib/analytics/inequality';
import { kMeansClustering, evaluateClusterQuality } from '@/lib/analytics/clustering';
import { calculateAllIndices, getClusterLabel } from '@/lib/analytics/composite-index';
import { DistrictData, AnalysisResult, InequalityMetrics } from '@/types';

// Validation function
function validateAnalysisInput(data: any, year: any): {valid: boolean; errors: string[]} {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
  }

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    errors.push('Year must be a valid integer between 2000 and 2100');
  }

  if (data.length === 0) {
    errors.push('At least one district must be provided');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function POST(request: Request) {
  try {
    const { data, year, regionId } = await request.json();

    // Validate input
    const validation = validateAnalysisInput(data, year);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Transform input data
    const districtData: DistrictData[] = data.map((d: any) => ({
      id: d.id || `district_${Math.random()}`,
      name: d.name || d.district || 'Unknown',
      region: d.region || d.regionId || regionId || 'Unknown',
      population: d.population || 0,
      indicators: d.indicators || d
    }));

    // Calculate composite indices for each district
    const indicesData = districtData.map(district => {
      const allIndices = calculateAllIndices(district, districtData);
      return {
        id: district.id,
        name: district.name,
        region: district.region,
        ...allIndices,
        cluster: getClusterLabel(allIndices.compositeIndex)
      };
    });

    // Get composite values for inequality calculations
    const compositeValues = indicesData.map(d => d.compositeIndex);

    // Calculate inequality metrics
    const inequality: InequalityMetrics = {
      cv: calculateCV(compositeValues),
      gini: calculateGini(compositeValues),
      theil: calculateTheil(compositeValues),
      decileRatio: calculateDecileRatio(compositeValues),
      timestamp: new Date()
    };

    // Prepare data for clustering
    const clusteringData = indicesData.map(d => ({
      value: d.compositeIndex,
      ...d
    }));

    // Perform K-means clustering
    const clustering = kMeansClustering(clusteringData, 4);

    // Generate ranking
    const ranking = indicesData
      .map((d, i) => ({
        ...d,
        rank: 0,
        percentile: 0
      }))
      .sort((a, b) => b.compositeIndex - a.compositeIndex)
      .map((d, i) => ({
        ...d,
        rank: i + 1,
        percentile: ((i + 1) / indicesData.length) * 100
      }));

    // Calculate summary statistics
    const summary = {
      totalDistricts: districtData.length,
      avgCompositeIndex: compositeValues.reduce((a, b) => a + b) / compositeValues.length,
      maxCompositeIndex: Math.max(...compositeValues),
      minCompositeIndex: Math.min(...compositeValues),
      stdDeviation: calculateStdDeviation(compositeValues)
    };

    const result: AnalysisResult = {
      success: true,
      data: {
        year,
        regionId: regionId || 'ALL',
        inequality,
        clustering: {
          clusters: new Map(Array.from(clustering.clusters.entries()).map(([k, v]) => [
            k,
            v.map(item => ({
              id: item.id,
              name: item.name || '',
              region: '',
              population: 0,
              year: year || new Date().getFullYear(),
              indicators: {}
            }))
          ])),
          centroids: clustering.centroids,
          silhouetteScore: clustering.silhouetteScore,
          inertia: clustering.inertia,
          districtClusterAssignments: Array.from(clustering.assignments.entries()).map(([id, cluster]) => ({
            id,
            name: indicesData.find(d => d.id === id)?.name || id,
            cluster,
            distance: clustering.distances.get(id) || 0,
            compositeIndex: indicesData.find(d => d.id === id)?.compositeIndex || 0
          }))
        },
        ranking,
        summary,
        generatedAt: new Date().toISOString()
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Analysis failed', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Analysis API - POST data for analysis'
  });
}
