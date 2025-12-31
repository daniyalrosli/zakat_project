'use client';

import Navbar from '@/components/navbar';
import { useState } from 'react';
import { districtDistribution, summaryStats } from '@/data/zakatData';

const districtColors = [
  '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#10b981',
  '#3b82f6', '#f59e0b', '#ef4444', '#84cc16', '#6366f1',
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

  const topDistricts = districtDistribution.slice(0, 6);
  
  let cumulativePercentage = 0;
  const pieSegments = topDistricts.map((district, i) => {
    const percentage = (district.count / totalRecipients) * 100;
    const startAngle = cumulativePercentage * 3.6;
    cumulativePercentage += percentage;
    return { ...district, percentage, startAngle, color: districtColors[i] };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">District Statistics</h1>
            <p className="text-sm text-gray-400 mt-1">Recipient distribution across {summaryStats.totalDistricts} districts in Kedah</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <p className="text-xs text-purple-300 mb-1">Total Districts</p>
              <p className="text-2xl font-bold text-white">{summaryStats.totalDistricts}</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20">
              <p className="text-xs text-cyan-300 mb-1">Total Recipients</p>
              <p className="text-2xl font-bold text-cyan-400">{totalRecipients.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/20">
              <p className="text-xs text-pink-300 mb-1">Largest District</p>
              <p className="text-2xl font-bold text-pink-400">{districtDistribution[0].name}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20">
              <p className="text-xs text-yellow-300 mb-1">Avg per District</p>
              <p className="text-2xl font-bold text-white">{Math.round(totalRecipients / summaryStats.totalDistricts).toLocaleString()}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* District Chart */}
            <div className="lg:col-span-2 bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-sm font-semibold text-white mb-1">Recipients by District</h3>
              <p className="text-xs text-gray-400 mb-6">Click on a bar to view details</p>
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
                        <span className="text-xs font-medium text-gray-300">{district.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-white">{district.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-3">
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
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-sm font-semibold text-white mb-1">Distribution Share</h3>
              <p className="text-xs text-gray-400 mb-6">Top 6 districts</p>
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {pieSegments.map((segment, i) => {
                      const circumference = 2 * Math.PI * 60;
                      const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -pieSegments.slice(0, i).reduce((sum, s) => sum + (s.percentage / 100) * circumference, 0);
                      return (
                        <circle key={i} cx="80" cy="80" r="60" fill="none" stroke={segment.color} strokeWidth="20"
                          strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{summaryStats.totalDistricts}</span>
                    <span className="text-[10px] text-gray-400">Districts</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {pieSegments.slice(0, 4).map((segment, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }}></div>
                      <span className="text-xs text-gray-400">{segment.name}</span>
                    </div>
                    <span className="text-xs font-medium text-white">{segment.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-sm font-semibold text-white mb-1">Age Distribution</h3>
              <p className="text-xs text-gray-400 mb-6">Recipients by age group</p>
              <div className="space-y-3">
                {ageGroups.map((group, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-300">{group.range} years</span>
                      <span className="text-xs text-gray-400">{group.count.toLocaleString()} ({group.percentage}%)</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${group.percentage * 4}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-sm font-semibold text-white mb-6">Demographic Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-1">Female</p>
                  <p className="text-xl font-bold text-pink-400">{summaryStats.femalePercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-1">Male</p>
                  <p className="text-xl font-bold text-cyan-400">{100 - summaryStats.femalePercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-1">Married</p>
                  <p className="text-xl font-bold text-purple-400">{summaryStats.marriedPercentage}%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-1">Healthy</p>
                  <p className="text-xl font-bold text-emerald-400">{summaryStats.healthyPercentage}%</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Average Age</span>
                  <span className="text-lg font-bold text-white">{summaryStats.averageAge} years</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
