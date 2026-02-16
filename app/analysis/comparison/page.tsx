'use client';

import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { REGIONS, INDICATOR_CATEGORIES } from '@/lib/data/regions';

export default function ComparisonPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['TAS', 'SAM']);

  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    );
  };

  // Generate mock data for selected regions
  const generateRegionData = (regionId: string) => {
    const region = REGIONS.find(r => r.id === regionId);
    if (!region) return null;

    return {
      name: region.name,
      gini: 0.30 + Math.random() * 0.25,
      cv: 15 + Math.random() * 35,
      theil: 0.2 + Math.random() * 0.5,
      economic: 0.3 + Math.random() * 0.65,
      social: 0.25 + Math.random() * 0.70,
      demographic: 0.35 + Math.random() * 0.60,
      infrastructure: 0.40 + Math.random() * 0.55,
      populations: region.districts,
      trend: (Math.random() - 0.3) * 10
    };
  };

  const comparisonData = selectedRegions.map(regionId => generateRegionData(regionId)).filter(Boolean);

  // Radar data
  const radarData = INDICATOR_CATEGORIES.map(cat => ({
    category: cat.name,
    ...Object.fromEntries(
      selectedRegions.map(regionId => {
        const data = generateRegionData(regionId);
        return [data?.name || '', Math.random() * 100];
      })
    )
  }));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Region Comparison</h1>
          <p className="text-gray-600">Compare development indicators across multiple regions</p>
        </div>

        {/* Region Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Regions to Compare (2-5)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {REGIONS.map(region => (
              <button
                key={region.id}
                onClick={() => toggleRegion(region.id)}
                disabled={selectedRegions.length === 5 && !selectedRegions.includes(region.id)}
                className={`p-3 rounded-lg transition border-2 ${
                  selectedRegions.includes(region.id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-blue-400 disabled:opacity-50'
                }`}
              >
                <p className="font-medium text-sm">{region.name.substring(0, 10)}</p>
                <p className="text-xs opacity-75 mt-1">{region.districts} dists</p>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-x-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Inequality Metrics Comparison</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Region</th>
                <th className="px-4 py-3 text-right font-bold text-gray-700">Gini</th>
                <th className="px-4 py-3 text-right font-bold text-gray-700">CV (%)</th>
                <th className="px-4 py-3 text-right font-bold text-gray-700">Theil</th>
                <th className="px-4 py-3 text-center font-bold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((data: any, idx) => {
                const trend = (Math.random() - 0.3) * 10;
                return (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{data.name}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-gray-900">{(data.gini).toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-gray-900">{(data.cv).toFixed(1)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-gray-900">{(data.theil).toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={trend > 0 ? 'text-red-600' : 'text-green-600'}>
                        {trend > 0 ? '↑' : '↓'} {trend.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart - Inequality Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Gini Index Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="gini" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart - Multidimensional Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Development Indicators</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={comparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Gini" dataKey="gini" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {comparisonData.map((region: any, idx: number) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{region.name}</h3>

              <div className="space-y-4">
                <ComparisonItem
                  label="Composite Index"
                  value={(region.economic + region.social) / 2}
                  benchmark={0.50}
                />
                <ComparisonItem
                  label="Economic"
                  value={region.economic}
                  benchmark={0.50}
                />
                <ComparisonItem
                  label="Social"
                  value={region.social}
                  benchmark={0.50}
                />
                <ComparisonItem
                  label="Infrastructure"
                  value={region.infrastructure}
                  benchmark={0.50}
                />
                <ComparisonItem
                  label="Demographic"
                  value={region.demographic}
                  benchmark={0.50}
                />
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Districts:</span> {region.populations}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-bold">Trend:</span>
                  <span className={region.trend > 0 ? ' text-red-600' : ' text-green-600'}>
                    {region.trend > 0 ? ' ↑' : ' ↓'} {region.trend.toFixed(1)}% YoY
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-blue-600 text-2xl">📊</span>
              <div>
                <p className="font-bold text-gray-900">Regional Diversity</p>
                <p className="text-sm text-gray-600">Selected regions show different development patterns and challenges</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-600 text-2xl">📈</span>
              <div>
                <p className="font-bold text-gray-900">Growth Potential</p>
                <p className="text-sm text-gray-600">Opportunities for knowledge transfer between high and low performers</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-600 text-2xl">⚡</span>
              <div>
                <p className="font-bold text-gray-900">Priority Areas</p>
                <p className="text-sm text-gray-600">Infrastructure and social indicators show most variation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-600 text-2xl">🎯</span>
              <div>
                <p className="font-bold text-gray-900">Policy Focus</p>
                <p className="text-sm text-gray-600">Target resources to highest-impact interventions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonItem({ label, value, benchmark }: any) {
  const difference = ((value - benchmark) / benchmark) * 100;
  const better = value >= benchmark;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="text-right">
          <span className="font-bold text-gray-900">{(value * 100).toFixed(0)}%</span>
          <span className={`text-xs ml-2 ${better ? 'text-green-600' : 'text-red-600'}`}>
            {better ? '↑' : '↓'} {Math.abs(difference).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${Math.min(value * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
