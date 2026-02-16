'use client';

import React, { useState } from 'react';
import { REGIONS } from '@/lib/data/regions';
import { RankingItem } from '@/types';

interface RankingTableProps {
  data: RankingItem[];
  loading?: boolean;
  onDistrictClick?: (districtId: string) => void;
}

export function RankingTable({ data, loading = false, onDistrictClick }: RankingTableProps) {
  const [sortBy, setSortBy] = useState<string>('compositeIndex');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    let valueA = (a as any)[sortBy] || 0;
    let valueB = (b as any)[sortBy] || 0;
    return order === 'desc' ? valueB - valueA : valueA - valueB;
  });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('desc');
    }
  };

  const getClusterColor = (cluster: number) => {
    const colors: Record<number, string> = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-amber-100 text-amber-800',
      4: 'bg-red-100 text-red-800'
    };
    return colors[cluster] || 'bg-gray-100';
  };

  const getClusterName = (cluster: number) => {
    const names: Record<number, string> = {
      1: 'High Dev.',
      2: 'Med-High',
      3: 'Med-Low',
      4: 'Low Dev.'
    };
    return names[cluster] || 'Unknown';
  };

  if (loading) {
    return <div className="text-center py-8">Loading ranking data...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-gray-600">No data available</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('rank')}>
              Rank {sortBy === 'rank' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left font-semibold">District / Region</th>
            <th className="px-6 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('compositeIndex')}>
              Composite {sortBy === 'compositeIndex' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('economic')}>
              Economic {sortBy === 'economic' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('social')}>
              Social {sortBy === 'social' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-right font-semibold">Cluster</th>
            <th className="px-6 py-3 text-right font-semibold">Trend</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(0, 50).map((item, index) => (
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onDistrictClick?.(item.id)}
            >
              <td className="px-6 py-3 font-semibold text-gray-900">{item.rank}</td>
              <td className="px-6 py-3">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.region}</div>
              </td>
              <td className="px-6 py-3 text-right font-mono">{item.compositeIndex.toFixed(3)}</td>
              <td className="px-6 py-3 text-right font-mono">{item.economic.toFixed(3)}</td>
              <td className="px-6 py-3 text-right font-mono">{item.social.toFixed(3)}</td>
              <td className="px-6 py-3 text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getClusterColor(item.cluster)}`}>
                  {getClusterName(item.cluster)}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                {item.trend !== undefined && (
                  <span className={item.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend).toFixed(1)}%
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedData.length > 50 && (
        <div className="px-6 py-3 text-center text-sm text-gray-600 bg-gray-50">
          Showing 50 of {sortedData.length} districts
        </div>
      )}
    </div>
  );
}
