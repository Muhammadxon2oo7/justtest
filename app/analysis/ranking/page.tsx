'use client';

import React, { useState, useMemo } from 'react';
import { REGIONS } from '@/lib/data/regions';

export default function RankingAnalysisPage() {
  const [sortBy, setSortBy] = useState<'index' | 'economic' | 'social' | 'trend'>('index');
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [filterCluster, setFilterCluster] = useState<string>('');

  // Generate mock districts data
  const generateDistricts = () => {
    const districts: any[] = [];
    REGIONS.forEach((region) => {
      for (let i = 1; i <= Math.min(region.districts, 5); i++) {
        districts.push({
          id: `${region.id}-${i}`,
          name: `${region.name} District ${i}`,
          region: region.name,
          regionId: region.id,
          index: Math.random() * 0.7 + 0.15,
          economic: Math.random() * 0.7 + 0.15,
          social: Math.random() * 0.7 + 0.15,
          demographic: Math.random() * 0.7 + 0.15,
          infrastructure: Math.random() * 0.7 + 0.15,
          trend: (Math.random() - 0.3) * 10
        });
      }
    });
    return districts.sort((a: any, b: any) => b.index - a.index);
  };

  const allDistricts = generateDistricts();

  // Filter and sort districts
  const filteredDistricts = useMemo(() => {
    let filtered = allDistricts;

    if (filterRegion) {
      filtered = filtered.filter(d => d.regionId === filterRegion);
    }

    if (filterCluster) {
      filtered = filtered.filter(d => {
        if (filterCluster === 'high') return d.index >= 0.75;
        if (filterCluster === 'med-high') return d.index >= 0.5 && d.index < 0.75;
        if (filterCluster === 'med-low') return d.index >= 0.25 && d.index < 0.5;
        if (filterCluster === 'low') return d.index < 0.25;
        return true;
      });
    }

    if (sortBy === 'trend') {
      return filtered.sort((a, b) => b.trend - a.trend);
    }

    return filtered.sort((a, b) => b[sortBy] - a[sortBy]);
  }, [filterRegion, filterCluster, sortBy]);

  const getClusterLabel = (index: number): { label: string; color: string; bg: string } => {
    if (index >= 0.75) return { label: 'High Dev.', color: 'text-green-700', bg: 'bg-green-100' };
    if (index >= 0.5) return { label: 'Med-High', color: 'text-blue-700', bg: 'bg-blue-100' };
    if (index >= 0.25) return { label: 'Med-Low', color: 'text-amber-700', bg: 'bg-amber-100' };
    return { label: 'Low Dev.', color: 'text-red-700', bg: 'bg-red-100' };
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 2) return '📈';
    if (trend > 0) return '↑';
    if (trend < -2) return '📉';
    if (trend < 0) return '↓';
    return '→';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">District Rankings</h1>
          <p className="text-gray-600 mb-6">Comprehensive ranking of all {allDistricts.length} districts across Uzbekistan</p>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Regions</option>
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>

            <select
              value={filterCluster}
              onChange={(e) => setFilterCluster(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Clusters</option>
              <option value="high">High Development</option>
              <option value="med-high">Medium-High</option>
              <option value="med-low">Medium-Low</option>
              <option value="low">Low Development</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="index">Sort by Composite Index</option>
              <option value="economic">Sort by Economic</option>
              <option value="social">Sort by Social</option>
              <option value="trend">Sort by Trend</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">District</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Region</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Cluster</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Composite</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Economic</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Social</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistricts.map((district, idx) => {
                  const cluster = getClusterLabel(district.index);
                  const trendIcon = getTrendIcon(district.trend);
                  const trendColor = district.trend > 0 ? 'text-green-600' : 'text-red-600';

                  return (
                    <tr key={district.id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900 w-8">#{idx + 1}</span>
                          {idx < 10 && <span className="text-xl">🏆</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-900">{district.name}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {district.region}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${cluster.bg} ${cluster.color}`}>
                          {cluster.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div>
                          <p className="font-bold text-gray-900">{(district.index * 100).toFixed(1)}%</p>
                          <ProgressBar value={district.index} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-gray-600">
                        {(district.economic * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-gray-600">
                        {(district.social * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-lg ${trendColor}`}>
                          {trendIcon}
                          <span className="text-xs ml-1">{district.trend > 0 ? '+' : ''}{district.trend.toFixed(1)}%</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <StatBox
            label="Total Districts"
            value={filteredDistricts.length}
            color="blue"
          />
          <StatBox
            label="Average Index"
            value={(filteredDistricts.reduce((sum, d) => sum + d.index, 0) / filteredDistricts.length * 100).toFixed(1) + '%'}
            color="green"
          />
          <StatBox
            label="Highest"
            value={(Math.max(...filteredDistricts.map(d => d.index)) * 100).toFixed(1) + '%'}
            color="amber"
          />
          <StatBox
            label="Lowest"
            value={(Math.min(...filteredDistricts.map(d => d.index)) * 100).toFixed(1) + '%'}
            color="red"
          />
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cluster Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-700 mt-1"></div>
              <div>
                <p className="font-bold text-green-700">High Development</p>
                <p className="text-sm text-gray-600">Index ≥ 0.75</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-700 mt-1"></div>
              <div>
                <p className="font-bold text-blue-700">Medium-High</p>
                <p className="text-sm text-gray-600">0.50 - 0.75</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded bg-amber-100 border-2 border-amber-700 mt-1"></div>
              <div>
                <p className="font-bold text-amber-700">Medium-Low</p>
                <p className="text-sm text-gray-600">0.25 - 0.50</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-700 mt-1"></div>
              <div>
                <p className="font-bold text-red-700">Quyi rivojlanish</p>
                <p className="text-sm text-gray-600">Indeks {'<'} 0.25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value }: any) {
  const colors: Record<string, string> = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500'
  };

  let color = 'red';
  if (value >= 0.75) color = 'green';
  else if (value >= 0.5) color = 'blue';
  else if (value >= 0.25) color = 'amber';

  return (
    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
      <div
        className={`${colors[color]} h-full transition`}
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    amber: 'bg-amber-50',
    red: 'bg-red-50'
  };

  const textColors: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    red: 'text-red-600'
  };

  return (
    <div className={`${bgColors[color]} rounded-lg p-6 border-l-4 ${textColors[color]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
