/**
 * Composite Index Calculation
 * Combines multiple indicators into a single development index
 */

import { normalizeMinMax, normalizeZScore, calculateStdDeviation } from './inequality';
import { INDICATOR_CATEGORIES, DEFAULT_WEIGHTS } from '@/lib/data/regions';
import { DistrictData } from '@/types';

/**
 * Normalize indicators for composite index
 * Handles direction (higher/lower) and range considerations
 */
export function normalizeIndicators(district: DistrictData, allDistricts: DistrictData[]): Record<string, number> {
  const normalized: Record<string, number> = {};

  for (const category of INDICATOR_CATEGORIES) {
    for (const indicator of category.indicators) {
      const indicatorId = indicator.id;
      const value = district.indicators[indicatorId];

      if (value === undefined || value === null) {
        normalized[indicatorId] = 0;
        continue;
      }

      // Get all values for this indicator across all districts
      const allValues = allDistricts
        .map(d => d.indicators[indicatorId])
        .filter(v => v !== undefined && v !== null && !isNaN(v));

      if (allValues.length === 0) {
        normalized[indicatorId] = 0;
        continue;
      }

      // Find min and max
      const min = Math.min(...allValues);
      const max = Math.max(...allValues);

      // Normalize to 0-1 scale
      let normalizedValue = normalizeMinMax(value, min, max);

      // Invert if direction is 'lower' (unemployment, poverty, etc.)
      if (indicator.direction === 'lower') {
        normalizedValue = 1 - normalizedValue;
      }

      // Clamp to 0-1 range
      normalized[indicatorId] = Math.max(0, Math.min(1, normalizedValue));
    }
  }

  return normalized;
}

/**
 * Calculate index for a specific category
 */
export function calculateCategoryIndex(
  normalizedIndicators: Record<string, number>,
  categoryId: string
): number {
  const category = INDICATOR_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return 0;

  const categoryValues: number[] = [];

  for (const indicator of category.indicators) {
    const value = normalizedIndicators[indicator.id];
    if (value !== undefined && !isNaN(value)) {
      categoryValues.push(value);
    }
  }

  if (categoryValues.length === 0) return 0;

  // Calculate weighted average
  const sum = categoryValues.reduce((a, b) => a + b, 0);
  return sum / categoryValues.length;
}

/**
 * Calculate composite development index
 * Weights: Economic (30%), Social (25%), Infrastructure (30%), Demographic (15%)
 */
export function calculateCompositeIndex(
  district: DistrictData,
  allDistricts: DistrictData[] = [district],
  weights = DEFAULT_WEIGHTS
): number {
  // Normalize all indicators
  const normalized = normalizeIndicators(district, allDistricts);

  // Calculate category indices
  const categoryIndices: Record<string, number> = {};
  let totalWeight = 0;
  let weightedSum = 0;

  for (const category of INDICATOR_CATEGORIES) {
    const categoryIndex = calculateCategoryIndex(normalized, category.id);
    categoryIndices[category.id] = categoryIndex;

    const weight = weights[category.id as keyof typeof weights] || 0;
    weightedSum += categoryIndex * weight;
    totalWeight += weight;
  }

  // Calculate final composite index
  const compositeIndex = totalWeight > 0 ? weightedSum / totalWeight : 0;

  return Math.max(0, Math.min(1, compositeIndex));
}

/**
 * Calculate all indices for a district
 */
export function calculateAllIndices(
  district: DistrictData,
  allDistricts: DistrictData[]
) {
  const normalized = normalizeIndicators(district, allDistricts);

  const indices = {
    compositeIndex: calculateCompositeIndex(district, allDistricts),
    economic: calculateCategoryIndex(normalized, 'economic'),
    social: calculateCategoryIndex(normalized, 'social'),
    demographic: calculateCategoryIndex(normalized, 'demographic'),
    infrastructure: calculateCategoryIndex(normalized, 'infrastructure'),
    raw: normalized
  };

  return indices;
}

/**
 * Assign cluster label based on composite index
 */
export function getClusterLabel(index: number): number {
  if (index >= 0.75) return 1; // High development
  if (index >= 0.5) return 2;  // Medium-high
  if (index >= 0.25) return 3; // Medium-low
  return 4; // Low development
}

/**
 * Get cluster name
 */
export function getClusterName(cluster: number): string {
  const names: Record<number, string> = {
    1: 'High Development',
    2: 'Medium-High Development',
    3: 'Medium-Low Development',
    4: 'Low Development'
  };
  return names[cluster] || 'Unknown';
}

/**
 * Get cluster color
 */
export function getClusterColor(cluster: number): string {
  const colors: Record<number, string> = {
    1: '#10b981', // Green
    2: '#3b82f6', // Blue
    3: '#f59e0b', // Amber
    4: '#ef4444'  // Red
  };
  return colors[cluster] || '#6b7280';
}
