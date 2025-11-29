import Navbar from '@/components/navbar';

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
                <div className="inline-block px-4 py-1.5 bg-gray-50 rounded-full mb-6">
                  <span className="text-sm font-medium text-gray-700">ML-Powered Zakat Analytics</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Predicting Poverty Escape
                <br />
                Among Zakat Recipients
              </h1>

              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                A machine learning-based platform using Gradient Boosting to predict poverty escape outcomes, 
                optimize welfare distribution, and support data-driven decision-making for zakat institutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  View Dashboard
                </button>
                <button className="px-8 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
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
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">9,923 Recipients</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comprehensive analysis of zakat recipients from 2022-2024 with ~40 demographic and economic features.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Real-time forecasting and feature importance analysis to optimize welfare distribution strategies.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}