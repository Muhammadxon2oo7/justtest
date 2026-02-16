'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { REGIONS, INDICATORS, INDICATOR_CATEGORIES } from '@/lib/data/regions';

export default function DataInputPage() {
  const [step, setStep] = useState<'region' | 'year' | 'indicators'>('region');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [year, setYear] = useState<number>(2024);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setStep('year');
  };

  const handleYearSelect = () => {
    setStep('indicators');
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    // TODO: Send to API
  };

  if (step === 'region') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Ma'lumot Kiritish Mag'itidagi</h1>
            <p className="text-lg text-gray-600 mb-8">1-bosqich: Viloyatni Tanlang</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionSelect(region.id)}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition text-left"
                >
                  <h3 className="font-bold text-lg text-gray-900">{region.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {region.districts} districts
                  </p>
                  <div className="flex gap-2 mt-3">
                    {region.capital && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Markazi: {region.capital}
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {region.districts} ta tuman
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'year') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Ma'lumot Kiritish Mag'itidagi</h1>
            <p className="text-lg text-gray-600 mb-8">2-bosqich: Yilni Tanlang</p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setYear(y);
                      handleYearSelect();
                    }}
                    className="w-full p-4 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition text-left font-medium text-gray-900"
                  >
                    {y}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep('region')}
                className="mt-8 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const region = REGIONS.find(r => r.id === selectedRegion);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ma'lumot Kiritish Mag'itidagi</h1>
          <p className="text-gray-600 mb-8">
            3-bosqich: {region?.name} uchun {year} yil indikatorlarini kiriting
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
            {INDICATOR_CATEGORIES.map((category) => (
              <div key={category.id} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h2>
                <p className="text-sm text-gray-600 mb-4">Og'irlik: {(category.weight * 100).toFixed(0)}%</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {INDICATORS.filter(ind => ind.category === category.id).map((indicator) => (
                    <div key={indicator.id}>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {indicator.name}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max={1000}
                          placeholder="0 - 1000"
                          {...register(`indicators.${indicator.id}`, {
                            required: 'Ushbu maydon kerak',
                            min: { value: 0, message: 'Musbat bo\'lishi kerak' },
                            max: { value: 1000, message: 'Max 1000' }
                          })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <span className="py-2 text-sm text-gray-600">{indicator.unit}</span>
                      </div>
                      {errors[`indicators.${indicator.id}`] && (
                        <p className="text-red-600 text-sm mt-1">
                          {(errors[`indicators.${indicator.id}`] as any)?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setStep('year')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Submit Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
