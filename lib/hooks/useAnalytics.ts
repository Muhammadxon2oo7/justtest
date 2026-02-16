'use client';

import { useState, useCallback } from 'react';
import { DistrictData } from '@/types';

export function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const analyze = useCallback(async (data: DistrictData[], year: number, regionId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, year, regionId })
      });

      if (!response.ok) throw new Error('Analysis failed');
      const result = await response.json();
      setResult(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { analyze, loading, error, result };
}

export function useClustering() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const cluster = useCallback(async (data: any[], numberOfClusters: number = 4) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clustering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, numberOfClusters })
      });

      if (!response.ok) throw new Error('Clustering failed');
      const result = await response.json();
      setResult(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { cluster, loading, error, result };
}

export function useRecommendations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const getRecommendations = useCallback(async (regionId: string, cluster: number, indicators: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regionId, cluster, indicators })
      });

      if (!response.ok) throw new Error('Failed to generate recommendations');
      const result = await response.json();
      setResult(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getRecommendations, loading, error, result };
}
