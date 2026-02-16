import { REGIONS, INDICATORS } from './regions';
import { DistrictData, InequalityMetrics } from '@/types';

export function generateMockData(): DistrictData[] {
  const districts: DistrictData[] = [];

  REGIONS.forEach((region) => {
    for (let i = 1; i <= region.districts; i++) {
      const districtData: DistrictData = {
        id: `${region.id}-${i}`,
        name: `${region.name} District ${i}`,
        region: region.name,
        population: 100000 + Math.random() * 400000,
        indicators: {}
      };

      // Generate random indicator values
      INDICATORS.forEach((indicator) => {
        districtData.indicators[indicator.id] = Math.random() * 100;
      });

      districts.push(districtData);
    }
  });

  return districts;
}

export function generateMockInequalityMetrics(): InequalityMetrics {
  return {
    gini: 0.35 + Math.random() * 0.15,
    cv: 20 + Math.random() * 30,
    theil: 0.3 + Math.random() * 0.4,
    decileRatio: 2 + Math.random() * 6,
    timestamp: new Date()
  };
}

export function generateMockTrend(months: number = 12) {
  const trend = [];
  for (let i = 0; i < months; i++) {
    trend.push({
      month: i + 1,
      gini: 0.40 - (i * 0.002) + (Math.random() * 0.01),
      cv: 28 - (i * 0.1) + (Math.random() * 2),
      theil: 0.50 - (i * 0.003) + (Math.random() * 0.015)
    });
  }
  return trend;
}

export function generateRegionalComparison() {
  return REGIONS.map((region) => ({
    region: region.name,
    gini: 0.30 + Math.random() * 0.25,
    cv: 15 + Math.random() * 35,
    compositeIndex: 0.3 + Math.random() * 0.7,
    improvementRate: (Math.random() * 10) - 2
  }));
}
