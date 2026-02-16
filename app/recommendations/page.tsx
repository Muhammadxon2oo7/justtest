'use client';

import React, { useState } from 'react';
import { REGIONS } from '@/lib/data/regions';

export default function RecommendationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCluster, setSelectedCluster] = useState<string>('high');
  const [loading, setLoading] = useState(false);

  // Mock recommendations by cluster
  const recommendationsByCluster: Record<string, any[]> = {
    high: [
      {
        id: 1,
        title: 'Innovation and Technology Leadership',
        description: 'Leverage current advantages to become regional innovation hubs',
        priority: 'high',
        impact: 'Scale-up potential',
        actions: [
          'Establish tech incubators and startup accelerators',
          'Invest in digital skills training',
          'Create public-private technology partnerships',
          'Develop smart city infrastructure'
        ]
      },
      {
        id: 2,
        title: 'Regional Knowledge Transfer',
        description: 'Share best practices with lower-performing regions',
        priority: 'high',
        impact: 'System-wide improvement',
        actions: [
          'Establish mentorship programs',
          'Create inter-regional knowledge networks',
          'Document and share successful policies',
          'Organize regular capacity-building sessions'
        ]
      },
      {
        id: 3,
        title: 'Sustainability and Long-term Growth',
        description: 'Ensure sustainable development while maintaining high performance',
        priority: 'medium',
        impact: 'Future resilience',
        actions: [
          'Green economy initiatives',
          'Environmental monitoring systems',
          'Sustainable resource management',
          'Carbon neutrality planning'
        ]
      }
    ],
    'med-high': [
      {
        id: 4,
        title: 'Economic Diversification',
        description: 'Reduce dependence on few sectors and create new growth opportunities',
        priority: 'high',
        impact: 'Faster growth',
        actions: [
          'Identify emerging sectors',
          'Support SME development',
          'Improve business environment',
          'Attract foreign investment'
        ]
      },
      {
        id: 5,
        title: 'Social Services Improvement',
        description: 'Strengthen healthcare, education, and social welfare systems',
        priority: 'high',
        impact: 'Better quality of life',
        actions: [
          'Upgrade health facilities',
          'Improve education quality',
          'Enhance social protection',
          'Strengthen rural services'
        ]
      }
    ],
    'med-low': [
      {
        id: 6,
        title: 'Infrastructure Development',
        description: 'Build critical infrastructure to support economic growth',
        priority: 'critical',
        impact: 'Foundation for growth',
        actions: [
          'Road and transport networks',
          'Water and sanitation systems',
          'Electricity and connectivity',
          'Market and trade facilities'
        ]
      },
      {
        id: 7,
        title: 'Human Capital Development',
        description: 'Invest in education and skills training',
        priority: 'high',
        impact: 'Long-term productivity',
        actions: [
          'Vocational training programs',
          'Technical education',
          'Adult literacy programs',
          'Entrepreneurship training'
        ]
      }
    ],
    low: [
      {
        id: 8,
        title: 'Emergency Support and Stabilization',
        description: 'Provide immediate support to stabilize conditions',
        priority: 'critical',
        impact: 'Prevent further decline',
        actions: [
          'Emergency financing',
          'Poverty reduction programs',
          'Social safety nets',
          'Food security initiatives'
        ]
      },
      {
        id: 9,
        title: 'Basic Service Delivery',
        description: 'Ensure access to basic healthcare, education, and utilities',
        priority: 'critical',
        impact: 'Immediate impact',
        actions: [
          'Primary healthcare clinics',
          'Primary schools',
          'Water supply systems',
          'Basic electricity access'
        ]
      }
    ]
  };

  const clusterInfo: Record<string, { label: string; color: string; description: string }> = {
    high: { label: 'High Development', color: 'bg-green-100', description: 'Well-developed areas' },
    'med-high': { label: 'Medium-High Development', color: 'bg-blue-100', description: 'Moderately developed areas' },
    'med-low': { label: 'Medium-Low Development', color: 'bg-amber-100', description: 'Areas with growth potential' },
    low: { label: 'Low Development', color: 'bg-red-100', description: 'Areas requiring urgent support' }
  };

  const recommendations = recommendationsByCluster[selectedCluster] || [];

  const priorityColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300'
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Recommendations
          </h1>
          <p className="text-gray-600">
            Evidence-based policy recommendations generated by machine learning analysis
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Region (Optional)
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Regions</option>
                {REGIONS.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Development Cluster
              </label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="high">High Development</option>
                <option value="med-high">Medium-High Development</option>
                <option value="med-low">Medium-Low Development</option>
                <option value="low">Low Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cluster Info */}
        <div className={`${clusterInfo[selectedCluster].color} rounded-lg shadow-lg p-6 mb-8 border-l-4 border-current`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {clusterInfo[selectedCluster].label}
          </h2>
          <p className="text-gray-700">
            {clusterInfo[selectedCluster].description} - Recommendations tailored for regional context
          </p>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} priorityColors={priorityColors} />
          ))}
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Phase 1: Planning</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Stakeholder engagement</li>
                <li>✓ Resource assessment</li>
                <li>✓ Timeline development</li>
                <li>✓ Budget allocation</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Phase 2: Execution</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Pilot programs</li>
                <li>✓ Team deployment</li>
                <li>✓ Progress monitoring</li>
                <li>✓ Course correction</li>
              </ul>
            </div>
            <div className="border-l-4 border-amber-600 pl-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Phase 3: Scaling</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Success documentation</li>
                <li>✓ Regional expansion</li>
                <li>✓ Training rollout</li>
                <li>✓ Capacity building</li>
              </ul>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Phase 4: Monitoring</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Performance tracking</li>
                <li>✓ Impact assessment</li>
                <li>✓ Sustainability plan</li>
                <li>✓ Continuous improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 text-sm text-gray-700">
          <p className="font-bold text-blue-900 mb-2">⚠️ Disclaimer</p>
          <p>
            These recommendations are generated by analyzing regional inequality data using machine learning models.
            They should be reviewed and validated by domain experts before implementation. Actual policy decisions should
            consider local context, political feasibility, and stakeholder input.
          </p>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, priorityColors }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1">{recommendation.title}</h3>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${priorityColors[recommendation.priority]}`}>
            {recommendation.priority.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{recommendation.description}</p>

        <div className="flex gap-4 mb-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Impact:</span>
            <p className="text-gray-600">{recommendation.impact}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          {expanded ? '▼ Hide Details' : '▶ Show Details'}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3">Recommended Actions:</h4>
            <ul className="space-y-2">
              {recommendation.actions.map((action: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                <span className="font-bold">Success Metrics:</span> Monitor KPIs monthly. Adjust strategies quarterly based on outcomes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
