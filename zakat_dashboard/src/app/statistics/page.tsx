'use client';

import Navbar from '@/components/navbar';
import { useState, useMemo } from 'react';
import {
  districtDistribution,
  summaryStats,
  yearlyBreakdown,
  monthlyDistribution,
  ageGroupDistribution,
  genderDistribution,
  healthStatusDistribution,
  jobTypeDistribution,
} from '@/data/zakatData';

export default function Statistics() {
  const [selectedDaerah, setSelectedDaerah] = useState('all');
  const [selectedYear, setSelectedYear] = useState<'2022' | '2023' | '2024'>('2024');

  // Get monthly data for selected year
  const monthlyData = useMemo(() => {
    return monthlyDistribution[selectedYear] || monthlyDistribution['2024'];
  }, [selectedYear]);

  // Calculate totals
  const totalRecipients = summaryStats.totalRecipients;
  const maxDistrictCount = Math.max(...districtDistribution.map(d => d.count));
  const maxMonthly = Math.max(...monthlyData.map(m => m.count));

  // Calculate donut chart for district distribution
  const radius = 70;
  let currentAngle = -90;

  const colors = ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899', '#84cc16', '#6366f1', '#14b8a6', '#f43f5e'];

  const donutSegments = districtDistribution.map((district, index) => {
    const percentage = (district.count / totalRecipients) * 100;
    const angle = (district.count / totalRecipients) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startX = 90 + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = 90 + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = 90 + radius * Math.cos((currentAngle * Math.PI) / 180);
    const endY = 90 + radius * Math.sin((currentAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      ...district,
      percentage: percentage.toFixed(1),
      color: colors[index % colors.length],
      path: `M 90 90 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Statistics: Zakat Recipients by Location</h1>
            <p className="text-sm text-gray-600">
              Real data analysis of {totalRecipients.toLocaleString()} zakat recipients distribution across Kedah districts
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select 
              value={selectedDaerah}
              onChange={(e) => setSelectedDaerah(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Districts (Daerah)</option>
              {districtDistribution.map((d) => (
                <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
              ))}
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as '2022' | '2023' | '2024')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Map Section (Left) */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Kedah Districts - Recipients Distribution</h2>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded">
                  {districtDistribution.length} Districts
                </span>
              </div>
              
              {/* District Bars */}
              <div className="space-y-3 mb-6">
                {districtDistribution.map((district, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[index % colors.length] }}></div>
                        <span className="text-sm font-medium text-gray-700">{district.name} ({district.code})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{district.count.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({district.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all"
                        style={{ 
                          width: `${(district.count / maxDistrictCount) * 100}%`,
                          backgroundColor: colors[index % colors.length]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Highest</p>
                    <p className="text-sm font-semibold text-gray-900">{districtDistribution[0].name}</p>
                    <p className="text-xs text-teal-600">{districtDistribution[0].count.toLocaleString()} recipients</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Districts</p>
                    <p className="text-sm font-semibold text-gray-900">{districtDistribution.length}</p>
                    <p className="text-xs text-gray-600">Kedah State</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lowest</p>
                    <p className="text-sm font-semibold text-gray-900">{districtDistribution[districtDistribution.length - 1].name}</p>
                    <p className="text-xs text-orange-600">{districtDistribution[districtDistribution.length - 1].count.toLocaleString()} recipients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Charts */}
            <div className="space-y-6">
              
              {/* Donut Chart - Recipients by Daerah */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">District Distribution</h3>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-90">
                      {donutSegments.map((segment, index) => (
                        <path
                          key={index}
                          d={segment.path}
                          fill={segment.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                      <circle cx="90" cy="90" r="45" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-600">Total</span>
                      <span className="text-2xl font-bold text-gray-900">{(totalRecipients / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 w-full max-h-32 overflow-y-auto">
                    {donutSegments.slice(0, 6).map((segment, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: segment.color }}></div>
                          <span className="text-gray-700">{segment.name}</span>
                        </div>
                        <span className="text-gray-600">{segment.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gender Split */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Gender Distribution</h3>
                <div className="space-y-3">
                  {genderDistribution.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${index === 0 ? 'bg-pink-500' : 'bg-blue-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            
            {/* Monthly Trend */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Monthly Recipients ({selectedYear})</h3>
              <p className="text-xs text-gray-500 mb-4">Distribution trend throughout the year</p>
              <div className="flex items-end justify-between h-48 gap-1">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                        style={{ height: `${(data.count / maxMonthly) * 100}%` }}
                        title={`${data.month}: ${data.count.toLocaleString()}`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{data.month.slice(0, 3)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Distribution */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Age Group Distribution</h3>
              <p className="text-xs text-gray-500 mb-4">Recipients by age category (Avg: {summaryStats.averageAge} years)</p>
              <div className="flex items-end justify-around h-48">
                {ageGroupDistribution.map((item, index) => {
                  const maxAge = Math.max(...ageGroupDistribution.map(a => a.count));
                  const colors = ['bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700'];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-900 mb-1">{item.count.toLocaleString()}</span>
                      <div 
                        className={`w-12 ${colors[index]} rounded-t transition-all`}
                        style={{ height: `${(item.count / maxAge) * 140}px` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{item.ageGroup}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            
            {/* Health Status */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Health Status</h3>
              <div className="space-y-3">
                {healthStatusDistribution.map((item, index) => {
                  const statusColors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500'];
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${statusColors[index]}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Employment Status */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Employment Status</h3>
              <div className="space-y-3">
                {jobTypeDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yearly Comparison */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Yearly Comparison</h3>
              <div className="space-y-4">
                {yearlyBreakdown.map((item, index) => {
                  const maxYearly = Math.max(...yearlyBreakdown.map(y => y.recipients));
                  const yearColors = ['bg-teal-400', 'bg-teal-500', 'bg-teal-600'];
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.year}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.recipients.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full ${yearColors[index]}`}
                          style={{ width: `${(item.recipients / maxYearly) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total (2022-2024)</span>
                  <span className="text-sm font-bold text-gray-900">{totalRecipients.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500">Total Recipients</p>
              <p className="text-xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500">Total Districts</p>
              <p className="text-xl font-bold text-gray-900">{districtDistribution.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500">Avg. Income</p>
              <p className="text-xl font-bold text-green-600">RM {summaryStats.averageIncome.toFixed(0)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500">Avg. Expenses</p>
              <p className="text-xl font-bold text-red-600">RM {summaryStats.averageExpenses.toFixed(0)}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Data source: Zakat Data.xlsx | Total Records: {totalRecipients.toLocaleString()} | 
              Period: 2022-2024 | State: Kedah | Location-based Statistics
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
