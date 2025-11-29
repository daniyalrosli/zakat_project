import Navbar from '@/components/navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About This Research
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A machine learning approach to predicting poverty escape among zakat recipients, 
              developed by researchers at Universiti Teknologi MARA.
            </p>
          </div>

          {/* Research Overview */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Objective</h2>
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
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Challenge</h2>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Research Methodology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Data Collection</h3>
                <p className="text-sm text-gray-600">
                  9,923 zakat recipients from 2022-2024 with ~40 features including demographics, 
                  economic indicators, and assistance types.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Preprocessing</h3>
                <p className="text-sm text-gray-600">
                  Missing value imputation, One-Hot Encoding for categorical features, 
                  StandardScaler for numeric features, and outlier removal.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Feature Engineering</h3>
                <p className="text-sm text-gray-600">
                  Created dependency ratio, total zakat assistance, year-on-year income change, 
                  and program participation flags.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Model Development</h3>
                <p className="text-sm text-gray-600">
                  Four supervised learning models: Logistic Regression, SVM (RBF kernel), 
                  Random Forest, and Gradient Boosting Classifier.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Evaluation</h3>
                <p className="text-sm text-gray-600">
                  Assessed using accuracy, precision, recall, ROC-AUC, and confusion matrices 
                  with consideration for class imbalance.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Deployment</h3>
                <p className="text-sm text-gray-600">
                  Streamlit-based dashboard for real-time predictions embedded into 
                  institutional workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Key Findings</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-6">
              <h3 className="text-xl font-semibold mb-4">Gradient Boosting: Best Performance</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Accuracy</p>
                  <p className="text-3xl font-bold">90.8%</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-1">Precision</p>
                  <p className="text-3xl font-bold">80.6%</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-1">Recall</p>
                  <p className="text-3xl font-bold">100%</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-1">ROC-AUC</p>
                  <p className="text-3xl font-bold">94.1%</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Top Predictors</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Total Income (15.2%)</li>
                  <li>• Income Growth Year-on-Year (13.9%)</li>
                  <li>• Amount of Zakat Assistance (11.8%)</li>
                  <li>• Dependency Ratio (10.4%)</li>
                  <li>• Employment Category (8.7%)</li>
                  <li>• Household Size (7.6%)</li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Model Comparison</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Gradient Boosting: 90.8% accuracy (Best)</li>
                  <li>• Random Forest: 87.5% accuracy</li>
                  <li>• SVM (RBF): 85.6% accuracy</li>
                  <li>• Logistic Regression: 78.3% accuracy</li>
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