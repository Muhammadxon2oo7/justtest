'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { REGIONS } from '@/lib/data/regions';
import { generateMockData } from '@/lib/data/mock-data';

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('TAS');
  const [year, setYear] = useState<number>(2024);

  // Generate mock data
  const mockData = generateMockData();

  // Inequality trend data
  const inequalityTrend = [
    { year: 2020, gini: 0.42, cv: 28, theil: 0.55 },
    { year: 2021, gini: 0.41, cv: 27, theil: 0.52 },
    { year: 2022, gini: 0.40, cv: 26, theil: 0.49 },
    { year: 2023, gini: 0.39, cv: 25, theil: 0.46 },
    { year: 2024, gini: 0.38, cv: 24, theil: 0.43 }
  ];

  // Regional performance
  const regionalPerf = REGIONS.map((r, i) => ({
    name: r.name,
    index: 0.4 + Math.random() * 0.4,
    districts: r.districts
  }));

  // Cluster distribution
  const clusterDist = [
    { name: 'High Dev.', value: 45, color: '#10b981' },
    { name: 'Med-High', value: 68, color: '#3b82f6' },
    { name: 'Med-Low', value: 55, color: '#f59e0b' },
    { name: 'Low Dev.', value: 35, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <div className="flex gap-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg"
            >
              <option value="">Select Region</option>
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg"
            >
              {[2020, 2021, 2022, 2023, 2024].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Avg Gini Index" value="0.38" unit="0-1" color="blue" />
          <StatCard title="Districts Analyzed" value="203" unit="total" color="green" />
          <StatCard title="Cluster Quality" value="Good" unit="Silhouette" color="amber" />
          <StatCard title="Data Coverage" value="98%" unit="regions" color="red" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Inequality Trend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Inequality Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inequalityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gini" stroke="#3b82f6" />
                <Line type="monotone" dataKey="cv" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Regional Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalPerf}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="index" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cluster Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cluster Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={clusterDist} dataKey="value" label cx="50%" cy="50%" outerRadius={80}>
                  {clusterDist.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performers</h2>
            <div className="space-y-3">
              {regionalPerf.sort((a, b) => b.index - a.index).slice(0, 5).map((region, i) => (
                <div key={i} className="flex justify-between items-center bgray-50 p-3 rounded">
                  <div>
                    <p className="font-medium text-gray-900">#{i + 1} {region.name}</p>
                    <p className="text-sm text-gray-600">{region.districts} districts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">{(region.index * 100).toFixed(0)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className={`rounded-lg shadow p-6 text-white ${colors[color]}`}>
      <p className="text-sm font-medium opacity-75">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm opacity-75 mt-1">{unit}</p>
    </div>
  );
}
