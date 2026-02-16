/**
 * Inequality Metrics Calculations
 * Implements: Gini Coefficient, Coefficient of Variation, Theil Index, Decile Ratio
 */

/**
 * Calculates the Coefficient of Variation (CV)
 * Formula: CV = (σ / μ) × 100
 * Interpretation: <15% low, 15-25% moderate, >25% high inequality
 */
export function calculateCV(values: number[]): number {
  if (values.length === 0) return 0;

  const mean = values.reduce((a, b) => a + b) / values.length;
  if (mean === 0) return 0;

  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  return (stdDev / mean) * 100;
}

/**
 * Calculates the Gini Coefficient
 * Formula: G = (Σ|xi - xj|) / (2n²μ)
 * Range: 0 (perfect equality) to 1 (perfect inequality)
 */
export function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((a, b) => a + b) / n;

  if (mean === 0) return 0;

  let numerator = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      numerator += Math.abs(sorted[i] - sorted[j]);
    }
  }

  return numerator / (2 * n * n * mean);
}

/**
 * Calculates the Theil Entropy Index
 * Formula: T = (1/n) × Σ(yi/μ) × ln(yi/μ)
 * Range: 0 (perfect equality) to ln(n) (perfect inequality)
 */
export function calculateTheil(values: number[]): number {
  if (values.length === 0) return 0;

  const n = values.length;
  const mean = values.reduce((a, b) => a + b) / n;

  if (mean === 0) return 0;

  let sum = 0;
  for (const val of values) {
    if (val > 0) {
      const ratio = val / mean;
      sum += ratio * Math.log(ratio);
    }
  }

  return sum / n;
}

/**
 * Calculates the Decile Ratio (D10/D1)
 * Compares top 10% to bottom 10%
 */
export function calculateDecileRatio(values: number[]): number {
  if (values.length < 10) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const d1Index = Math.floor(n * 0.1);
  const d10Index = Math.floor(n * 0.9);

  if (sorted[d1Index] === 0) return 0;

  return sorted[d10Index] / sorted[d1Index];
}

/**
 * Calculates standard deviation
 */
export function calculateStdDeviation(values: number[]): number {
  if (values.length === 0) return 0;

  const mean = values.reduce((a, b) => a + b) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Normalized min-max scaling formula: (x - min) / (max - min)
 */
export function normalizeMinMax(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

/**
 * Z-score normalization: (x - mean) / stddev
 */
export function normalizeZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

/**
 * Percentile calculation
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index % 1;

  if (lower === upper) {
    return sorted[lower];
  }

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}
