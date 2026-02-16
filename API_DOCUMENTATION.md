# API Documentation

## Overview

The Uzbekistan Regional Inequality Analysis System provides RESTful APIs for performing comprehensive regional inequality analysis using advanced statistical methods and machine learning.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, no authentication is required. Add authentication as needed for production deployment.

## Endpoints

### 1. Analysis Endpoint

Perform comprehensive regional inequality analysis on district data.

#### `POST /analyze`

Calculates all inequality metrics, clustering, ranking, and analysis.

**Request Body:**

```typescript
{
  data: DistrictData[];      // Array of district data with indicators
  year: number;              // Analysis year (e.g., 2024)
  regionId?: string;         // Optional: Filter by region
}
```

**DistrictData Schema:**

```typescript
{
  id: string;                // Unique district identifier
  name: string;              // District name
  regionId: string;          // Region ID (TAS, SAM, BUK, etc)
  regionName: string;        // Region name
  year: number;              // Data year
  indicators: {
    [indicatorId: string]: number;  // Indicator values
  }
}
```

**Success Response (200):**

```typescript
{
  success: true;
  year: number;
  metrics: {
    gini: number;            // Gini coefficient (0-1)
    cv: number;              // Coefficient of Variation (%)
    theil: number;           // Theil Index
    decileRatio: number;     // D10/D1 ratio
    stdDeviation: number;    // Standard deviation
    percentiles: {
      p10: number;           // 10th percentile
      p25: number;           // 25th percentile
      p50: number;           // Median (50th percentile)
      p75: number;           // 75th percentile
      p90: number;           // 90th percentile
    }
  };
  clustering: {
    k: number;               // Number of clusters
    clusters: Cluster[];     // Cluster definitions
    assignments: {           // District to cluster mapping
      [districtId: string]: number;
    };
    silhouetteScore: number; // Quality metric (0-1)
    inertia: number;         // Within-cluster sum of squares
  };
  ranking: RankingItem[];    // Sorted ranking of districts
  analysis: {
    totalDistricts: number;
    regionId?: string;
    clusterDistribution: {
      [clusterId: number]: number;
    }
  }
}
```

**Error Response (400/500):**

```typescript
{
  success: false;
  error: string;             // Error message
  details?: any;             // Additional error information
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {
        "id": "TAS-01",
        "name": "Tashkent District 1",
        "regionId": "TAS",
        "regionName": "Tashkent",
        "year": 2024,
        "indicators": {
          "gdp_per_capita": 2500,
          "literacy_rate": 95,
          "electricity_access": 99
        }
      }
    ],
    "year": 2024
  }'
```

---

### 2. Clustering Endpoint

Perform K-means clustering analysis on districts.

#### `POST /clustering`

Clusters districts based on multiple indicators using K-means algorithm.

**Request Body:**

```typescript
{
  data: DistrictData[];      // District data
  k?: number;                // Number of clusters (default: 4, range: 2-n/2)
  maxIterations?: number;    // Max iterations (default: 100)
  convergenceThreshold?: number; // Convergence threshold (default: 0.001)
}
```

**Success Response (200):**

```typescript
{
  success: true;
  k: number;
  clusters: Array<{
    id: number;              // Cluster ID (1-4)
    label: string;           // Cluster label (High Dev, Med-High, etc)
    size: number;            // Number of districts
    centroid: {
      compositeIndex: number;
      economic: number;
      social: number;
      demographic: number;
      infrastructure: number;
    };
    statistics: {
      minIndex: number;      // Minimum composite index
      maxIndex: number;      // Maximum composite index
      avgIndex: number;      // Average composite index
      stdDev: number;        // Standard deviation
    }
  }>;
  assignments: {
    [districtId: string]: number;  // District to cluster mapping
  };
  silhouetteScore: number;   // Clustering quality (0-1)
  inertia: number;           // Within-cluster sum of squares
  iterations: number;        // Iterations until convergence
  converged: boolean;        // Whether algorithm converged
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/clustering \
  -H "Content-Type: application/json" \
  -d '{
    "data": [...],
    "k": 4
  }'
```

---

### 3. Recommendations Endpoint

Generate AI-powered policy recommendations.

#### `POST /recommendations`

Uses Claude AI to generate contextual recommendations based on analysis results.

**Request Body:**

```typescript
{
  analysis: AnalysisResult;     // Results from analyze endpoint
  region?: string;              // Region name or ID
  clusterLevel?: 1 | 2 | 3 | 4; // Target cluster level
  focusArea?: 'economic' | 'social' | 'infrastructure' | 'demographic';
}
```

**Success Response (200):**

```typescript
{
  success: true;
  recommendations: Array<{
    id: string;
    title: string;             // Recommendation title
    description: string;       // Detailed description
    priority: 'critical' | 'high' | 'medium' | 'low';
    impact: string;           // Expected impact
    actions: string[];        // List of recommended actions
    expectedOutcome: string;  // Expected outcome if implemented
    timeline: string;         // Implementation timeline
    budget: string;          // Estimated budget range
    stakeholders: string[];  // Key stakeholders
    successMetrics: string[]; // How to measure success
  }>;
  analysis: {
    keyInsights: string[];
    mainChallenges: string[];
    opportunities: string[];
  };
  generatedAt: string;        // Timestamp
}
```

**Error Response (if API unavailable):**

Uses mock recommendations based on cluster level.

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "analysis": {...},
    "region": "Samarkand",
    "clusterLevel": 2
  }'
```

---

## Data Types

### AnalysisResult

```typescript
interface AnalysisResult {
  success: boolean;
  year: number;
  metrics: InequalityMetrics;
  clustering: ClusterResult;
  ranking: RankingItem[];
  analysis: {
    totalDistricts: number;
    regionId?: string;
    clusterDistribution: Record<number, number>;
  }
}
```

### InequalityMetrics

```typescript
interface InequalityMetrics {
  gini: number;              // Gini coefficient (0-1)
  cv: number;                // Coefficient of variation (%)
  theil: number;             // Theil index
  decileRatio: number;       // Decile ratio
  stdDeviation: number;      // Standard deviation
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  }
}
```

### ClusterResult

```typescript
interface ClusterResult {
  k: number;
  clusters: Cluster[];
  assignments: Record<string, number>;
  silhouetteScore: number;
  inertia: number;
  iterations: number;
  converged: boolean;
  quality: string;
}
```

### RankingItem

```typescript
interface RankingItem {
  districtId: string;
  name: string;
  region: string;
  rank: number;
  compositeIndex: number;
  economic: number;
  social: number;
  demographic: number;
  infrastructure: number;
  trend: number;
  percentile: number;
  cluster: number;
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Invalid request body | Check request format and required fields |
| 400 | Insufficient data points | Provide at least 10 data points |
| 400 | Invalid k value | k must be between 2 and n/2 |
| 500 | Algorithm convergence failed | Try reducing k or increasing iterations |
| 500 | Claude API error | Check API key, fallback to mock data |

### Example Error Response

```typescript
{
  success: false,
  error: "Invalid request body",
  details: {
    field: "data",
    message: "Data array is required and must have at least 10 items"
  }
}
```

---

## Rate Limiting

No rate limiting currently implemented. Add for production:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000
```

---

## Response Headers

All responses include:

```
Content-Type: application/json
X-Processing-Time: {milliseconds}
X-API-Version: 1.0
```

---

## Pagination

Not currently implemented. Add pagination for ranking endpoint:

```typescript
GET /api/analyze?page=1&limit=50
```

---

## Webhooks

Webhooks can be configured for long-running analysis:

```typescript
POST /api/analyze
{
  data: [...],
  webhookUrl: "https://your-domain.com/webhook"
}
```

---

## Testing with curl

### Get current year's analysis

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d @request.json
```

### Get clustering for 5 clusters

```bash
curl -X POST http://localhost:3000/api/clustering \
  -H "Content-Type: application/json" \
  -d '{
    "data": [...],
    "k": 5
  }'
```

### Get recommendations

```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "analysis": {...},
    "clusterLevel": 1
  }'
```

---

## Performance

Typical response times (with 200 districts):

- `/analyze`: 500-1000ms
- `/clustering`: 200-500ms
- `/recommendations`: 2000-5000ms (with Claude API)

---

## Best Practices

1. **Validation**: Always validate input data before sending
2. **Error Handling**: Implement retry logic for transient failures
3. **Caching**: Cache results for repeated queries
4. **Monitoring**: Track API response times and errors
5. **Security**: Use HTTPS in production, add authentication

---

## Versioning

Current API Version: **v1.0**

Future versions will maintain backward compatibility through versioning:

```
GET /api/v2/analyze
```

---

## Support

For API issues, see [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) or open an issue.
