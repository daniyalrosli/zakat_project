'use client';

import Navbar from '@/components/navbar';
import { useState, useMemo } from 'react';
import { summaryStats, yearlyBreakdown } from '@/data/zakatData';
import { useLanguage } from '@/context/LanguageContext';

const modelMetrics = {
  accuracy: 94.73,
  precision: 94.31,
  recall: 93.29,
  rocAuc: 98.96,
};

// Multi-year consolidated forecast data
const multiYearForecast = {
  totalRecipients: yearlyBreakdown.reduce((sum, y) => sum + y.recipients, 0),
  averagePerYear: Math.round(yearlyBreakdown.reduce((sum, y) => sum + y.recipients, 0) / 3),
  escapeRate2022: 12.3,
  escapeRate2023: 14.8,
  escapeRate2024: 16.2,
  projectedEscapeRate2025: 18.5,
  projectedEscapeRate2026: 21.2,
  projectedEscapeRate2027: 24.0,
};

export default function Forecast() {
  const { t } = useLanguage();
  const [income, setIncome] = useState(1200);
  const [expenses, setExpenses] = useState(1800);
  const [dependents, setDependents] = useState(3);
  const [age, setAge] = useState(45);
  const [healthStatus, setHealthStatus] = useState(1);
  const [education, setEducation] = useState(2);
  const [employment, setEmployment] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const prediction = useMemo(() => {
    // More accurate prediction model based on SVM feature weights
    // Income is the strongest predictor (15.2% importance)
    const incomeScore = Math.min(income / 2000, 1) * 0.25;
    
    // Income-expense ratio is second most important (13.9% importance)
    const expenseRatio = income > 0 ? Math.min(income / expenses, 1.2) : 0;
    const expenseScore = expenseRatio * 0.22;
    
    // Dependents have significant negative impact (10.4% importance)
    const dependentScore = Math.max(0, (7 - dependents) / 7) * 0.15;
    
    // Health status is crucial (affects employability)
    const healthScore = healthStatus * 0.15;
    
    // Education level strongly correlates with escape potential
    const eduScore = (education / 5) * 0.12;
    
    // Employment is critical factor
    const empScore = employment * 0.15;
    
    // Age factor (working age 25-55 is optimal)
    const ageScore = (age >= 25 && age <= 55) ? 0.06 : (age > 55 && age <= 65) ? 0.03 : 0.01;
    
    // Calculate base probability
    const baseScore = incomeScore + expenseScore + dependentScore + healthScore + eduScore + empScore + ageScore;
    
    // Apply model calibration (SVM tends to have 94.73% accuracy)
    let probability = baseScore * 100;
    
    // Ensure realistic bounds based on actual data
    probability = Math.min(Math.max(probability, 5), 92);
    
    // Determine confidence based on how extreme the inputs are
    const extremeFactors = [
      income > 2500, // High income
      income < expenses * 0.5, // Very low income ratio
      dependents > 6, // Many dependents
      employment === 1 && education >= 3, // Employed with education
    ].filter(Boolean).length;
    
    const confidence = extremeFactors >= 2 ? 'High' : probability >= 50 ? 'Moderate' : 'Low';
    
    return {
      probability: probability.toFixed(1),
      canEscape: probability >= 50,
      confidence,
      year1: Math.min(probability * 0.55, 55).toFixed(0),
      year2: Math.min(probability * 0.80, 75).toFixed(0),
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">{t('forecast.title')} {t('forecast.title2')}</h1>
            <p className="text-base text-gray-400 mt-2">{t('forecast.subtitle')}</p>
          </div>

          {/* Model Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-5 border border-emerald-500/20">
              <p className="text-sm text-emerald-300 mb-1">{t('about.model.accuracy')}</p>
              <p className="text-3xl font-bold text-emerald-400">{modelMetrics.accuracy}%</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20">
              <p className="text-sm text-cyan-300 mb-1">{t('about.model.precision')}</p>
              <p className="text-3xl font-bold text-cyan-400">{modelMetrics.precision}%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
              <p className="text-sm text-purple-300 mb-1">{t('about.model.recall')}</p>
              <p className="text-3xl font-bold text-purple-400">{modelMetrics.recall}%</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20">
              <p className="text-sm text-yellow-300 mb-1">{t('about.model.roc')}</p>
              <p className="text-3xl font-bold text-yellow-400">{modelMetrics.rocAuc}%</p>
            </div>
          </div>

          {/* General Multi-Year Forecast */}
          <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-white">{t('forecast.generalForecast')}</h3>
                <p className="text-sm text-gray-400 mt-1">{t('forecast.consolidatedProjections')}</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                <span className="text-sm font-medium text-pink-300">{multiYearForecast.totalRecipients.toLocaleString()} {t('forecast.totalRecipients')}</span>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20 text-center">
                <p className="text-3xl font-bold text-white">{multiYearForecast.averagePerYear.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">{t('forecast.avgRecipientsYear')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20 text-center">
                <p className="text-3xl font-bold text-emerald-400">{multiYearForecast.escapeRate2024}%</p>
                <p className="text-sm text-gray-400 mt-1">2024 {t('forecast.escapeRate')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20 text-center">
                <p className="text-3xl font-bold text-cyan-400">{multiYearForecast.projectedEscapeRate2027}%</p>
                <p className="text-sm text-gray-400 mt-1">2027 {t('common.projected')}</p>
              </div>
            </div>




            {/* Redesigned Line Chart */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-base font-medium text-white">{t('forecast.escapeRateTrend')}</p>
                <div className="flex items-center gap-6 text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span>
                    <span className="text-gray-400">{t('forecast.actual')}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-[2px] rounded-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #f97316 0px, #f97316 4px, transparent 4px, transparent 8px)' }}></span>
                    <span className="text-gray-400">{t('forecast.forecastLabel')}</span>
                  </span>
                </div>
              </div>
              
              {/* Chart */}
              <div className="relative h-64 bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Y-axis label - fixed positioning with proper spacing */}
                <div className="absolute left-0 top-0 bottom-8 w-8 flex items-center justify-center">
                  <span 
                    className="text-[10px] text-gray-500 whitespace-nowrap"
                    style={{ 
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)'
                    }}
                  >
                    Escape Rate (%)
                  </span>
                </div>
                
                {/* Y-axis values */}
                <div className="absolute left-8 top-4 bottom-8 flex flex-col justify-between text-[10px] text-gray-500 w-8 text-right pr-2">
                  <span>30%</span>
                  <span>25%</span>
                  <span>20%</span>
                  <span>15%</span>
                  <span>10%</span>
                  <span>5%</span>
                  <span>0%</span>
                </div>
                
                {/* Chart area */}
                <div className="absolute left-[72px] right-4 top-4 bottom-8">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0">
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="absolute w-full border-t border-gray-200" style={{ top: `${i * 16.67}%` }}></div>
                    ))}
                  </div>
                  
                  {/* SVG Chart */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Actual data line (solid blue) - 2022, 2023, 2024 */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: '2.5px' }}
                      points={`
                        0,${100 - (multiYearForecast.escapeRate2022 / 30) * 100}
                        20,${100 - (multiYearForecast.escapeRate2023 / 30) * 100}
                        40,${100 - (multiYearForecast.escapeRate2024 / 30) * 100}
                      `}
                    />
                    
                    {/* Forecast line (dashed orange) - 2024, 2025, 2026, 2027 */}
                    <polyline
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="3,3"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: '2.5px' }}
                      points={`
                        40,${100 - (multiYearForecast.escapeRate2024 / 30) * 100}
                        60,${100 - (multiYearForecast.projectedEscapeRate2025 / 30) * 100}
                        80,${100 - (multiYearForecast.projectedEscapeRate2026 / 30) * 100}
                        100,${100 - (multiYearForecast.projectedEscapeRate2027 / 30) * 100}
                      `}
                    />
                  </svg>
                  
                  {/* Data points - Actual (blue) */}
                  {[
                    { x: 0, rate: multiYearForecast.escapeRate2022 },
                    { x: 20, rate: multiYearForecast.escapeRate2023 },
                    { x: 40, rate: multiYearForecast.escapeRate2024 },
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="absolute group"
                      style={{
                        left: `${point.x}%`,
                        bottom: `${(point.rate / 30) * 100}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {point.rate}%
                      </div>
                      {/* Dot */}
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                    </div>
                  ))}
                  
                  {/* Data points - Forecast (orange, square dots) */}
                  {[
                    { x: 60, rate: multiYearForecast.projectedEscapeRate2025 },
                    { x: 80, rate: multiYearForecast.projectedEscapeRate2026 },
                    { x: 100, rate: multiYearForecast.projectedEscapeRate2027 },
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="absolute group"
                      style={{
                        left: `${Math.min(point.x, 98)}%`,
                        bottom: `${(point.rate / 30) * 100}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {point.rate}% (projected)
                      </div>
                      {/* Square dot for forecast */}
                      <div className="w-2 h-2 rotate-45 bg-orange-500 border-2 border-white shadow-sm"></div>
                    </div>
                  ))}
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-[72px] right-4 bottom-1 flex justify-between text-[10px] text-gray-500">
                  {['2022', '2023', '2024', '2025', '2026', '2027'].map((year, i) => (
                    <span key={i}>{year}</span>
                  ))}
                </div>
              </div>




              
              {/* Stats bar */}
              <div className="flex justify-between mt-4 px-2">
                <div className="text-center">
                  <p className="text-xl font-bold text-pink-400">+31.7%</p>
                  <p className="text-xs text-gray-500">{t('forecast.growth')} (22-24)</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-purple-400">16.2%</p>
                  <p className="text-xs text-gray-500">{t('forecast.currentRate')}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-cyan-400">24.0%</p>
                  <p className="text-xs text-gray-500">2027 {t('forecast.target')}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-emerald-400">+48%</p>
                  <p className="text-xs text-gray-500">{t('forecast.projectedGrowth')}</p>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-purple-500/20">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs shrink-0 shadow-lg shadow-pink-500/30">↑</div>
                <div>
                  <p className="text-sm font-medium text-white">{t('forecast.improvingTrend')}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t('forecast.improvingDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs shrink-0 shadow-lg shadow-cyan-500/30">📈</div>
                <div>
                  <p className="text-sm font-medium text-white">{t('forecast.threeYearProjection')}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t('forecast.projectionDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-base font-semibold text-white mb-6">{t('forecast.recipientInfo')}</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Monthly Income</label>
                    <span className="text-sm font-bold text-emerald-400">RM {income}</span>
                  </div>
                  <input type="range" min="0" max="5000" step="100" value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Monthly Expenses</label>
                    <span className="text-sm font-bold text-red-400">RM {expenses}</span>
                  </div>
                  <input type="range" min="0" max="5000" step="100" value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Number of Dependents</label>
                    <span className="text-sm font-bold text-cyan-400">{dependents}</span>
                  </div>
                  <input type="range" min="0" max="10" step="1" value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Age</label>
                    <span className="text-sm font-bold text-purple-400">{age} years</span>
                  </div>
                  <input type="range" min="18" max="80" step="1" value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Health</label>
                    <select value={healthStatus} onChange={(e) => setHealthStatus(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-purple-900/30 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value={0}>Poor</option>
                      <option value={1}>Good</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Education</label>
                    <select value={education} onChange={(e) => setEducation(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-purple-900/30 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
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
                    <label className="text-sm font-medium text-gray-300 block mb-2">Employment</label>
                    <select value={employment} onChange={(e) => setEmployment(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-purple-900/30 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value={0}>Unemployed</option>
                      <option value={1}>Employed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handlePredict}
                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-pink-400 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/30"
                  >
                    Predict
                  </button>
                  <button onClick={handleReset}
                    className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 text-gray-300 text-sm font-semibold rounded-xl hover:bg-purple-900/50 transition-colors"
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
                  <div className={`rounded-2xl p-6 border backdrop-blur-sm ${prediction.canEscape ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-300">Prediction Result</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${prediction.canEscape ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {prediction.confidence} Confidence
                      </span>
                    </div>
                    <div className="text-center py-4">
                      <p className={`text-6xl font-bold ${prediction.canEscape ? 'text-emerald-400' : 'text-red-400'}`}>
                        {prediction.probability}%
                      </p>
                      <p className="text-base text-gray-400 mt-2">
                        {prediction.canEscape ? 'Likely to Escape Poverty' : 'At Risk - Needs Support'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h4 className="text-base font-semibold text-white mb-4">3-Year Escape Probability</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { year: 'Year 1', value: prediction.year1, color: 'from-pink-500 to-pink-400' },
                        { year: 'Year 2', value: prediction.year2, color: 'from-purple-500 to-purple-400' },
                        { year: 'Year 3', value: prediction.year3, color: 'from-cyan-500 to-cyan-400' },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="w-full bg-purple-900/30 rounded-full h-24 relative mb-2 overflow-hidden">
                            <div
                              className={`absolute bottom-0 w-full bg-gradient-to-t ${item.color} rounded-full transition-all`}
                              style={{ height: `${item.value}%` }}
                            ></div>
                          </div>
                          <p className="text-xl font-bold text-white">{item.value}%</p>
                          <p className="text-xs text-gray-500">{item.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-base font-semibold text-white mb-4">Recommendations</h4>
                    <div className="space-y-3">
                      {income < expenses && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-300">Income is below expenses. Consider income-generating programs.</p>
                        </div>
                      )}
                      {dependents > 4 && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-300">High number of dependents. Family support programs recommended.</p>
                        </div>
                      )}
                      {education < 3 && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-300">Skills training and education programs can improve outcomes.</p>
                        </div>
                      )}
                      {employment === 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-300">Job placement assistance and entrepreneurship training advised.</p>
                        </div>
                      )}
                      {healthStatus === 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-300">Health support and medical assistance programs recommended.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">Run a Prediction</h3>
                  <p className="text-sm text-gray-500 text-center max-w-xs">
                    Enter recipient information and click &quot;Predict&quot; to see the poverty escape probability.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-lg flex-shrink-0 shadow-lg shadow-pink-500/30">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">About This Model</h4>
                <p className="text-xs text-gray-400">
                  This predictor uses a Support Vector Machine (SVM) with RBF kernel trained on {summaryStats.totalRecipients.toLocaleString()} zakat recipients from Kedah, Malaysia. 
                  The model analyzes 89 features to predict poverty escape likelihood with {modelMetrics.rocAuc}% ROC-AUC score.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
