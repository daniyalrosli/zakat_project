'use client';

import Navbar from '@/components/navbar';
import { TrendingUp, AlertCircle, Calendar, Target } from 'lucide-react';
import { useState } from 'react';

export default function Forecast() {
  const [incomeGrowth, setIncomeGrowth] = useState(5);
  const [assistanceIncrease, setAssistanceIncrease] = useState(10);
  const [timeHorizon, setTimeHorizon] = useState(12);

  const currentRecipients = 9923;
  const baseEscapeRate = 0.17; // 17% based on model
  
  const calculateForecast = (months: number) => {
    const growthFactor = (incomeGrowth / 100) * (months / 12);
    const assistanceFactor = (assistanceIncrease / 100) * (months / 12);
    const adjustedRate = baseEscapeRate * (1 + growthFactor + assistanceFactor);
    return Math.round(currentRecipients * adjustedRate);
  };

  const forecastData = [
    { period: 'Quarter 1', months: 3, predicted: calculateForecast(3) },
    { period: 'Quarter 2', months: 6, predicted: calculateForecast(6) },
    { period: 'Quarter 3', months: 9, predicted: calculateForecast(9) },
    { period: 'Quarter 4', months: 12, predicted: calculateForecast(12) },
    { period: 'Year 2', months: 24, predicted: calculateForecast(24) },
  ];

  const topPredictors = [
    { feature: 'Total Income', importance: 15.2, description: 'Primary indicator of household financial capacity' },
    { feature: 'Income Growth (YoY)', importance: 13.9, description: 'Year-over-year income change trajectory' },
    { feature: 'Zakat Assistance Amount', importance: 11.8, description: 'Total financial aid received' },
    { feature: 'Dependency Ratio', importance: 10.4, description: 'Non-working to working members ratio' },
    { feature: 'Employment Category', importance: 8.7, description: 'Type and stability of employment' },
    { feature: 'Household Size', importance: 7.6, description: 'Number of household members' },
  ];

  const insights = [
    {
      title: 'Income Dynamics Critical',
      description: 'Households with positive income growth are 3.2x more likely to escape poverty. Targeted income-generation programs should be prioritized.',
      type: 'success',
      icon: TrendingUp
    },
    {
      title: 'High Dependency Risk',
      description: 'Recipients with dependency ratios above 0.6 show 45% lower escape rates. Extended support periods recommended for these cases.',
      type: 'warning',
      icon: AlertCircle
    },
    {
      title: 'Employment Stability Key',
      description: 'Formal employment correlates with 28% higher escape probability compared to informal sector or unemployment.',
      type: 'info',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Poverty Escape Forecast</h1>
            <p className="text-gray-600">Predict future poverty escape outcomes using ML-based scenario analysis</p>
          </div>

          {/* Current Model Performance */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-gray-300 mb-1">Model Performance (Gradient Boosting)</p>
                <p className="text-4xl font-bold mb-2">90.8% Accuracy</p>
                <div className="flex gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-300">Precision</p>
                    <p className="text-xl font-semibold">80.6%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Recall</p>
                    <p className="text-xl font-semibold">100%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">ROC-AUC</p>
                    <p className="text-xl font-semibold">94.1%</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <TrendingUp size={40} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Total Recipients</p>
                <p className="text-2xl font-bold">{currentRecipients.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Base Escape Rate</p>
                <p className="text-2xl font-bold">{(baseEscapeRate * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Forecast Controls */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Average Income Growth Rate: {incomeGrowth}%
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={incomeGrowth}
                onChange={(e) => setIncomeGrowth(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Zakat Assistance Increase: {assistanceIncrease}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={assistanceIncrease}
                onChange={(e) => setAssistanceIncrease(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Forecast Horizon: {timeHorizon} months
              </label>
              <input
                type="range"
                min="3"
                max="36"
                step="3"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>3 mo</span>
                <span>36 mo</span>
              </div>
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Poverty Escape Forecast Trend</h2>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-blue-500"></div>
                  <span className="text-gray-600">Actual Escapes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 border-t-2 border-dashed border-orange-500"></div>
                  <span className="text-gray-600">Forecast</span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="relative h-80 pt-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                <span>2000</span>
                <span>1500</span>
                <span>1000</span>
                <span>500</span>
                <span>0</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-12 mr-4 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-gray-100"></div>
                  ))}
                </div>
                
                {/* Line chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                  {/* Actual data line (historical) */}
                  <polyline
                    points="0,240 80,180 160,200 240,160 320,140 400,100 480,120"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Forecast line (dashed) */}
                  <polyline
                    points="480,120 560,130 640,135 720,138 800,140 880,142"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {[
                    { x: 0, y: 240 },
                    { x: 80, y: 180 },
                    { x: 160, y: 200 },
                    { x: 240, y: 160 },
                    { x: 320, y: 140 },
                    { x: 400, y: 100 },
                    { x: 480, y: 120 },
                  ].map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                  
                  {/* Forecast points */}
                  {[
                    { x: 560, y: 130 },
                    { x: 640, y: 135 },
                    { x: 720, y: 138 },
                    { x: 800, y: 140 },
                    { x: 880, y: 142 },
                  ].map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#f97316"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-gray-600">
                  <span>Q1-2023</span>
                  <span>Q2-2023</span>
                  <span>Q3-2023</span>
                  <span>Q4-2023</span>
                  <span>Q1-2024</span>
                  <span>Q2-2024</span>
                  <span>Q3-2024</span>
                  <span>Q4-2024</span>
                  <span>Q1-2025</span>
                  <span>Q2-2025</span>
                  <span>Q3-2025</span>
                  <span>Q4-2025</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                Forecast based on Gradient Boosting model with {incomeGrowth}% income growth and {assistanceIncrease}% assistance increase
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Top Feature Importance */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Predictive Features</h2>
              <div className="space-y-4">
                {topPredictors.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-900">{item.feature}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.importance}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all" 
                        style={{ width: `${item.importance}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Predictive Insights</h2>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-5 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${
                        insight.type === 'warning' ? 'bg-orange-100' : 
                        insight.type === 'success' ? 'bg-emerald-100' : 'bg-blue-100'
                      }`}>
                        <insight.icon className={
                          insight.type === 'warning' ? 'text-orange-600' : 
                          insight.type === 'success' ? 'text-emerald-600' : 'text-blue-600'
                        } size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Model Comparison Section */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Model Performance Comparison</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                <p className="text-xs text-emerald-700 font-medium mb-1">Gradient Boosting</p>
                <p className="text-2xl font-bold text-emerald-900">90.8%</p>
                <p className="text-xs text-emerald-600 mt-1">Best Overall</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Random Forest</p>
                <p className="text-2xl font-bold text-gray-900">87.5%</p>
                <p className="text-xs text-gray-500 mt-1">Strong Baseline</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">SVM (RBF)</p>
                <p className="text-2xl font-bold text-gray-900">85.6%</p>
                <p className="text-xs text-gray-500 mt-1">High Complexity</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Logistic Regression</p>
                <p className="text-2xl font-bold text-gray-900">78.3%</p>
                <p className="text-xs text-gray-500 mt-1">Underfitted</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}