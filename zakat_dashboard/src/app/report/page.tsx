'use client';

import Navbar from '@/components/navbar';
import { 
  yearlyBreakdown, 
  summaryStats, 
  healthStatusDistribution,
  maritalStatusDistribution,
  jobTypeDistribution,
  expenseCategories,
  assetOwnership,
  houseTypeDistribution
} from '@/data/zakatData';
import { useLanguage } from '@/context/LanguageContext';

export default function Report() {
  const { t } = useLanguage();
  const totalRecipients = summaryStats.totalRecipients;
  const incomeGap = summaryStats.averageExpenses - summaryStats.averageIncome;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">{t('report.title')} {t('report.title2')}</h1>
            <p className="text-base text-gray-400 mt-2">{t('report.subtitle')}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <p className="text-sm text-purple-300 mb-1">{t('common.total')} {t('common.recipients')}</p>
              <p className="text-3xl font-bold text-white">{totalRecipients.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-5 border border-emerald-500/20">
              <p className="text-sm text-emerald-300 mb-1">{t('overview.avgIncome')}</p>
              <p className="text-3xl font-bold text-emerald-400">RM {summaryStats.averageIncome.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-2xl p-5 border border-red-500/20">
              <p className="text-sm text-red-300 mb-1">{t('overview.avgExpense')}</p>
              <p className="text-3xl font-bold text-red-400">RM {summaryStats.averageExpenses.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20">
              <p className="text-sm text-yellow-300 mb-1">{t('overview.monthlyGap')}</p>
              <p className="text-3xl font-bold text-yellow-400">-RM {incomeGap.toFixed(0)}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Health Status */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-1">{t('report.healthStatus')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('report.recipientsByHealth')}</p>
              <div className="space-y-3">
                {healthStatusDistribution.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{item.label}</span>
                      <span className="text-sm text-gray-400">{item.count.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-yellow-500' : 'bg-red-400'}`}
                        style={{ width: `${item.percentage * 1.75}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marital Status */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-1">{t('report.maritalStatus')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('report.distributionByFamily')}</p>
              <div className="space-y-3">
                {maritalStatusDistribution.slice(0, 5).map((item, i) => {
                  const percentage = (item.count / totalRecipients) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-300">{item.label}</span>
                        <span className="text-sm text-gray-400">{item.count.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
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
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-4">{t('report.employmentStatus')}</h3>
              <div className="space-y-3">
                {jobTypeDistribution.map((job, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-emerald-500' : 'bg-cyan-500'}`}></div>
                      <span className="text-sm text-gray-300">{job.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{job.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-4">{t('report.monthlyExpenses')}</h3>
              <div className="space-y-3">
                {expenseCategories.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{exp.label}</span>
                      <span className="text-sm font-semibold text-white">RM {exp.average}</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${(exp.average / 350) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Housing */}
            <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-base font-semibold text-white mb-4">{t('report.housingType')}</h3>
              <div className="space-y-4">
                {houseTypeDistribution.map((house, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">{house.label}</span>
                      <span className="text-base font-bold text-white">{house.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-yellow-400' : 'bg-cyan-400'}`}
                        style={{ width: `${house.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">{t('report.basedOnHouse')}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Yearly Recipients */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-1">{t('report.recipientsByYear')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('report.annualDistribution')}</p>
              <div className="space-y-4">
                {yearlyBreakdown.map((year, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-base font-semibold text-white">{year.year}</span>
                      <span className="text-base font-bold text-cyan-400">{year.recipients.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400"
                        style={{ width: `${(year.recipients / 18000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20 flex justify-between text-sm text-gray-400">
                <span>{t('common.total')}: {totalRecipients.toLocaleString()}</span>
                <span>{t('report.avgYear')}: {Math.round(totalRecipients / 3).toLocaleString()}</span>
              </div>
            </div>

            {/* Asset Ownership */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-1">{t('report.assetOwnership')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('report.householdItems')}</p>
              <div className="grid grid-cols-2 gap-3">
                {assetOwnership.slice(0, 8).map((asset, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-purple-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{asset.label || asset.asset}</span>
                      <span className="text-sm font-bold text-white">{asset.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-base font-semibold text-white mb-4">{t('report.findings.title')}</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-lg shadow-pink-500/30">1</div>
                <p className="text-sm text-gray-300">59.6% of recipients are unemployed, indicating a critical need for job placement and skills training programs.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-lg shadow-cyan-500/30">2</div>
                <p className="text-sm text-gray-300">Average expenses exceed income by RM {incomeGap.toFixed(0)}/month, highlighting the financial vulnerability of recipients.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-lg shadow-yellow-500/30">3</div>
                <p className="text-sm text-gray-300">43% of recipients have health issues (sick, disabled, or both), requiring integrated healthcare support.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
