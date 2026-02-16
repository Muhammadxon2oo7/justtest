'use client';

import { useState } from 'react';
import { REGIONS_DATA, ALL_INDICATORS } from '@/lib/data/regions-expanded';
import { CLUSTER_STRATEGIES, REGIONAL_RECOMMENDATIONS } from '@/lib/data/strategies';

export default function AnalysisClusteringPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [formData, setFormData] = useState<Record<string, number>>({});
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'clusters' | 'strategies'>('input');

  const years = Array.from({ length: 12 }, (_, i) => 2014 + i);
  const regions = Object.keys(REGIONS_DATA);

  const handleInputChange = (key: string, value: number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generateSampleData = () => {
    const data: Record<string, number> = {};
    const growthFactor = 1 + (selectedYear - 2014) * 0.08;

    for (const [direction, indicators] of Object.entries(ALL_INDICATORS)) {
      for (const [code, info] of Object.entries(indicators)) {
        let base;
        if (['D3', 'S3'].includes(code)) {
          base = (3 + Math.random() * 5);
        } else if (code.startsWith('D')) {
          base = (10 + Math.random() * 20);
        } else if (code.startsWith('I')) {
          base = (20 + Math.random() * 80);
        } else {
          base = (100 + Math.random() * 900);
        }
        data[code] = Math.round(base * growthFactor * 100) / 100;
      }
    }
    setFormData(data);
  };

  const calculateStatistics = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (values.length - 1));
    const cv = mean !== 0 ? (std / mean) * 100 : 0;

    // Gini
    const sum = sorted.reduce((a, b) => a + b, 0);
    let giniSum = 0;
    for (let i = 0; i < sorted.length; i++) {
      giniSum += (2 * (i + 1) - sorted.length - 1) * sorted[i];
    }
    const gini = giniSum / (sorted.length * sum);

    // Decile
    const d1 = sorted[Math.floor(sorted.length * 0.1)];
    const d9 = sorted[Math.floor(sorted.length * 0.9)];
    const decile = d1 !== 0 ? d9 / d1 : 999.99;

    return { mean, std, cv, gini, decile };
  };

  const runAnalysis = async () => {
    if (!selectedRegion) {
      alert('Iltimos, viloyatni tanlang!');
      return;
    }

    if (Object.keys(formData).length === 0) {
      alert('Iltimos, ma\'lumotlarni kiriting!');
      return;
    }

    setLoading(true);

    try {
      const values = Object.values(formData).filter(v => v > 0);
      if (values.length === 0) throw new Error('Ma\'lumotlar topilmadi');

      const stats = calculateStatistics(values);
      
      // Normalize data
      const allValues = Object.values(formData).filter(v => v > 0);
      const minVal = Math.min(...allValues);
      const maxVal = Math.max(...allValues);
      const range = maxVal - minVal || 1;

      const normalized: Record<string, number> = {};
      for (const [key, val] of Object.entries(formData)) {
        normalized[key] = (val - minVal) / range;
      }

      // Calculate composite index
      const compositeIndex = Object.values(normalized).reduce((a, b) => a + b, 0) / Object.values(normalized).length;

      // Assign cluster
      let cluster = 4;
      if (compositeIndex >= 0.70) cluster = 1;
      else if (compositeIndex >= 0.50) cluster = 2;
      else if (compositeIndex >= 0.35) cluster = 3;

      setAnalysisResults({
        region: selectedRegion,
        year: selectedYear,
        statistics: stats,
        compositeIndex: Math.round(compositeIndex * 10000) / 10000,
        cluster,
        normalizedData: normalized,
        timestamp: new Date().toISOString()
      });

      setActiveTab('results');
    } catch (error) {
      alert('Xato: ' + (error instanceof Error ? error.message : 'Noma\'lum xato'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎯 Viloyatlар Klasterizatsiyasi va Tasnqifiкаdirilishi
          </h1>
          <p className="text-lg text-gray-700">
            Viloyatlarning iqtisodiy va ijtimoiy ko'rsatkichlari asosida tahlil
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex gap-0 border-b-2 border-gray-200">
            {[
              { id: 'input', label: '📝 Ma\'lumot Kiritish' },
              { id: 'results', label: '📊 Natijalar' },
              { id: 'clusters', label: '🎯 Klasterlar' },
              { id: 'strategies', label: '💡 Strategiyalar' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 font-semibold transition-all text-center ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-emerald-600 to-green-600 text-white border-b-4 border-emerald-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Tab */}
        {activeTab === 'input' && (
          <div className="space-y-6">
            {/* Region Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">1️⃣ Viloyatni Tanlang</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`p-3 rounded-lg font-semibold transition-all ${
                      selectedRegion === region
                        ? 'bg-linear-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">2️⃣ Yilni Tanlang</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`p-2 rounded-lg font-semibold transition-all ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Indicators Input */}
            {selectedRegion && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">3️⃣ Indikatorlarni Kiriting</h2>
                  <div className="space-x-3">
                    <button
                      onClick={generateSampleData}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                    >
                      📋 Namunali Ma\'lumot
                    </button>
                    <button
                      onClick={() => setFormData({})}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    >
                      🗑️ Tozalash
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(ALL_INDICATORS).map(([direction, indicators]) => (
                    <div key={direction} className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-l-4" style={{borderLeftColor: {IQTISODIY: '#28a745', IJTIMOIY: '#17a2b8', DEMOGRAFIK: '#6f42c1', INFRATUZILMA: '#fd7e14'}[direction]}}>
                      <h3 className="font-bold text-lg mb-3" style={{color: {IQTISODIY: '#28a745', IJTIMOIY: '#17a2b8', DEMOGRAFIK: '#6f42c1', INFRATUZILMA: '#fd7e14'}[direction]}}>
                        {direction}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(indicators).map(([code, info]: any) => (
                          <div key={code}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              {code}: {info.name} ({info.unit})
                            </label>
                            <input
                              type="number"
                              value={formData[code] || ''}
                              onChange={(e) => handleInputChange(code, parseFloat(e.target.value) || 0)}
                              placeholder="Qiymatni kiriting"
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={runAnalysis}
                  disabled={loading}
                  className="mt-6 w-full py-4 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? '⏳ Tahlil boshlanmoqda...' : '▶️ Tahlilni Boshlash'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && analysisResults && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="text-4xl font-bold mb-2">{Math.round(analysisResults.statistics.cv)}</div>
                <div className="font-semibold">O'zgaruvchanlik (%)</div>
                <div className="text-sm mt-2 opacity-90">Gini: {analysisResults.statistics.gini.toFixed(3)}</div>
              </div>
              <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                <div className="text-4xl font-bold mb-2">{analysisResults.compositeIndex.toFixed(3)}</div>
                <div className="font-semibold">Kombinlangan Indeksi</div>
                <div className="text-sm mt-2 opacity-90">0.00 - 1.00 oralig'ida</div>
              </div>
              <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="text-4xl font-bold mb-2">{analysisResults.statistics.decile.toFixed(2)}</div>
                <div className="font-semibold">Decil Nisbati</div>
                <div className="text-sm mt-2 opacity-90">D9 / D1</div>
              </div>
              <div className={`rounded-lg shadow-lg p-6 text-white ${
                analysisResults.cluster === 1 ? 'bg-linear-to-br from-green-500 to-green-600' :
                analysisResults.cluster === 2 ? 'bg-linear-to-br from-blue-500 to-blue-600' :
                analysisResults.cluster === 3 ? 'bg-linear-to-br from-amber-500 to-amber-600' :
                'bg-linear-to-br from-red-500 to-red-600'
              }`}>
                <div className="text-4xl font-bold mb-2">{analysisResults.cluster}</div>
                <div className="font-semibold">Klaster</div>
                <div className="text-sm mt-2 opacity-90">{CLUSTER_STRATEGIES[analysisResults.cluster as 1|2|3|4].title}</div>
              </div>
            </div>

            {/* Detailed Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">📊 Batafsil Statistika</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 font-semibold">O'rtacha Qiymat:</div>
                  <div className="text-2xl font-bold text-gray-900">{analysisResults.statistics.mean.toFixed(2)}</div>
                </div>
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 font-semibold">Standart Og'ish:</div>
                  <div className="text-2xl font-bold text-gray-900">{analysisResults.statistics.std.toFixed(2)}</div>
                </div>
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 font-semibold">Theil Indeksi:</div>
                  <div className="text-2xl font-bold text-gray-900">{analysisResults.statistics.theil?.toFixed(3) || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisResults && activeTab === 'results' && (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Tahlil: {new Date(analysisResults.timestamp).toLocaleString('uz-UZ')}
            </p>
          </div>
        )}

        {/* Clusters Tab */}
        {activeTab === 'clusters' && analysisResults && (
          <div className="space-y-6">
            {Object.entries(CLUSTER_STRATEGIES).map(([clusterNum, strategy]: any) => (
              <div
                key={clusterNum}
                className={`rounded-lg shadow-lg overflow-hidden border-l-8 ${
                  clusterNum === '1' ? 'border-green-500 bg-linear-to-br from-green-50 to-emerald-50' :
                  clusterNum === '2' ? 'border-blue-500 bg-linear-to-br from-blue-50 to-cyan-50' :
                  clusterNum === '3' ? 'border-amber-500 bg-linear-to-br from-amber-50 to-yellow-50' :
                  'border-red-500 bg-linear-to-br from-red-50 to-pink-50'
                }`}
              >
                <div className={`p-4 text-white ${
                  clusterNum === '1' ? 'bg-linear-to-r from-green-600 to-emerald-600' :
                  clusterNum === '2' ? 'bg-linear-to-r from-blue-600 to-cyan-600' :
                  clusterNum === '3' ? 'bg-linear-to-r from-amber-600 to-yellow-600' :
                  'bg-linear-to-r from-red-600 to-pink-600'
                }`}>
                  <h3 className="text-2xl font-bold">{strategy.title}</h3>
                  <p className="text-sm opacity-90">Indeksi: {strategy.range}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Xususiyatlari:</h4>
                    <ul className="space-y-2">
                      {strategy.characteristics.map((char: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-xl">✓</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {analysisResults.cluster == clusterNum && (
                    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                      <p className="font-bold text-yellow-900">🎯 Siz bu klasterdagi viloyatlar!</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Regional Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-600">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🌍 Umum-Viloyat Bo'yicha Tavsiyalar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REGIONAL_RECOMMENDATIONS.map((rec, idx) => (
                  <div key={idx} className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border-l-4 border-indigo-600">
                    <div className="text-3xl mb-2">{rec.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-700">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === 'strategies' && analysisResults && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
              💡 {analysisResults.cluster}-Klaster Uchun Strategiyalar
            </h2>
            
            {Object.entries(CLUSTER_STRATEGIES[analysisResults.cluster as 1|2|3|4].strategies).map(([strategyType, actions]: any) => (
              <div key={strategyType} className="mb-8 pb-8 border-b-2 border-gray-200 last:border-b-0">
                <h3 className="text-xl font-bold mb-4 capitalize text-gray-900">
                  {strategyType === 'economic' && '💰 IQTISODIY'}
                  {strategyType === 'social' && '👥 IJTIMOIY'}
                  {strategyType === 'demographic' && '👨‍👩‍👧‍👦 DEMOGRAFIK'}
                  {strategyType === 'infrastructure' && '🏗️ INFRATUZILMA'}
                </h3>
                <div className="space-y-4">
                  {actions.map((action: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-600">
                      <div className="font-bold text-gray-900 mb-2">📌 {action.action}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Kutilayotgan natija:</span>
                          <div className="text-gray-900 font-semibold">{action.indicators.join(', ')}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Vaqt jadval:</span>
                          <div className="text-gray-900 font-semibold">{action.timeline}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
