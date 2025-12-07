import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-16">
            
            {/* Hero */}
            <div className="text-center max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                ML-Powered Zakat Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Predicting Poverty Escape<br />Among Zakat Recipients
              </h1>

              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Analyzing <span className="font-semibold text-gray-900">51,962</span> recipients across 
                <span className="font-semibold text-gray-900"> 12 districts</span> in Kedah using SVM to predict 
                poverty escape with <span className="font-semibold text-emerald-600">94.73% accuracy</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/forecast" className="px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
                  Try Predictor
                </Link>
                <Link href="/overview" className="px-8 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                  View Dashboard
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-3xl font-bold text-gray-900">51,962</p>
                <p className="text-sm text-gray-500 mt-1">Recipients</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500 mt-1">Districts</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-3xl font-bold text-emerald-600">94.7%</p>
                <p className="text-sm text-gray-500 mt-1">Accuracy</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-3xl font-bold text-gray-900">113</p>
                <p className="text-sm text-gray-500 mt-1">Features</p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
              <Link href="/forecast" className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">SVM Predictor</h3>
                <p className="text-sm text-gray-600">98.96% ROC-AUC for poverty escape prediction.</p>
              </Link>

              <Link href="/statistics" className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">District Analytics</h3>
                <p className="text-sm text-gray-600">Detailed breakdown across 12 Kedah districts.</p>
              </Link>

              <Link href="/report" className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ML Report</h3>
                <p className="text-sm text-gray-600">Complete model performance analysis.</p>
              </Link>
            </div>

            {/* Key Insight */}
            <div className="mt-12 w-full max-w-4xl p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">RM 763</p>
                  <p className="text-xs text-gray-400 mt-1">Avg. Income</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">RM 1,058</p>
                  <p className="text-xs text-gray-400 mt-1">Avg. Expenses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">-RM 295</p>
                  <p className="text-xs text-gray-400 mt-1">Monthly Gap</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">59.6%</p>
                  <p className="text-xs text-gray-400 mt-1">Unemployed</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
