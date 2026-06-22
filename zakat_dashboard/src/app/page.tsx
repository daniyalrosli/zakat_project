'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          
          {/* Hero with Logo */}
          <div className="text-center mb-12">
            {/* Professional Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <svg 
                  width="100" 
                  height="100" 
                  viewBox="0 0 100 100" 
                  className="drop-shadow-lg"
                >
                  <defs>
                    {/* Professional gradient */}
                    <linearGradient id="proGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    {/* Subtle shadow */}
                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7c3aed" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  
                  {/* Hexagon Background - Modern tech feel */}
                  <polygon 
                    points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" 
                    fill="#1a1035"
                    stroke="url(#proGradient)"
                    strokeWidth="2"
                    filter="url(#softShadow)"
                  />
                  
                  {/* Inner hexagon accent */}
                  <polygon 
                    points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" 
                    fill="none"
                    stroke="url(#proGradient)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  
                  {/* Stylized "Z" for Zakat - Clean geometric design */}
                  <path 
                    d="M 32 35 L 68 35 L 68 40 L 42 60 L 68 60 L 68 65 L 32 65 L 32 60 L 58 40 L 32 40 Z" 
                    fill="url(#proGradient)"
                  />
                  
                  {/* Rising bars - Growth/Analytics symbolism */}
                  <rect x="35" y="70" width="6" height="8" rx="1" fill="#06b6d4" opacity="0.8"/>
                  <rect x="44" y="67" width="6" height="11" rx="1" fill="#8b5cf6" opacity="0.8"/>
                  <rect x="53" y="64" width="6" height="14" rx="1" fill="url(#accentGradient)"/>
                  
                  {/* Connection dots - P2P Network */}
                  <circle cx="26" cy="50" r="3" fill="#06b6d4"/>
                  <circle cx="74" cy="50" r="3" fill="#ec4899"/>
                  
                  {/* Subtle connecting arc */}
                  <path 
                    d="M 29 50 Q 50 38 71 50" 
                    fill="none" 
                    stroke="url(#proGradient)" 
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                </svg>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-cyan-500/0 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              P2P <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Zakat</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-pink-300">{t('home.stats.accuracy')}</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-pink-500 rounded-full"></div>)}
                </div>
              </div>
              <p className="text-3xl font-bold text-white">94.73%</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-cyan-300">{t('common.recipients')}</p>
                <span className="text-cyan-400">👥</span>
              </div>
              <p className="text-3xl font-bold text-white">51,962</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-purple-300">{t('home.stats.districts')}</p>
                <span className="text-purple-400">📍</span>
              </div>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-yellow-300">ROC-AUC</p>
                <span className="text-yellow-400">📊</span>
              </div>
              <p className="text-3xl font-bold text-white">98.96%</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/forecast" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 transition-all hover:shadow-lg hover:shadow-pink-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                <span className="text-xl">🔮</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('forecast.title')} {t('forecast.title2')}</h3>
              <p className="text-sm text-gray-400">{t('home.features.forecast.desc')}</p>
            </Link>

            <Link href="/statistics" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('stats.district.title')}</h3>
              <p className="text-sm text-gray-400">{t('home.features.statistics.desc')}</p>
            </Link>

            <Link href="/report" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-yellow-500/40 transition-all hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/30">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('report.title')} {t('report.title2')}</h3>
              <p className="text-sm text-gray-400">{t('home.features.report.desc')}</p>
            </Link>
          </div>

          {/* Bottom Card */}
          <div className="bg-gradient-to-r from-[#1e1445]/80 to-[#0d1a2d]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t('home.incomeVsExpense')}</h3>
                <p className="text-sm text-gray-400">{t('home.incomeVsExpense.desc')}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">RM 763</p>
                  <p className="text-xs text-gray-500">{t('home.income')}</p>
                </div>
                <div className="text-2xl text-gray-600">→</div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">RM 942</p>
                  <p className="text-xs text-gray-500">{t('home.expenses')}</p>
                </div>
                <div className="text-center px-4 py-2 bg-red-500/20 rounded-xl border border-red-500/30">
                  <p className="text-lg font-bold text-red-400">-RM 179</p>
                  <p className="text-[10px] text-red-300">{t('home.gap')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}