'use client';

import Navbar from '@/components/navbar';
import { 
  yearlyBreakdown, 
  summaryStats, 
  healthStatusDistribution,
  maritalStatusDistribution,
  jobTypeDistribution,
  expenseCategories,
  incomeStatistics,
  assetOwnership,
  houseTypeDistribution
} from '@/data/zakatData';

export default function Report() {
  const totalRecipients = summaryStats.totalRecipients;
  const incomeGap = summaryStats.averageExpenses - summaryStats.averageIncome;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Zakat Recipients Report</h1>
            <p className="text-sm text-gray-500 mt-1">Comprehensive analysis of {totalRecipients.toLocaleString()} asnaf in Kedah (2022-2024)</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Total Recipients</p>
              <p className="text-2xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Average Income</p>
              <p className="text-2xl font-bold text-emerald-600">RM {summaryStats.averageIncome.toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Average Expenses</p>
              <p className="text-2xl font-bold text-red-600">RM {summaryStats.averageExpenses.toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Income Gap</p>
              <p className="text-2xl font-bold text-amber-600">-RM {incomeGap.toFixed(0)}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Health Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Health Status</h3>
              <p className="text-xs text-gray-500 mb-6">Recipients by health condition</p>
              <div className="space-y-3">
                {healthStatusDistribution.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.count.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-amber-500' : 'bg-red-400'}`}
                        style={{ width: `${item.percentage * 1.75}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marital Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Marital Status</h3>
              <p className="text-xs text-gray-500 mb-6">Distribution by family status</p>
              <div className="space-y-3">
                {maritalStatusDistribution.slice(0, 5).map((item, i) => {
                  const percentage = (item.count / totalRecipients) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.count.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-purple-500"
                          style={{ width: `${percentage * 2}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Employment Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Employment Status</h3>
              <div className="space-y-3">
                {jobTypeDistribution.map((job, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      <span className="text-xs text-gray-600">{job.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">{job.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
              <div className="space-y-3">
                {expenseCategories.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">{exp.label}</span>
                      <span className="text-xs font-semibold text-gray-900">RM {exp.average}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                        style={{ width: `${(exp.average / 350) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Housing */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-semibold mb-4">Housing Type</h3>
              <div className="space-y-4">
                {houseTypeDistribution.map((house, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-400">{house.label}</span>
                      <span className="text-sm font-bold">{house.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-amber-400' : 'bg-blue-400'}`}
                        style={{ width: `${house.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[10px] text-gray-400">Based on house structure type (Batu/Kayu)</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Yearly Recipients */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Recipients by Year</h3>
              <p className="text-xs text-gray-500 mb-6">Annual distribution (2022-2024)</p>
              <div className="space-y-4">
                {yearlyBreakdown.map((year, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{year.year}</span>
                      <span className="text-sm font-bold text-blue-600">{year.recipients.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                        style={{ width: `${(year.recipients / 18000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                <span>Total: {totalRecipients.toLocaleString()}</span>
                <span>Avg/Year: {Math.round(totalRecipients / 3).toLocaleString()}</span>
              </div>
            </div>

            {/* Asset Ownership */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Asset Ownership</h3>
              <p className="text-xs text-gray-500 mb-6">Household items owned by recipients</p>
              <div className="grid grid-cols-2 gap-3">
                {assetOwnership.slice(0, 8).map((asset, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{asset.label || asset.asset}</span>
                      <span className="text-xs font-bold text-gray-900">{asset.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Findings</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs flex-shrink-0">1</div>
                <p className="text-xs text-gray-600">59.6% of recipients are unemployed, indicating a critical need for job placement and skills training programs.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs flex-shrink-0">2</div>
                <p className="text-xs text-gray-600">Average expenses exceed income by RM {incomeGap.toFixed(0)}/month, highlighting the financial vulnerability of recipients.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs flex-shrink-0">3</div>
                <p className="text-xs text-gray-600">43% of recipients have health issues (sick, disabled, or both), requiring integrated healthcare support.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
