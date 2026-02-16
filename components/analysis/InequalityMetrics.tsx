'use client';

import React from 'react';

interface InequalityMetricsProps {
  cv: number;
  gini: number;
  theil: number;
  decileRatio: number;
}

const MetricCard = ({ label, value, unit, interpretation, color }: any) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
      <div className={`text-3xl font-bold mb-2 ${color}`}>
        {typeof value === 'number' ? value.toFixed(3) : value}
        <span className="text-sm text-gray-500 ml-2">{unit}</span>
      </div>
      <p className="text-xs text-gray-600">{interpretation}</p>
    </div>
  );
};

export function InequalityMetrics({ cv, gini, theil, decileRatio }: InequalityMetricsProps) {
  const cvInterpretation = cv < 15 ? 'Low inequality' : cv < 25 ? 'Moderate inequality' : 'High inequality';
  const giniInterpretation = gini < 0.3 ? 'Low inequality' : gini < 0.4 ? 'Moderate inequality' : gini < 0.5 ? 'Moderately high' : 'High inequality';
  const theilInterpretation = theil < 0.3 ? 'Low inequality' : theil < 0.5 ? 'Moderate inequality' : 'High inequality';
  const decileInterpretation = decileRatio < 3 ? 'Low inequality' : decileRatio < 5 ? 'Moderate inequality' : decileRatio < 10 ? 'High inequality' : 'Extreme inequality';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Coefficient of Variation"
        value={cv}
        unit="%"
        interpretation={cvInterpretation}
        color="text-blue-600"
      />
      <MetricCard
        label="Gini Coefficient"
        value={gini}
        unit="0-1"
        interpretation={giniInterpretation}
        color="text-green-600"
      />
      <MetricCard
        label="Theil Index"
        value={theil}
        unit="0-∞"
        interpretation={theilInterpretation}
        color="text-amber-600"
      />
      <MetricCard
        label="Decile Ratio"
        value={decileRatio}
        unit="D10/D1"
        interpretation={decileInterpretation}
        color="text-red-600"
      />
    </div>
  );
}
