'use client';

import Navbar from '@/components/navbar';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  summaryStats,
  yearlyBreakdown,
  jobTypeDistribution,
  healthStatusDistribution,
  featureImportance,
  modelPerformance,
  districtDistribution,
  ageGroupDistribution,
  genderDistribution,
  maritalStatusDistribution,
} from '@/data/zakatData';

export default function Report() {
  const [selectedYear, setSelectedYear] = useState('all');

  // Calculate totals based on real data
  const totalRecipients = summaryStats.totalRecipients;
  const unemployedCount = jobTypeDistribution.find(j => j.type === 'Tidak Bekerja')?.count || 0;
  const unemployedRate = summaryStats.unemployedPercentage;
  const healthyRate = summaryStats.healthyPercentage;

  // Yearly data for the table
  const yearlyData = yearlyBreakdown.map(y => ({
    year: y.year,
    recipients: y.recipients,
    avgIncome: summaryStats.averageIncome,
    avgExpenses: summaryStats.averageExpenses,
  }));

  const handleExportPDF = () => {
    alert('Exporting comprehensive ML analysis report as PDF...');
  };

  const handleExportExcel = () => {
    alert('Exporting data tables and statistics as Excel...');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ML Analytics Report</h1>
              <p className="text-gray-600">Comprehensive analysis based on {totalRecipients.toLocaleString()} zakat recipients data from Kedah</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button 
                onClick={handleExportExcel}
                className="px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Excel
              </button>
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <FileText size={18} />
                PDF Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Years (2022-2024)</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600">Data from Kedah State Zakat Board</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Total Recipients</p>
              <p className="text-3xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">2022-2024 period</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Unemployed Rate</p>
              <p className="text-3xl font-bold text-gray-900">{unemployedRate}%</p>
              <p className="text-xs text-red-600 mt-1">{unemployedCount.toLocaleString()} recipients</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Healthy Recipients</p>
              <p className="text-3xl font-bold text-gray-900">{healthyRate}%</p>
              <p className="text-xs text-emerald-600 mt-1">Normal health status</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Best Model Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{modelPerformance[0].accuracy}%</p>
              <p className="text-xs text-gray-500 mt-1">{modelPerformance[0].model}</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Yearly Breakdown */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Yearly Distribution Analysis</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Year</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Recipients</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Avg Income</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Avg Expenses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.year}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{item.recipients.toLocaleString()}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-green-600">RM {item.avgIncome.toFixed(2)}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-red-600">RM {item.avgExpenses.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">Total</td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">{totalRecipients.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-green-600">RM {summaryStats.averageIncome.toFixed(2)}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-red-600">RM {summaryStats.averageExpenses.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Employment Distribution */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Employment Status Distribution</h2>
              <div className="space-y-4">
                {jobTypeDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District and Demographics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* District Distribution */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recipients by District (DAERAH)</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {districtDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.name} ({item.code})</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage * 6}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Demographic Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Average Age</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.averageAge} years</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Female Ratio</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.femalePercentage}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Male Ratio</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.malePercentage}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Income/Expense Ratio</p>
                  <p className="text-2xl font-bold text-red-600">{summaryStats.incomeExpenseRatio}</p>
                </div>
              </div>
              
              {/* Gender Distribution */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Gender Breakdown</h3>
                <div className="space-y-2">
                  {genderDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-pink-500' : 'bg-blue-500'}`}></div>
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900 ml-auto">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Importance & Model Performance */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Feature Importance */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Predictive Features (ML Model)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Feature</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Importance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureImportance.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-sm text-gray-600">{item.rank}</td>
                        <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.feature}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-100 rounded-full h-2">
                              <div 
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${item.importance * 6}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{item.importance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model Performance */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">ML Model Performance Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Model</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Accuracy</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Precision</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Recall</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelPerformance.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.model}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{item.accuracy}%</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{item.precision}%</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{item.recall}%</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            item.status === 'Best' ? 'bg-green-100 text-green-700' :
                            item.status === 'Strong' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'Good' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Health & Marital Status */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Health Status */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Health Status Distribution</h2>
              <div className="space-y-4">
                {healthStatusDistribution.map((item, index) => {
                  const colors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500'];
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className={`${colors[index]} h-2 rounded-full transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Marital Status */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Marital Status Distribution</h2>
              <div className="space-y-4">
                {maritalStatusDistribution.map((item, index) => {
                  const maxCount = Math.max(...maritalStatusDistribution.map(m => m.count));
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${(item.count / maxCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Age Group Distribution</h2>
            <div className="flex items-end justify-around h-64">
              {ageGroupDistribution.map((item, index) => {
                const maxAge = Math.max(...ageGroupDistribution.map(a => a.count));
                const colors = ['bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700'];
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-900 mb-2">{item.count.toLocaleString()}</span>
                    <div 
                      className={`w-16 ${colors[index]} rounded-t transition-all`}
                      style={{ height: `${(item.count / maxAge) * 180}px` }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 mt-2">{item.ageGroup}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Data source: Zakat Data.xlsx | Total Records: {totalRecipients.toLocaleString()} | 
              Period: 2022-2024 | State: Kedah | ML Analysis Report
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
