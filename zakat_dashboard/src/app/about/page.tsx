import Navbar from '@/components/navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">About This Research</h1>
            <p className="text-gray-400">Machine Learning for Zakat Poverty Escape Prediction</p>
          </div>

          {/* Research Overview */}
          <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></span>
              Research Overview
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              This project develops a machine learning-based predictive model to assess the probability 
              of zakat recipients escaping poverty. Using data from <strong className="text-white">51,962 asnaf</strong> (zakat recipients) 
              in Kedah, Malaysia collected between 2022-2024, we analyze <strong className="text-white">113 socioeconomic features</strong> to 
              predict escape potential within a 3-year horizon.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              The model helps zakat institutions optimize resource allocation and develop targeted 
              intervention strategies for different recipient profiles.
            </p>
          </div>

          {/* Model Performance Comparison */}
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></span>
              Model Performance Comparison
            </h2>
            
            {/* All Models Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Model</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-medium">Accuracy</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-medium">Precision</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-medium">Recall</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-medium">F1-Score</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-medium">ROC-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/20 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                    <td className="py-3 px-2 font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      SVM (RBF) ✓
                    </td>
                    <td className="text-center py-3 px-2 text-emerald-400 font-bold">94.73%</td>
                    <td className="text-center py-3 px-2 text-white">94.80%</td>
                    <td className="text-center py-3 px-2 text-white">94.73%</td>
                    <td className="text-center py-3 px-2 text-white">94.70%</td>
                    <td className="text-center py-3 px-2 text-cyan-400 font-bold">98.96%</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="py-3 px-2 text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Logistic Regression
                    </td>
                    <td className="text-center py-3 px-2 text-white">91.25%</td>
                    <td className="text-center py-3 px-2 text-gray-400">91.30%</td>
                    <td className="text-center py-3 px-2 text-gray-400">91.25%</td>
                    <td className="text-center py-3 px-2 text-gray-400">91.20%</td>
                    <td className="text-center py-3 px-2 text-white">96.42%</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="py-3 px-2 text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Random Forest
                    </td>
                    <td className="text-center py-3 px-2 text-white">93.87%</td>
                    <td className="text-center py-3 px-2 text-gray-400">93.90%</td>
                    <td className="text-center py-3 px-2 text-gray-400">93.87%</td>
                    <td className="text-center py-3 px-2 text-gray-400">93.85%</td>
                    <td className="text-center py-3 px-2 text-white">98.21%</td>
                  </tr>
                  <tr className="border-b border-purple-500/20">
                    <td className="py-3 px-2 text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Gradient Boosting
                    </td>
                    <td className="text-center py-3 px-2 text-white">94.12%</td>
                    <td className="text-center py-3 px-2 text-gray-400">94.15%</td>
                    <td className="text-center py-3 px-2 text-gray-400">94.12%</td>
                    <td className="text-center py-3 px-2 text-gray-400">94.10%</td>
                    <td className="text-center py-3 px-2 text-white">98.45%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SVM Highlight */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-pink-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-1">94.73%</div>
                <p className="text-sm text-gray-300">Best Accuracy</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-cyan-500/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">98.96%</div>
                <p className="text-sm text-gray-300">Highest ROC-AUC</p>
              </div>
            </div>

            {/* Why SVM */}
            <div className="p-5 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why SVM was Chosen
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span><strong className="text-white">Highest ROC-AUC (98.96%)</strong> — Superior ability to distinguish between recipients who can escape poverty vs. those who cannot, crucial for resource allocation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong className="text-white">Best Overall Accuracy (94.73%)</strong> — Outperforms all other models in correctly classifying recipient outcomes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span><strong className="text-white">Handles High-Dimensional Data</strong> — Effectively processes 113 features using RBF kernel to capture complex non-linear relationships.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span><strong className="text-white">Robust to Overfitting</strong> — Margin-based optimization provides better generalization on unseen data compared to tree-based models.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></span>
              Key Features Analyzed
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Demographics', desc: 'Age, gender, marital status, dependents', color: 'from-pink-500 to-purple-500' },
                { title: 'Financial Status', desc: 'Income, expenses, savings, debts', color: 'from-cyan-500 to-blue-500' },
                { title: 'Employment', desc: 'Job type, occupation sector, skills', color: 'from-emerald-500 to-teal-500' },
                { title: 'Health', desc: 'Health status, disabilities, chronic illness', color: 'from-yellow-500 to-orange-500' },
                { title: 'Assets', desc: 'Property, vehicles, appliances owned', color: 'from-purple-500 to-pink-500' },
                { title: 'Geographic', desc: 'District, urban/rural location', color: 'from-blue-500 to-cyan-500' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                  <div className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>{item.title}</div>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
              Methodology
            </h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Data Collection', desc: 'Gathered data from LZNK on 51,962 recipients across 12 districts in Kedah.' },
                { step: '2', title: 'Feature Engineering', desc: 'Processed 113 features including income ratios, expense patterns, and risk indicators.' },
                { step: '3', title: 'Model Training', desc: 'Compared Logistic Regression, Random Forest, SVM, and Gradient Boosting models.' },
                { step: '4', title: 'Validation', desc: 'Used stratified k-fold cross-validation to ensure robust performance estimates.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg shadow-purple-500/30">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 text-center">
            <p className="text-xs text-gray-400 mb-2">Data Source</p>
            <p className="text-sm font-semibold text-white">Lembaga Zakat Negeri Kedah (LZNK)</p>
            <p className="text-xs text-gray-500 mt-1">Zakat recipient records from 2022-2024</p>
          </div>

        </div>
      </main>
    </div>
  );
}
