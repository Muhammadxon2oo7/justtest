/**
 * K-Means Clustering Implementation
 * Groups districts into k clusters based on composite development index
 */

interface DataPoint {
  id: string;
  name: string;
  value: number;
  [key: string]: any;
}

interface ClusterResult {
  clusters: Map<number, DataPoint[]>;
  centroids: number[];
  silhouetteScore: number;
  assignments: Map<string, number>;
  distances: Map<string, number>;
  inertia: number;
  iterations: number;
}

/**
 * Initialize centroids using K-Means++ algorithm for better starting points
 */
function initializeCentroidsKMeansPlusPlus(data: DataPoint[], k: number): number[] {
  const centroids: number[] = [];

  // Choose first centroid randomly
  const firstIndex = Math.floor(Math.random() * data.length);
  centroids.push(data[firstIndex].value);

  // Choose remaining centroids
  for (let c = 1; c < k; c++) {
    let maxDist = -1;
    let chosenIndex = 0;

    for (let i = 0; i < data.length; i++) {
      const point = data[i].value;
      let minDist = Infinity;

      for (const centroid of centroids) {
        minDist = Math.min(minDist, Math.abs(point - centroid));
      }

      if (minDist > maxDist) {
        maxDist = minDist;
        chosenIndex = i;
      }
    }

    centroids.push(data[chosenIndex].value);
  }

  return centroids;
}

/**
 * Calculate Euclidean distance between point and centroid
 */
function distance(point: number, centroid: number): number {
  return Math.abs(point - centroid);
}

/**
 * Assign points to nearest cluster
 */
function assignToClusters(
  data: DataPoint[],
  centroids: number[]
): Map<number, DataPoint[]> {
  const clusters = new Map<number, DataPoint[]>();

  for (let i = 0; i < centroids.length; i++) {
    clusters.set(i, []);
  }

  for (const point of data) {
    let minDist = Infinity;
    let assignedCluster = 0;

    for (let i = 0; i < centroids.length; i++) {
      const dist = distance(point.value, centroids[i]);
      if (dist < minDist) {
        minDist = dist;
        assignedCluster = i;
      }
    }

    clusters.get(assignedCluster)?.push(point);
  }

  return clusters;
}

/**
 * Calculate new centroids based on cluster means
 */
function updateCentroids(clusters: Map<number, DataPoint[]>): number[] {
  const newCentroids: number[] = [];

  for (let i = 0; i < clusters.size; i++) {
    const cluster = clusters.get(i) || [];
    if (cluster.length === 0) {
      newCentroids.push(0);
    } else {
      const mean = cluster.reduce((sum, point) => sum + point.value, 0) / cluster.length;
      newCentroids.push(mean);
    }
  }

  return newCentroids;
}

/**
 * Check if centroids have converged
 */
function centroidsConverged(old: number[], updated: number[], threshold: number = 0.001): boolean {
  return old.every((centroid, i) => Math.abs(centroid - updated[i]) < threshold);
}

/**
 * Calculate Silhouette coefficient for cluster quality
 */
function calculateSilhouetteScore(
  data: DataPoint[],
  clusters: Map<number, DataPoint[]>,
  centroids: number[]
): number {
  let totalSilhouette = 0;
  let validPoints = 0;

  for (const point of data) {
    let assignedCluster = 0;
    let minDist = Infinity;

    for (let i = 0; i < centroids.length; i++) {
      const dist = distance(point.value, centroids[i]);
      if (dist < minDist) {
        minDist = dist;
        assignedCluster = i;
      }
    }

    // Calculate a(i) - distance to own cluster
    const ownCluster = clusters.get(assignedCluster) || [];
    const aI = ownCluster.length <= 1 ? 0 :
      ownCluster.reduce((sum, p) => sum + distance(point.value, p.value), 0) / (ownCluster.length - 1);

    // Calculate b(i) - distance to nearest other cluster
    let bI = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      if (i !== assignedCluster) {
        const otherCluster = clusters.get(i) || [];
        if (otherCluster.length > 0) {
          const avgDist = otherCluster.reduce((sum, p) => sum + distance(point.value, p.value), 0) / otherCluster.length;
          bI = Math.min(bI, avgDist);
        }
      }
    }

    if (bI === Infinity) bI = 0;

    const maxVal = Math.max(aI, bI);
    const silhouette = maxVal === 0 ? 0 : (bI - aI) / maxVal;
    totalSilhouette += silhouette;
    validPoints++;
  }

  return validPoints > 0 ? totalSilhouette / validPoints : 0;
}

/**
 * Calculate total within-cluster sum of squares (inertia)
 */
function calculateInertia(
  clusters: Map<number, DataPoint[]>,
  centroids: number[]
): number {
  let inertia = 0;

  for (let i = 0; i < centroids.length; i++) {
    const cluster = clusters.get(i) || [];
    for (const point of cluster) {
      inertia += Math.pow(distance(point.value, centroids[i]), 2);
    }
  }

  return inertia;
}

/**
 * K-Means clustering algorithm
 */
export function kMeansClustering(
  data: DataPoint[],
  k: number = 4,
  maxIterations: number = 100
): ClusterResult {
  if (data.length === 0) {
    return {
      clusters: new Map(),
      centroids: [],
      silhouetteScore: 0,
      assignments: new Map(),
      distances: new Map(),
      inertia: 0,
      iterations: 0
    };
  }

  // Ensure k doesn't exceed data points
  k = Math.min(k, data.length);

  let centroids = initializeCentroidsKMeansPlusPlus(data, k);
  let clusters = assignToClusters(data, centroids);
  let iterations = 0;

  for (let iter = 0; iter < maxIterations; iter++) {
    const newCentroids = updateCentroids(clusters);

    if (centroidsConverged(centroids, newCentroids)) {
      iterations = iter + 1;
      break;
    }

    centroids = newCentroids;
    clusters = assignToClusters(data, centroids);
    iterations = iter + 1;
  }

  // Calculate assignments and distances
  const assignments = new Map<string, number>();
  const distances = new Map<string, number>();

  for (const point of data) {
    let minDist = Infinity;
    let assignedCluster = 0;

    for (let i = 0; i < centroids.length; i++) {
      const dist = distance(point.value, centroids[i]);
      if (dist < minDist) {
        minDist = dist;
        assignedCluster = i;
      }
    }

    assignments.set(point.id, assignedCluster);
    distances.set(point.id, minDist);
  }

  const silhouetteScore = calculateSilhouetteScore(data, clusters, centroids);
  const inertia = calculateInertia(clusters, centroids);

  return {
    clusters,
    centroids,
    silhouetteScore,
    assignments,
    distances,
    inertia,
    iterations
  };
}

/**
 * Determine cluster quality
 */
export function evaluateClusterQuality(silhouetteScore: number): string {
  if (silhouetteScore >= 0.7) return 'Excellent';
  if (silhouetteScore >= 0.5) return 'Good';
  if (silhouetteScore >= 0.25) return 'Fair';
  return 'Poor';
}
