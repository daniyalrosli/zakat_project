import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl">
              <div className="mb-8">
                <div className="inline-block px-4 py-1.5 bg-emerald-50 rounded-full mb-6">
                  <span className="text-sm font-medium text-emerald-700">ML-Powered Zakat Analytics • Kedah, Malaysia</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Predicting Poverty Escape
                <br />
                Among Zakat Recipients
              </h1>

              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Analyzing <span className="font-semibold text-gray-900">51,962</span> zakat recipients across 
                <span className="font-semibold text-gray-900"> 12 districts</span> in Kedah using Gradient Boosting 
                to predict poverty escape outcomes and optimize welfare distribution.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/overview" className="px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  View Dashboard
                </Link>
                <Link href="/about" className="px-8 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-4xl">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">51,962</p>
                <p className="text-sm text-gray-600 mt-1">Total Recipients</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600 mt-1">Districts Covered</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">RM 763</p>
                <p className="text-sm text-gray-600 mt-1">Avg. Monthly Income</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">2022-24</p>
                <p className="text-sm text-gray-600 mt-1">Data Coverage</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">90.8% Accuracy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gradient Boosting model with perfect recall (100%) and ROC-AUC of 94.1% for poverty escape prediction.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">59.6% Unemployed</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Majority of recipients are unemployed, with 30% self-employed. Focus on income-generating programs needed.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">113 Features</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comprehensive dataset with demographic, economic, health, and asset data for accurate predictions.
                </p>
              </div>
            </div>

            {/* Demographics Preview */}
            <div className="mt-20 w-full max-w-5xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recipient Demographics at a Glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">Gender Split</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">52% Female</p>
                  <p className="text-sm text-gray-500">48% Male recipients</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-gray-700">Health Status</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">57% Healthy</p>
                  <p className="text-sm text-gray-500">33.6% with illness</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-medium text-gray-700">Average Age</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">58 Years</p>
                  <p className="text-sm text-gray-500">67% above 50 years</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-gray-700">Top District</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Kuala Muda</p>
                  <p className="text-sm text-gray-500">15.9% of recipients</p>
                </div>
              </div>
            </div>

            {/* Income vs Expenses Insight */}
            <div className="mt-16 w-full max-w-3xl bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Critical Insight: Income-Expense Gap</h3>
                <p className="text-gray-600 mb-6">
                  Average monthly income is <span className="font-semibold text-red-600">RM 763</span> while 
                  expenses average <span className="font-semibold text-red-600">RM 942</span> — a 
                  <span className="font-bold text-red-600"> 19% deficit</span> highlighting chronic poverty conditions.
                </p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600">RM 763</p>
                    <p className="text-sm text-gray-500">Avg. Income</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-400">vs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">RM 942</p>
                    <p className="text-sm text-gray-500">Avg. Expenses</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}