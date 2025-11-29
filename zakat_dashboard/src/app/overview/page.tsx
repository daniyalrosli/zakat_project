'use client';

import Navbar from '@/components/navbar';
import { DollarSign, TrendingUp, Users, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  districtDistribution,
  jobTypeDistribution,
  healthStatusDistribution,
  ageGroupDistribution,
  yearlyBreakdown,
  summaryStats,
  monthlyDistribution,
  incomeStatistics,
} from '@/data/zakatData';

export default function Overview() {
  const [selectedYear, setSelectedYear] = useState<'2022' | '2023' | '2024'>('2024');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Get monthly data for selected year
  const monthlyData = useMemo(() => {
    return monthlyDistribution[selectedYear] || monthlyDistribution['2024'];
  }, [selectedYear]);

  // Calculate totals for selected year
  const yearData = useMemo(() => {
    const year = yearlyBreakdown.find(y => y.year === parseInt(selectedYear));
    return year || yearlyBreakdown[2];
  }, [selectedYear]);

  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count));
  const totalYearlyRecipients = yearData.recipients;

  // Top 5 districts for horizontal bar
  const topDistricts = districtDistribution.slice(0, 5);
  const maxDistrictCount = Math.max(...topDistricts.map(d => d.count));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Zakat Distribution Dashboard</h1>
            <p className="text-sm text-gray-600">
              Real data from Zakat recipients in Kedah. Total of {summaryStats.totalRecipients.toLocaleString()} recipients across {summaryStats.totalDistricts} districts.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Districts</option>
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

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Users size={20} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Recipients ({selectedYear})</p>
                  <p className="text-xl font-bold text-gray-900">{totalYearlyRecipients.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Income</p>
                  <p className="text-xl font-bold text-gray-900">RM {summaryStats.averageIncome.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingUp size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Expenses</p>
                  <p className="text-xl font-bold text-gray-900">RM {summaryStats.averageExpenses.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Districts Covered</p>
                  <p className="text-xl font-bold text-gray-900">{summaryStats.totalDistricts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Row 1: Monthly Recipients */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Recipients by Month ({selectedYear})</h3>
              <p className="text-xs text-gray-500 mb-4">Monthly distribution of zakat recipients</p>
              <div className="flex items-end justify-between h-48 gap-1">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                        style={{ height: `${(data.count / maxMonthlyCount) * 100}%` }}
                        title={`${data.month}: ${data.count.toLocaleString()} recipients`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{data.month.slice(0, 3)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 1: Top Districts */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Recipients by District</h3>
              <p className="text-xs text-gray-500 mb-4">Top 5 districts with most recipients</p>
              <div className="space-y-3">
                {topDistricts.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-teal-500 h-3 rounded-full transition-all"
                        style={{ width: `${(item.count / maxDistrictCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 1: Gender Distribution */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Gender Distribution</h3>
              <p className="text-xs text-gray-500 mb-4">Male vs Female recipients</p>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#fecaca"
                      strokeWidth="20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="20"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - summaryStats.femalePercentage / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{summaryStats.femalePercentage}%</span>
                    <span className="text-xs text-gray-500">Female</span>
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-sm text-gray-600">Female ({summaryStats.femalePercentage}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-200"></div>
                    <span className="text-sm text-gray-600">Male ({summaryStats.malePercentage}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Job Type Distribution */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Employment Status</h3>
              <p className="text-xs text-gray-500 mb-4">Recipients by job type</p>
              <div className="space-y-2">
                {jobTypeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 h-10 rounded relative overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-blue-400 flex items-center justify-between px-3 transition-all"
                        style={{ width: `${(item.count / jobTypeDistribution[0].count) * 100}%`, minWidth: '120px' }}
                      >
                        <span className="text-xs font-medium text-gray-800 truncate">{item.label}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-16 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Health Status */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Health Status</h3>
              <p className="text-xs text-gray-500 mb-4">Recipients by health condition</p>
              <div className="space-y-2">
                {healthStatusDistribution.map((item, index) => {
                  const colors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500'];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 h-10 rounded relative overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full ${colors[index]} flex items-center px-3 transition-all`}
                          style={{ width: `${item.percentage}%`, minWidth: '100px' }}
                        >
                          <span className="text-xs font-medium text-white truncate">{item.label}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-20 text-right">{item.count.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Age Group Distribution */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Age Distribution</h3>
              <p className="text-xs text-gray-500 mb-4">Recipients by age group (Avg: {summaryStats.averageAge} years)</p>
              <div className="space-y-2">
                {ageGroupDistribution.map((item, index) => {
                  const maxAge = Math.max(...ageGroupDistribution.map(a => a.count));
                  const colors = ['bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700'];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-12">{item.ageGroup}</span>
                      <div className="flex-1 bg-gray-100 h-8 rounded relative overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full ${colors[index]} transition-all`}
                          style={{ width: `${(item.count / maxAge) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-16 text-right">{item.count.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Yearly Comparison */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Yearly Recipients Comparison</h3>
              <p className="text-xs text-gray-500 mb-4">Total recipients across years (2022-2024)</p>
              <div className="flex items-end justify-around h-48 gap-8">
                {yearlyBreakdown.map((data, index) => {
                  const maxYearly = Math.max(...yearlyBreakdown.map(y => y.recipients));
                  const colors = ['bg-teal-400', 'bg-teal-500', 'bg-teal-600'];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900 mb-2">{data.recipients.toLocaleString()}</span>
                      <div 
                        className={`w-20 ${colors[index]} rounded-t transition-all`}
                        style={{ height: `${(data.recipients / maxYearly) * 150}px` }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 mt-2">{data.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Income vs Expenses */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Income vs Expenses</h3>
              <p className="text-xs text-gray-500 mb-4">Average monthly financial status</p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Income</span>
                    <span className="text-sm font-semibold text-green-600">RM {incomeStatistics.totalIncome.mean.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Expenses</span>
                    <span className="text-sm font-semibold text-red-600">RM {incomeStatistics.totalExpenses.mean.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Deficit</span>
                    <span className="text-sm font-bold text-red-600">
                      RM {(incomeStatistics.totalExpenses.mean - incomeStatistics.totalIncome.mean).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Recipients earn less than they spend on average</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Data source: Zakat Data.xlsx | Total Records: {summaryStats.totalRecipients.toLocaleString()} | 
              Last updated: 2024 | Kedah State Zakat Distribution Data
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
