'use client';

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { REGIONS } from '@/lib/data/regions';

export default function InequalityAnalysisPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('%');
  const [selectedMetric, setSelectedMetric] = useState<'gini' | 'cv' | 'theil' | 'decile'>('gini');

  // Mock data for inequality trends
  const inequalityTrends = [
    { year: 2020, gini: 0.42, cv: 28, theil: 0.55, decile: 4.2 },
    { year: 2021, gini: 0.41, cv: 27, theil: 0.52, decile: 4.0 },
    { year: 2022, gini: 0.40, cv: 26, theil: 0.49, decile: 3.8 },
    { year: 2023, gini: 0.39, cv: 25, theil: 0.46, decile: 3.6 },
    { year: 2024, gini: 0.38, cv: 24, theil: 0.43, decile: 3.4 }
  ];

  // Mock data for regional inequality comparison
  const regionalInequality = REGIONS.map((region, i) => ({
    name: region.name.substring(0, 3),
    gini: 0.30 + Math.random() * 0.25,
    cv: 15 + Math.random() * 35,
    theil: 0.2 + Math.random() * 0.5,
    decile: 2 + Math.random() * 5
  }));

  const metricInfo: Record<string, { title: string; description: string; interpretation: string; range: string }> = {
    gini: {
      title: 'Gini Index',
      description: 'Measures income inequality ranging from 0 (perfect equality) to 1 (perfect inequality)',
      interpretation: '0.38 indicates moderate inequality - a decrease from previous year shows improvement',
      range: '0 - 1 (Lower is better)'
    },
    cv: {
      title: 'Coefficient of Variation',
      description: 'Standardized measure of dispersion of distribution - allows comparison across different units',
      interpretation: '24% indicates that standard deviation is 24% of the mean - useful for cross-unit comparison',
      range: '0% - ∞ (Lower is better)'
    },
    theil: {
      title: 'Theil Index',
      description: 'Entropy-based inequality measure - decomposable into within and between group inequality',
      interpretation: '0.43 shows areas have similar income levels with low between-group inequality',
      range: '0 - ln(n) (Lower is better)'
    },
    decile: {
      title: 'Decile Ratio',
      description: 'Ratio of top 10% income to bottom 10% income - simple intuitive measure',
      interpretation: '3.4 means top 10% earn 3.4 times more than bottom 10% - declining is good sign',
      range: '1 - ∞ (Lower is better)'
    }
  };

  const metrics = metricInfo[selectedMetric];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Inequality Analysis</h1>
          <div className="flex gap-4 mb-6">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg"
            >
              <option value="%">All Regions</option>
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(metricInfo).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`p-4 rounded-lg transition border-2 ${
                selectedMetric === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-900 border-gray-200 hover:border-blue-400'
              }`}
            >
              <p className="font-bold">{value.title}</p>
              <p className="text-sm opacity-75 mt-1">{value.range}</p>
            </button>
          ))}
        </div>

        {/* Metric Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{metrics.title}</h2>
          <p className="text-gray-600 mb-4">{metrics.description}</p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-bold">2024 Value:</span> {inequalityTrends[4][selectedMetric]}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-bold">Interpretation:</span> {metrics.interpretation}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {metrics.title} - Annual Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inequalityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Regional Comparison - {new Date().getFullYear()}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalInequality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={selectedMetric} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics & Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatItem 
              label="Highest Inequality" 
              value="0.52"
              subtext="Navoi Region"
              trend="down"
            />
            <StatItem 
              label="Lowest Inequality" 
              value="0.28"
              subtext="Tashkent City"
              trend="up"
            />
            <StatItem 
              label="National Average" 
              value="0.38"
              subtext="All Regions"
              trend="down"
            />
            <StatItem 
              label="YoY Change" 
              value="-2.6%"
              subtext="2023 to 2024"
              trend="down"
            />
            <StatItem 
              label="Best Performing" 
              value="Andijan"
              subtext="+4.2% improvement"
              trend="up"
            />
            <StatItem 
              label="Target 2025" 
              value="0.35"
              subtext="Policy Goal"
              trend="down"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Policy Recommendations</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Focus on infrastructure development in high-inequality regions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Implement targeted economic programs in bottom 10% performers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Monitor social indicators closely in Navoi and Bukhara regions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Scale successful initiatives from Tashkent and Samarkand</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, subtext, trend }: any) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-sm mt-2 ${trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
        {trend === 'up' ? '↑' : '↓'} {subtext}
      </p>
    </div>
  );
}
