'use client';

import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { REGIONS } from '@/lib/data/regions';

export default function ClusteringAnalysisPage() {
  const [selectedCluster, setSelectedCluster] = useState<number>(0);

  // Mock clustering data
  const clusterData = [
    { name: 'High Development', id: 1, color: '#10b981', count: 45, avgIndex: 0.85, description: 'Well-developed areas with high composite index' },
    { name: 'Medium-High Development', id: 2, color: '#3b82f6', count: 68, avgIndex: 0.65, description: 'Moderately developed areas with good progress' },
    { name: 'Medium-Low Development', id: 3, color: '#f59e0b', count: 55, avgIndex: 0.40, description: 'Areas with development potential' },
    { name: 'Low Development', id: 4, color: '#ef4444', count: 35, avgIndex: 0.22, description: 'Areas requiring targeted support' }
  ];

  // Mock scatter data for 2D visualization
  const scatterData = Array.from({ length: 100 }, (_, i) => {
    const cluster = Math.floor(i / 25) + 1;
    const clusterColor: Record<number, string> = { 1: '#10b981', 2: '#3b82f6', 3: '#f59e0b', 4: '#ef4444' };
    return {
      x: 20 + (cluster - 1) * 25 + Math.random() * 15,
      y: 30 + Math.random() * 50,
      cluster,
      color: clusterColor[cluster],
      district: `District ${i + 1}`
    };
  });

  // Mock district data for selected cluster
  const clusterDistricts = [
    { name: 'Tashkent City', region: 'Tashkent', index: 0.92, economic: 0.95, social: 0.88 },
    { name: 'Samarkand City', region: 'Samarkand', index: 0.88, economic: 0.91, social: 0.85 },
    { name: 'Bukhara City', region: 'Bukhara', index: 0.86, economic: 0.89, social: 0.83 },
    { name: 'Navoi City', region: 'Navoi', index: 0.84, economic: 0.87, social: 0.81 },
    { name: 'Khiva', region: 'Khorezm', index: 0.82, economic: 0.85, social: 0.79 }
  ];

  const clusterInfo = clusterData[selectedCluster];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Clustering Analysis</h1>
          <p className="text-gray-600">K-means clustering with k=4, Silhouette Score: 0.72</p>
        </div>

        {/* Cluster Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {clusterData.map((cluster, i) => (
            <button
              key={cluster.id}
              onClick={() => setSelectedCluster(i)}
              className={`p-6 rounded-lg transition transform hover:scale-105 ${
                selectedCluster === i
                  ? 'ring-2 ring-offset-2 ring-blue-600'
                  : ''
              }`}
              style={{ backgroundColor: cluster.color }}
            >
              <p className="text-white font-bold text-lg">{cluster.name}</p>
              <p className="text-white text-2xl font-bold mt-2">{cluster.count}</p>
              <p className="text-white text-sm opacity-90 mt-1">districts</p>
              <p className="text-white text-sm opacity-80 mt-3">{(cluster.avgIndex * 100).toFixed(0)}% avg</p>
            </button>
          ))}
        </div>

        {/* Cluster Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Cluster Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {clusterInfo.name}
            </h2>
            <p className="text-gray-600 mb-6">{clusterInfo.description}</p>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">District Count</p>
                <p className="text-2xl font-bold text-gray-900">{clusterInfo.count}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Avg Composite Index</p>
                <p className="text-2xl font-bold text-gray-900">{(clusterInfo.avgIndex * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Performance Level</p>
                <p className={`text-lg font-bold ${
                  clusterInfo.avgIndex >= 0.75 ? 'text-green-600' :
                  clusterInfo.avgIndex >= 0.5 ? 'text-blue-600' :
                  clusterInfo.avgIndex >= 0.25 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {clusterInfo.avgIndex >= 0.75 ? 'High' :
                   clusterInfo.avgIndex >= 0.5 ? 'Medium-High' :
                   clusterInfo.avgIndex >= 0.25 ? 'Medium-Low' :
                   'Low'}
                </p>
              </div>
            </div>
          </div>

          {/* Cluster Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={clusterData} dataKey="count" cx="50%" cy="50%" outerRadius={80}>
                  {clusterData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Metrics</h3>
            <div className="space-y-4">
              <MetricBar label="Silhouette Score" value={0.72} max={1} color="blue" />
              <MetricBar label="Inertia" value={0.45} max={1} color="green" />
              <MetricBar label="Davies-Bouldin Index" value={0.58} max={1} color="amber" />
              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p className="text-sm text-blue-900">
                  ✓ Clustering quality is <strong>Good</strong> - clusters are well-separated and cohesive
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2D Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">2D Cluster Visualization (PC1 vs PC2)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="First Principal Component" />
              <YAxis dataKey="y" name="Second Principal Component" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Districts" data={scatterData} fill="#3b82f6">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Districts in Selected Cluster */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top Districts in {clusterInfo.name} Cluster
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">District</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Region</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Composite</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Economic</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Social</th>
                </tr>
              </thead>
              <tbody>
                {clusterDistricts.map((district, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{district.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{district.region}</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                      {(district.index * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {(district.economic * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {(district.social * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Cluster 1 (Green) represents high-development areas that serve as benchmarks</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Cluster 4 (Red) requires urgent policy intervention and resource allocation</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Good cluster separation indicates distinct development patterns across regions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Consider targeted interventions to move districts from lower to higher clusters</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, max, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500'
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colors[color]} h-2 rounded-full transition`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
