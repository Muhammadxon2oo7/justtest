// Core type definitions for the application

export interface Region {
  id: string;
  name: string;
  nameUz: string;
  nameRu?: string;
  districts: number;
  capital?: boolean;
}

export interface District {
  id: string;
  name: string;
  nameUz: string;
  regionId: string;
  population: number;
  area?: number;
}

export interface Indicator {
  id: string;
  name: string;
  nameUz: string;
  unit: string;
  category: 'economic' | 'social' | 'demographic' | 'infrastructure';
  direction: 'higher' | 'lower' | 'neutral';
  weight?: number;
}

export interface IndicatorCategory {
  id: string;
  name: string;
  nameUz: string;
  weight: number;
  indicators: Indicator[];
}

export interface IndicatorValue {
  districtId: string;
  indicatorId: string;
  value: number;
  year: number;
  verified?: boolean;
  source?: string;
}

export interface DistrictData {
  id: string;
  name: string;
  region: string;
  population: number;
  indicators: Record<string, number>;
}

export interface InequalityMetrics {
  cv: number; // Coefficient of Variation
  gini: number; // Gini Coefficient
  theil: number; // Theil Index
  decileRatio: number; // Decile Ratio (D10/D1)
  timestamp: Date;
}

export interface AnalysisResult {
  success: boolean;
  data: {
    year: number;
    regionId: string;
    inequality: InequalityMetrics;
    clustering: ClusterResult;
    ranking: RankingItem[];
    summary: AnalysisSummary;
    changes?: YoYChanges;
    generatedAt: string;
  };
}

export interface ClusterResult {
  clusters: Map<number, DistrictData[]>;
  centroids: number[];
  silhouetteScore: number;
  inertia?: number;
  districtClusterAssignments?: DistrictClusterAssignment[];
}

export interface DistrictClusterAssignment {
  id: string;
  name: string;
  cluster: number;
  distance: number;
  compositeIndex: number;
}

export interface RankingItem {
  id: string;
  name: string;
  region: string;
  rank: number;
  compositeIndex: number;
  economic: number;
  social: number;
  demographic: number;
  infrastructure: number;
  percentile: number;
  cluster: number;
  trend?: number;
}

export interface AnalysisSummary {
  totalDistricts: number;
  avgCompositeIndex: number;
  maxCompositeIndex: number;
  minCompositeIndex: number;
  stdDeviation: number;
}

export interface YoYChanges {
  [districtId: string]: {
    compositeIndexChange: number;
    percentChange: number;
    clusterChange?: number;
  };
}

export interface Recommendation {
  id: string;
  action: string;
  expectedResult: string;
  timeline: 'short' | 'medium' | 'long';
  budgetEstimate: 'low' | 'medium' | 'high';
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  successMetrics: string[];
  implementationSteps: string[];
  riskFactors: string[];
  bestPractices?: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'analyst' | 'viewer';
  organization?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  title: string;
  reportType: 'executive' | 'full' | 'technical';
  format: 'pdf' | 'excel' | 'powerpoint';
  language: string;
  regionId: string;
  year: number;
  fileUrl: string;
  generatedAt: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
