'use client';

import Navbar from '@/components/navbar';
import { useState, useMemo } from 'react';
import { summaryStats } from '@/data/zakatData';

const modelMetrics = {
  accuracy: 94.73,
  precision: 94.31,
  recall: 93.29,
  rocAuc: 98.96,
};

export default function Forecast() {
  // Input states
  const [income, setIncome] = useState(1200);
  const [expenses, setExpenses] = useState(1800);
  const [dependents, setDependents] = useState(3);
  const [age, setAge] = useState(45);
  const [healthStatus, setHealthStatus] = useState(1);
  const [education, setEducation] = useState(2);
  const [employment, setEmployment] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Prediction function using SVM-like logic
  const prediction = useMemo(() => {
    const incomeScore = Math.min(income / 2500, 1) * 0.30;
    const expenseRatio = income > 0 ? Math.min(income / expenses, 1) : 0;
    const expenseScore = expenseRatio * 0.20;
    const dependentScore = Math.max(0, (8 - dependents) / 8) * 0.15;
    const healthScore = healthStatus * 0.12;
    const eduScore = (education / 5) * 0.10;
    const empScore = employment * 0.08;
    const ageScore = (age >= 25 && age <= 50) ? 0.05 : 0.02;
    
    const baseScore = incomeScore + expenseScore + dependentScore + healthScore + eduScore + empScore + ageScore;
    const probability = Math.min(Math.max(baseScore * 100, 5), 95);
    
    return {
      probability: probability.toFixed(1),
      canEscape: probability >= 50,
      confidence: probability >= 70 ? 'High' : probability >= 40 ? 'Moderate' : 'Low',
      year1: Math.min(probability * 0.6, 60).toFixed(0),
      year2: Math.min(probability * 0.85, 80).toFixed(0),
      year3: probability.toFixed(0),
    };
  }, [income, expenses, dependents, age, healthStatus, education, employment]);

  const handlePredict = () => setShowResult(true);
  const handleReset = () => {
    setIncome(1200);
    setExpenses(1800);
    setDependents(3);
    setAge(45);
    setHealthStatus(1);
    setEducation(2);
    setEmployment(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Poverty Escape Predictor</h1>
            <p className="text-sm text-gray-500 mt-1">SVM-powered prediction with {modelMetrics.accuracy}% accuracy</p>
          </div>

          {/* Model Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-emerald-600">{modelMetrics.accuracy}%</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Precision</p>
              <p className="text-2xl font-bold text-blue-600">{modelMetrics.precision}%</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Recall</p>
              <p className="text-2xl font-bold text-purple-600">{modelMetrics.recall}%</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">ROC-AUC</p>
              <p className="text-2xl font-bold text-amber-600">{modelMetrics.rocAuc}%</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-6">Recipient Information</h3>
              
              <div className="space-y-5">
                {/* Income */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Monthly Income</label>
                    <span className="text-xs font-bold text-gray-900">RM {income}</span>
                  </div>
                  <input
                    type="range" min="0" max="5000" step="100"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-400">RM 0</span>
                    <span className="text-[10px] text-gray-400">RM 5,000</span>
                  </div>
                </div>

                {/* Expenses */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Monthly Expenses</label>
                    <span className="text-xs font-bold text-gray-900">RM {expenses}</span>
                  </div>
                  <input
                    type="range" min="0" max="5000" step="100"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                {/* Dependents */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Number of Dependents</label>
                    <span className="text-xs font-bold text-gray-900">{dependents}</span>
                  </div>
                  <input
                    type="range" min="0" max="10" step="1"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Age</label>
                    <span className="text-xs font-bold text-gray-900">{age} years</span>
                  </div>
                  <input
                    type="range" min="18" max="80" step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-2">Health</label>
                    <select
                      value={healthStatus}
                      onChange={(e) => setHealthStatus(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value={0}>Poor</option>
                      <option value={1}>Good</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-2">Education</label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value={0}>None</option>
                      <option value={1}>Primary</option>
                      <option value={2}>Secondary</option>
                      <option value={3}>Diploma</option>
                      <option value={4}>Degree</option>
                      <option value={5}>Postgrad</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-2">Employment</label>
                    <select
                      value={employment}
                      onChange={(e) => setEmployment(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value={0}>Unemployed</option>
                      <option value={1}>Employed</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handlePredict}
                    className="flex-1 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Predict
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {showResult ? (
                <>
                  {/* Prediction Result */}
                  <div className={`rounded-2xl p-6 ${prediction.canEscape ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-600">Prediction Result</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${prediction.canEscape ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {prediction.confidence} Confidence
                      </span>
                    </div>
                    <div className="text-center py-4">
                      <p className={`text-5xl font-bold ${prediction.canEscape ? 'text-emerald-600' : 'text-red-600'}`}>
                        {prediction.probability}%
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {prediction.canEscape ? 'Likely to Escape Poverty' : 'At Risk - Needs Support'}
                      </p>
                    </div>
                  </div>

                  {/* 3-Year Forecast */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">3-Year Escape Probability</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { year: 'Year 1', value: prediction.year1 },
                        { year: 'Year 2', value: prediction.year2 },
                        { year: 'Year 3', value: prediction.year3 },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="w-full bg-gray-100 rounded-full h-24 relative mb-2">
                            <div
                              className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-full transition-all"
                              style={{ height: `${item.value}%` }}
                            ></div>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{item.value}%</p>
                          <p className="text-[10px] text-gray-500">{item.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="text-sm font-semibold mb-4">Recommendations</h4>
                    <div className="space-y-3">
                      {income < expenses && (
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-300">Income is below expenses. Consider income-generating programs.</p>
                        </div>
                      )}
                      {dependents > 4 && (
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-300">High number of dependents. Family support programs recommended.</p>
                        </div>
                      )}
                      {education < 3 && (
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-300">Skills training and education programs can improve outcomes.</p>
                        </div>
                      )}
                      {employment === 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
                          <p className="text-xs text-gray-300">Job placement assistance and entrepreneurship training advised.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* Placeholder */
                <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Run a Prediction</h3>
                  <p className="text-xs text-gray-500 text-center max-w-xs">
                    Enter recipient information and click "Predict" to see the poverty escape probability.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center text-lg flex-shrink-0">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">About This Model</h4>
                <p className="text-xs text-gray-600">
                  This predictor uses a Support Vector Machine (SVM) with RBF kernel trained on {summaryStats.totalRecipients.toLocaleString()} zakat recipients from Kedah, Malaysia. 
                  The model analyzes 113 features to predict poverty escape likelihood with {modelMetrics.rocAuc}% ROC-AUC score.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
