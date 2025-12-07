'use client';

import Navbar from '@/components/navbar';
import { useState, useMemo } from 'react';
import {
  districtDistribution,
  jobTypeDistribution,
  yearlyBreakdown,
  summaryStats,
  monthlyDistribution,
} from '@/data/zakatData';

export default function Overview() {
  const [selectedYear, setSelectedYear] = useState<'2022' | '2023' | '2024'>('2024');

  const monthlyData = useMemo(() => {
    return monthlyDistribution[selectedYear] || monthlyDistribution['2024'];
  }, [selectedYear]);

  const yearData = useMemo(() => {
    const year = yearlyBreakdown.find(y => y.year === parseInt(selectedYear));
    return year || yearlyBreakdown[2];
  }, [selectedYear]);

  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count));
  const topDistricts = districtDistribution.slice(0, 6);
  const maxDistrictCount = Math.max(...topDistricts.map(d => d.count));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">{summaryStats.totalRecipients.toLocaleString()} recipients across {summaryStats.totalDistricts} districts</p>
            </div>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as '2022' | '2023' | '2024')}
              className="mt-4 sm:mt-0 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Recipients ({selectedYear})</p>
              <p className="text-2xl font-bold text-gray-900">{yearData.recipients.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Avg. Income</p>
              <p className="text-2xl font-bold text-emerald-600">RM {summaryStats.averageIncome.toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Avg. Expenses</p>
              <p className="text-2xl font-bold text-red-600">RM {summaryStats.averageExpenses.toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Unemployed Rate</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.unemployedPercentage}%</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900">Monthly Recipients ({selectedYear})</h3>
                <span className="text-xs font-bold text-emerald-600">{monthlyData.reduce((sum, d) => sum + d.count, 0).toLocaleString()} total</span>
              </div>
              <p className="text-xs text-gray-500 mb-6">Hover over bars to see details</p>
              <div className="flex items-end justify-between gap-2" style={{ height: '160px' }}>
                {monthlyData.map((data, index) => {
                  const barHeight = (data.count / maxMonthlyCount) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group relative h-full">
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {data.month}: {data.count.toLocaleString()}
                      </div>
                      {/* Bar container */}
                      <div className="w-full flex-1 flex items-end">
                        <div 
                          className="w-full bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-600 cursor-pointer"
                          style={{ height: `${barHeight}%`, minHeight: '4px' }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-2 group-hover:text-gray-900 group-hover:font-semibold transition-all">{data.month.slice(0, 3)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Districts */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Top Districts</h3>
              <p className="text-xs text-gray-500 mb-6">Recipients by location</p>
              <div className="space-y-3">
                {topDistricts.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">{item.name}</span>
                      <span className="text-xs font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.count / maxDistrictCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Gender */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Gender Distribution</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#f472b6" strokeWidth="16"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - summaryStats.femalePercentage / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">{summaryStats.femalePercentage}%</span>
                    <span className="text-[10px] text-gray-500">Female</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Female {summaryStats.femalePercentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <span className="text-xs text-gray-600">Male {100 - summaryStats.femalePercentage}%</span>
                </div>
              </div>
            </div>

            {/* Employment */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Employment Status</h3>
              <div className="space-y-3">
                {jobTypeDistribution.slice(0, 4).map((job, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">{job.type}</span>
                      <span className="text-xs font-semibold text-gray-900">{job.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${job.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-semibold mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Healthy Recipients</span>
                  <span className="text-sm font-bold">{summaryStats.healthyPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Married</span>
                  <span className="text-sm font-bold">{summaryStats.marriedPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Average Age</span>
                  <span className="text-sm font-bold">{summaryStats.averageAge} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Income Gap</span>
                  <span className="text-sm font-bold text-red-400">-RM {(summaryStats.averageExpenses - summaryStats.averageIncome).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
