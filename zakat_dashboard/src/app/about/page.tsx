import Navbar from '@/components/navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          
          {/* Header */}
          <div className="mb-12">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Research Project</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              About This Research
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A machine learning approach to predicting poverty escape among zakat recipients in Kedah, Malaysia.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Objective</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Identify which zakat recipients are likely to escape poverty using machine learning on 2022-2024 administrative data.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Despite assistance, some recipients remain in chronic poverty. Traditional static criteria lack predictive capability.
              </p>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Methodology</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'Data Collection', desc: '51,962 recipients with 113 features' },
                { step: '2', title: 'Preprocessing', desc: 'Missing value imputation, encoding, scaling' },
                { step: '3', title: 'Feature Engineering', desc: 'Ratios, flags, derived metrics' },
                { step: '4', title: 'Model Training', desc: 'SVM, Random Forest, Gradient Boosting' },
                { step: '5', title: 'Evaluation', desc: 'Accuracy, precision, recall, ROC-AUC' },
                { step: '6', title: 'Deployment', desc: 'Next.js dashboard for predictions' },
              ].map((item) => (
                <div key={item.step} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">{item.step}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Model Performance */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Model Performance</h2>
            <div className="bg-purple-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">BEST MODEL</span>
                <span className="text-lg font-bold text-gray-900">SVM (RBF Kernel)</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">94.73%</p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">94.31%</p>
                  <p className="text-xs text-gray-500">Precision</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">93.29%</p>
                  <p className="text-xs text-gray-500">Recall</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">98.96%</p>
                  <p className="text-xs text-gray-500">ROC-AUC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Predictive Features</h2>
            <div className="space-y-3">
              {[
                { name: 'Total Income (JumlahPendapatan)', importance: 15.2 },
                { name: 'Income-Expense Ratio', importance: 13.9 },
                { name: 'Total Expenses (jumlahBelanja)', importance: 11.8 },
                { name: 'Total Dependents', importance: 10.4 },
                { name: 'Job Type (jenisPekerjaan)', importance: 8.7 },
                { name: 'Age (Umur)', importance: 7.6 },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-6 text-xs font-bold text-gray-400">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                      <span className="text-sm font-bold text-purple-600">{feature.importance}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${feature.importance * 5}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Info */}
          <div className="p-6 bg-gray-900 rounded-2xl text-white">
            <h2 className="text-lg font-bold mb-4">Dataset Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">51,962</p>
                <p className="text-xs text-gray-400">Recipients</p>
              </div>
              <div>
                <p className="text-2xl font-bold">113</p>
                <p className="text-xs text-gray-400">Features</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-400">Districts</p>
              </div>
              <div>
                <p className="text-2xl font-bold">2022-24</p>
                <p className="text-xs text-gray-400">Period</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
