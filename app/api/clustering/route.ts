import { NextResponse } from 'next/server';
import { kMeansClustering, evaluateClusterQuality } from '@/lib/analytics/clustering';
import { calculateAllIndices } from '@/lib/analytics/composite-index';
import { DistrictData } from '@/types';

export async function POST(request: Request) {
  try {
    const { data, numberOfClusters = 4 } = await request.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      );
    }

    // Validate numberOfClusters
    const k = Math.max(2, Math.min(numberOfClusters, Math.floor(data.length / 2)));

    // Transform input data
    const districtData: DistrictData[] = data.map((d: any) => ({
      id: d.id || `district_${Math.random()}`,
      name: d.name || d.district || 'Unknown',
      region: d.region || d.regionId || 'Unknown',
      population: d.population || 0,
      indicators: d.indicators || d
    }));

    // Calculate composite indices
    const indicesData = districtData.map(district => {
      const allIndices = calculateAllIndices(district, districtData);
      return {
        id: district.id,
        name: district.name,
        value: allIndices.compositeIndex,
        ...allIndices
      };
    });

    // Perform clustering
    const clusteringResult = kMeansClustering(indicesData, k);

    // Calculate cluster statistics
    const clusterStats = [];
    for (let i = 0; i < k; i++) {
      const cluster = clusteringResult.clusters.get(i) || [];
      const clusterValues = cluster.map(d => (d as any).compositeIndex || 0);

      clusterStats.push({
        cluster: i,
        count: cluster.length,
        avgCompositeIndex: clusterValues.length > 0 ? clusterValues.reduce((a, b) => a + b) / clusterValues.length : 0,
        minIndex: clusterValues.length > 0 ? Math.min(...clusterValues) : 0,
        maxIndex: clusterValues.length > 0 ? Math.max(...clusterValues) : 0,
        districts: Array.from(cluster).map((d: any) => ({
          id: d.id,
          name: d.name
        }))
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        clusters: clusterStats,
        centroids: clusteringResult.centroids,
        silhouetteScore: clusteringResult.silhouetteScore,
        clusterQuality: evaluateClusterQuality(clusteringResult.silhouetteScore),
        inertia: clusteringResult.inertia,
        iterations: clusteringResult.iterations,
        districtClusterAssignments: indicesData.map(d => ({
          id: d.id,
          name: d.name,
          cluster: clusteringResult.assignments.get(d.id),
          distance: clusteringResult.distances.get(d.id),
          compositeIndex: d.compositeIndex
        }))
      }
    });
  } catch (error) {
    console.error('Clustering error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Clustering failed', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Clustering API - POST data for clustering analysis'
  });
}
