'use client';

import Navbar from '@/components/navbar';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  districtDistribution,
  jobTypeDistribution,
  yearlyBreakdown,
  summaryStats,
  monthlyDistribution,
} from '@/data/zakatData';
import type { DistrictInfo } from '@/components/KedahMap';
import { useLanguage } from '@/context/LanguageContext';

// Dynamic import for the map to avoid SSR issues
const KedahMap = dynamic(() => import('@/components/KedahMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#12082a] rounded-xl flex items-center justify-center">
      <div className="text-gray-400 text-sm flex items-center gap-2">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading map...
      </div>
    </div>
  ),
});

export default function Overview() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<'2022' | '2023' | '2024'>('2024');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">{t('overview.title')} {t('overview.title2')}</h1>
              <p className="text-base text-gray-400 mt-2">{summaryStats.totalRecipients.toLocaleString()} {t('common.recipients').toLowerCase()} - {summaryStats.totalDistricts} {t('home.stats.districts').toLowerCase()}</p>
            </div>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as '2022' | '2023' | '2024')}
              className="mt-4 sm:mt-0 px-4 py-2 bg-[#1e1445]/80 border border-purple-500/30 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/20">
              <p className="text-sm text-pink-300 mb-1">{t('overview.recipients')} ({selectedYear})</p>
              <p className="text-3xl font-bold text-white">{yearData.recipients.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-5 border border-emerald-500/20">
              <p className="text-sm text-emerald-300 mb-1">{t('overview.avgIncome')}</p>
              <p className="text-3xl font-bold text-emerald-400">RM {summaryStats.averageIncome.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-2xl p-5 border border-red-500/20">
              <p className="text-sm text-red-300 mb-1">{t('overview.avgExpense')}</p>
              <p className="text-3xl font-bold text-red-400">RM {summaryStats.averageExpenses.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <p className="text-sm text-purple-300 mb-1">{t('overview.unemployedRate')}</p>
              <p className="text-3xl font-bold text-white">{summaryStats.unemployedPercentage}%</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Chart */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-white">{t('overview.monthlyRecipients')} ({selectedYear})</h3>
                <span className="text-sm font-bold text-cyan-400">{monthlyData.reduce((sum, d) => sum + d.count, 0).toLocaleString()} {t('common.total2')}</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{t('overview.hoverDetails')}</p>
              <div className="flex items-end justify-between gap-2" style={{ height: '160px' }}>
                {monthlyData.map((data, index) => {
                  const barHeight = (data.count / maxMonthlyCount) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group relative h-full">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {data.month}: {data.count.toLocaleString()}
                      </div>
                      <div className="w-full flex-1 flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-pink-500 to-cyan-400 rounded-t transition-all group-hover:from-pink-400 group-hover:to-cyan-300 cursor-pointer"
                          style={{ height: `${barHeight}%`, minHeight: '4px' }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-2 group-hover:text-white transition-all">{data.month.slice(0, 3)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive District Map */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-white">{t('overview.districtMap')}</h3>
                <span className="text-sm text-gray-400">{t('overview.clickDistrict')}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{t('overview.interactiveMap')}</p>
              
              <div className="flex gap-4">
                {/* Real Map */}
                <div className="relative w-2/3 h-72 rounded-xl overflow-hidden">
                  <KedahMap 
                    onDistrictSelect={setSelectedDistrict}
                    selectedDistrict={selectedDistrict}
                  />
                </div>
                
                {/* Info Panel */}
                <div className="w-1/3 flex flex-col">
                  {selectedDistrict ? (
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white">{selectedDistrict.name}</h4>
                        <button 
                          onClick={() => setSelectedDistrict(null)}
                          className="text-gray-500 hover:text-white text-xs"
                        >✕</button>
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <div className="bg-white/5 rounded-lg p-2">
                          <p className="text-[10px] text-gray-400">{t('common.recipients')}</p>
                          <p className="text-lg font-bold text-cyan-400">{selectedDistrict.count.toLocaleString()}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-[10px] text-gray-400">{t('overview.avgIncome2')}</p>
                            <p className="text-sm font-bold text-emerald-400">RM {selectedDistrict.avgIncome}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-[10px] text-gray-400">{t('overview.avgExpense2')}</p>
                            <p className="text-sm font-bold text-red-400">RM {selectedDistrict.avgExpense}</p>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <p className="text-[10px] text-gray-400">{t('overview.unemployedRate')}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-purple-900/30 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full"
                                style={{ width: `${selectedDistrict.unemployed}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-yellow-400">{selectedDistrict.unemployed}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-purple-500/20">
                        <p className="text-[9px] text-gray-500">
                          {t('overview.gap')}: <span className="text-red-400 font-medium">-RM {selectedDistrict.avgExpense - selectedDistrict.avgIncome}</span>/{t('overview.month')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                        <span className="text-lg">📍</span>
                      </div>
                      <p className="text-xs text-gray-400">{t('overview.clickDistrict')}</p>
                      <p className="text-[10px] text-gray-500">{t('overview.viewDetails')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-purple-500/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-[10px] text-gray-400">&lt;55% {t('overview.employment').toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-[10px] text-gray-400">55-60%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-[10px] text-gray-400">60-65%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-[10px] text-gray-400">&gt;65%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Top Districts List */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-1">{t('stats.topDistrict')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('common.recipients')} {t('common.district').toLowerCase()}</p>
              <div className="space-y-3">
                {topDistricts.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{item.name}</span>
                      <span className="text-sm font-semibold text-white">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.count / maxDistrictCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Gender */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-4">{t('stats.demographicInsights')}</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(100,80,180,0.3)" strokeWidth="16" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="url(#pinkGradient)" strokeWidth="16"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - summaryStats.femalePercentage / 100)}`}
                    />
                    <defs>
                      <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white">{summaryStats.femalePercentage}%</span>
                    <span className="text-[10px] text-gray-400">{t('stats.female')}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">{t('stats.female')} {summaryStats.femalePercentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-900/50 rounded-full"></div>
                  <span className="text-sm text-gray-400">{t('stats.male')} {100 - summaryStats.femalePercentage}%</span>
                </div>
              </div>
            </div>

            {/* Employment */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-4">{t('overview.employment')}</h3>
              <div className="space-y-3">
                {jobTypeDistribution.slice(0, 4).map((job, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">{job.type}</span>
                      <span className="text-sm font-semibold text-white">{job.percentage}%</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${job.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-base font-semibold text-white mb-4">{t('overview.quickstats')}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{t('stats.healthy')} {t('common.recipients')}</span>
                  <span className="text-base font-bold text-emerald-400">{summaryStats.healthyPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{t('stats.married')}</span>
                  <span className="text-base font-bold text-pink-400">{summaryStats.marriedPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{t('stats.averageAge')}</span>
                  <span className="text-base font-bold text-cyan-400">{summaryStats.averageAge} {t('common.years')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{t('overview.gap')}</span>
                  <span className="text-base font-bold text-red-400">-RM {(summaryStats.averageExpenses - summaryStats.averageIncome).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
