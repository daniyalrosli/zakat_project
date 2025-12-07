'use client';

import Navbar from '@/components/navbar';
import { useState } from 'react';
import { districtDistribution, summaryStats } from '@/data/zakatData';

const districtColors = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981',
  '#06b6d4', '#f59e0b', '#ef4444', '#84cc16', '#6366f1',
  '#14b8a6', '#a855f7'
];

const ageGroups = [
  { range: '18-25', count: 4156, percentage: 8 },
  { range: '26-35', count: 9353, percentage: 18 },
  { range: '36-45', count: 12990, percentage: 25 },
  { range: '46-55', count: 14029, percentage: 27 },
  { range: '56-65', count: 7794, percentage: 15 },
  { range: '65+', count: 3640, percentage: 7 },
];

export default function Statistics() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  const totalRecipients = districtDistribution.reduce((sum, d) => sum + d.count, 0);
  const maxDistrictCount = Math.max(...districtDistribution.map(d => d.count));

  // Calculate pie chart segments
  const topDistricts = districtDistribution.slice(0, 6);
  const othersCount = districtDistribution.slice(6).reduce((sum, d) => sum + d.count, 0);
  
  let cumulativePercentage = 0;
  const pieSegments = topDistricts.map((district, i) => {
    const percentage = (district.count / totalRecipients) * 100;
    const startAngle = cumulativePercentage * 3.6;
    cumulativePercentage += percentage;
    return { ...district, percentage, startAngle, color: districtColors[i] };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">District Statistics</h1>
            <p className="text-sm text-gray-500 mt-1">Recipient distribution across {summaryStats.totalDistricts} districts in Kedah</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Total Districts</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.totalDistricts}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Total Recipients</p>
              <p className="text-2xl font-bold text-blue-600">{totalRecipients.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Largest District</p>
              <p className="text-2xl font-bold text-emerald-600">{districtDistribution[0].name}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Avg per District</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalRecipients / summaryStats.totalDistricts).toLocaleString()}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* District Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Recipients by District</h3>
              <p className="text-xs text-gray-500 mb-6">Click on a bar to view details</p>
              <div className="space-y-3">
                {districtDistribution.map((district, i) => (
                  <div 
                    key={i}
                    className={`cursor-pointer transition-all ${selectedDistrict === district.name ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                    onClick={() => setSelectedDistrict(selectedDistrict === district.name ? null : district.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: districtColors[i % districtColors.length] }}></div>
                        <span className="text-xs font-medium text-gray-700">{district.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">{district.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${selectedDistrict === district.name ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                        style={{ 
                          width: `${(district.count / maxDistrictCount) * 100}%`,
                          backgroundColor: districtColors[i % districtColors.length]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Distribution Share</h3>
              <p className="text-xs text-gray-500 mb-6">Top 6 districts</p>
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {pieSegments.map((segment, i) => {
                      const circumference = 2 * Math.PI * 60;
                      const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -pieSegments.slice(0, i).reduce((sum, s) => sum + (s.percentage / 100) * circumference, 0);
                      return (
                        <circle
                          key={i}
                          cx="80"
                          cy="80"
                          r="60"
                          fill="none"
                          stroke={segment.color}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{summaryStats.totalDistricts}</span>
                    <span className="text-[10px] text-gray-500">Districts</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {pieSegments.slice(0, 4).map((segment, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }}></div>
                      <span className="text-xs text-gray-600">{segment.name}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{segment.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Age Distribution</h3>
              <p className="text-xs text-gray-500 mb-6">Recipients by age group</p>
              <div className="space-y-3">
                {ageGroups.map((group, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">{group.range} years</span>
                      <span className="text-xs text-gray-500">{group.count.toLocaleString()} ({group.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                        style={{ width: `${group.percentage * 4}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-semibold mb-6">Demographic Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Female</p>
                  <p className="text-xl font-bold">{summaryStats.femalePercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Male</p>
                  <p className="text-xl font-bold">{100 - summaryStats.femalePercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Married</p>
                  <p className="text-xl font-bold">{summaryStats.marriedPercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Healthy</p>
                  <p className="text-xl font-bold">{summaryStats.healthyPercentage}%</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Average Age</span>
                  <span className="text-lg font-bold">{summaryStats.averageAge} years</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
