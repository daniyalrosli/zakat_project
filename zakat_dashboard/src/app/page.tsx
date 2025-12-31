import Link from 'next/link';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              P2P <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Zakat</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Poverty Escape Prediction System for Kedah, Malaysia
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-pink-300">Accuracy</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-pink-500 rounded-full"></div>)}
                </div>
              </div>
              <p className="text-2xl font-bold text-white">94.73%</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-cyan-300">Recipients</p>
                <span className="text-cyan-400">👥</span>
              </div>
              <p className="text-2xl font-bold text-white">51,962</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-purple-300">Districts</p>
                <span className="text-purple-400">📍</span>
              </div>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-yellow-300">ROC-AUC</p>
                <span className="text-yellow-400">📊</span>
              </div>
              <p className="text-2xl font-bold text-white">98.96%</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/forecast" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 transition-all hover:shadow-lg hover:shadow-pink-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                <span className="text-xl">🔮</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Poverty Predictor</h3>
              <p className="text-sm text-gray-400">SVM-powered prediction with interactive inputs</p>
            </Link>

            <Link href="/statistics" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">District Statistics</h3>
              <p className="text-sm text-gray-400">Explore data across 12 districts in Kedah</p>
            </Link>

            <Link href="/report" className="group bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-yellow-500/40 transition-all hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/30">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Recipients Report</h3>
              <p className="text-sm text-gray-400">Comprehensive analysis of zakat asnaf</p>
            </Link>
          </div>

          {/* Bottom Card */}
          <div className="bg-gradient-to-r from-[#1e1445]/80 to-[#0d1a2d]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Income vs Expenses Gap</h3>
                <p className="text-sm text-gray-400">Average monthly financial situation of recipients</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">RM 763</p>
                  <p className="text-xs text-gray-500">Income</p>
                </div>
                <div className="text-2xl text-gray-600">→</div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">RM 942</p>
                  <p className="text-xs text-gray-500">Expenses</p>
                </div>
                <div className="text-center px-4 py-2 bg-red-500/20 rounded-xl border border-red-500/30">
                  <p className="text-lg font-bold text-red-400">-RM 179</p>
                  <p className="text-[10px] text-red-300">Gap</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
