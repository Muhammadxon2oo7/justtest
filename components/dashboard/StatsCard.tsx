'use client';

import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
  delay?: number;
}

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  amber: 'text-amber-600',
  red: 'text-red-600'
};

const bgColorClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  amber: 'bg-amber-100',
  red: 'bg-red-100'
};

export function StatsCard({
  title,
  value,
  unit = '',
  icon: Icon,
  trend,
  trendLabel,
  color = 'blue',
  delay = 0
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      style={{
        animation: `fadeIn 0.5s ease-in ${delay}ms forwards`,
        opacity: 0
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-gray-900">
              {displayValue.toLocaleString()}
            </p>
            {unit && <span className="text-lg text-gray-500">{unit}</span>}
          </div>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
              {trendLabel && ` ${trendLabel}`}
            </p>
          )}
        </div>
        <div className={`${bgColorClasses[color]} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${colorClasses[color]}`} />
        </div>
      </div>
    </div>
  );
}
