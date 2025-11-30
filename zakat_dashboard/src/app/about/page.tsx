import Navbar from '@/components/navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-6">
              <span className="text-xs font-semibold text-gray-600">RESEARCH PROJECT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About This Research
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A machine learning approach to predicting poverty escape among zakat recipients, 
              developed by researchers at Universiti Teknologi MARA (UiTM).
            </p>
          </div>

          {/* Research Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Objective</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                This study addresses the challenge of identifying which zakat recipients are likely 
                to escape poverty. Traditional assessment relies on static criteria lacking predictive 
                capability and scalability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By leveraging machine learning on administrative zakat data from 2022-2024, we developed 
                a predictive model to classify poverty escape outcomes and optimize welfare distribution.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Despite long-term assistance, some recipients remain trapped in chronic poverty. 
                Identifying which households require continued intervention versus those likely to 
                escape poverty remains difficult.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Limited research uses predictive analytics to quantify the impact of zakat. Most 
                studies rely on static evaluations rather than dynamic predictions.
              </p>
            </div>
          </div>

          {/* Methodology Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Research Methodology</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A systematic approach to developing and validating our predictive model</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Data Collection</h3>
                </div>
                <p className="text-sm text-gray-600">
                  51,962 zakat recipients from 2022-2024 with 113 features including demographics, 
                  economic indicators, and assistance types.
                </p>
              </div>
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Preprocessing</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Missing value imputation, One-Hot Encoding for categorical features, 
                  StandardScaler for numeric features, and outlier removal.
                </p>
              </div>
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Feature Engineering</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Created dependency ratio, income-expense ratio, year-on-year income change, 
                  and program participation flags.
                </p>
              </div>
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <span className="text-amber-600 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Model Development</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Four supervised learning models: Logistic Regression, SVM (RBF kernel), 
                  Random Forest, and Gradient Boosting Classifier.
                </p>
              </div>
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <span className="text-teal-600 font-bold">5</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Evaluation</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Assessed using accuracy, precision, recall, ROC-AUC, and confusion matrices 
                  with consideration for class imbalance.
                </p>
              </div>
              <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                    <span className="text-rose-600 font-bold">6</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Deployment</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Next.js dashboard for data visualization and real-time predictions embedded into 
                  institutional workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Findings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Model performance and important predictive features</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 text-white mb-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">SELECTED MODEL</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">SVM (RBF Kernel): Best Generalization</h3>
              <p className="text-purple-200 text-sm mb-6">Chosen for robust performance and resistance to overfitting, with excellent generalization on unseen data.</p>
              <div className="grid md:grid-cols-5 gap-6">
                <div>
                  <p className="text-purple-200 text-sm mb-1">Accuracy</p>
                  <p className="text-3xl font-bold">94.73%</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">Precision</p>
                  <p className="text-3xl font-bold">94.31%</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">Recall</p>
                  <p className="text-3xl font-bold">93.29%</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">F1-Score</p>
                  <p className="text-3xl font-bold">93.80%</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">ROC-AUC</p>
                  <p className="text-3xl font-bold">98.96%</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Top Predictors</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Total Income (15.2%)</li>
                  <li>• Income-Expense Ratio (13.9%)</li>
                  <li>• Total Expenses (11.8%)</li>
                  <li>• Total Dependents (10.4%)</li>
                  <li>• Job Type (8.7%)</li>
                  <li>• Age (7.6%)</li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Model Comparison</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <span className="font-semibold text-purple-600">SVM (RBF): 94.73% accuracy (Selected)</span></li>
                  <li>• Neural Network (MLP): 99.06% accuracy</li>
                  <li>• Logistic Regression: 89.04% accuracy</li>
                  <li>• K-Nearest Neighbors: 81.24% accuracy</li>
                  <li>• Gaussian Naive Bayes: 63.87% accuracy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implications */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Policy Implications</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Prioritize High-Risk Households</h3>
                  <p className="text-gray-600">
                    Use the model to identify households with low predicted escape probability and allocate resources accordingly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Optimize Assistance Allocation</h3>
                  <p className="text-gray-600">
                    Target households with low income mobility or high dependency burdens for long-term financial empowerment programs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Monitor Progress Through Analytics</h3>
                  <p className="text-gray-600">
                    Track socioeconomic progress through dashboards and integrate predictive analytics into zakat operations for enhanced targeting efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}