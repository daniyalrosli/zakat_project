'use client';

import Navbar from '@/components/navbar';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Report() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const summaryData = {
    totalRecipients: 9923,
    predictedEscapes: 1687,
    escapeRate: 17.0,
    modelAccuracy: 90.8,
  };

  const yearlyBreakdown = [
    { year: 2022, recipients: 3245, escapes: 512, rate: 15.8 },
    { year: 2023, recipients: 3389, escapes: 576, rate: 17.0 },
    { year: 2024, recipients: 3289, escapes: 599, rate: 18.2 },
  ];

  const categoryDistribution = [
    { category: 'Poor & Needy', recipients: 4156, percentage: 42 },
    { category: 'Education Support', recipients: 1984, percentage: 20 },
    { category: 'Medical Aid', recipients: 1488, percentage: 15 },
    { category: 'Business Capital', recipients: 1290, percentage: 13 },
    { category: 'Debt Relief', recipients: 1005, percentage: 10 },
  ];

  const employmentAnalysis = [
    { type: 'Unemployed', recipients: 4168, escapeRate: 12.3 },
    { type: 'Self-employed', recipients: 2778, escapeRate: 18.5 },
    { type: 'Part-time', recipients: 1786, escapeRate: 19.2 },
    { type: 'Informal Sector', recipients: 1191, escapeRate: 15.7 },
  ];

  const topPredictors = [
    { rank: 1, feature: 'Total Income', importance: 15.2 },
    { rank: 2, feature: 'Income Growth (YoY)', importance: 13.9 },
    { rank: 3, feature: 'Amount of Zakat Assistance', importance: 11.8 },
    { rank: 4, feature: 'Dependency Ratio', importance: 10.4 },
    { rank: 5, feature: 'Employment Category', importance: 8.7 },
    { rank: 6, feature: 'Household Size', importance: 7.6 },
    { rank: 7, feature: 'Program Participation', importance: 6.4 },
    { rank: 8, feature: 'District', importance: 5.3 },
    { rank: 9, feature: 'Number of Earners', importance: 4.1 },
    { rank: 10, feature: 'Age of Recipient', importance: 3.2 },
  ];

  const modelPerformance = [
    { model: 'Gradient Boosting', accuracy: 90.8, precision: 80.6, recall: 100, rocAuc: 94.1, status: 'Best' },
    { model: 'Random Forest', accuracy: 87.5, precision: 76.2, recall: 95, rocAuc: 90.3, status: 'Strong' },
    { model: 'SVM (RBF)', accuracy: 85.6, precision: 74.1, recall: 92, rocAuc: 88.9, status: 'Good' },
    { model: 'Logistic Regression', accuracy: 78.3, precision: 65.4, recall: 88, rocAuc: 81.2, status: 'Baseline' },
  ];

  const handleExportPDF = () => {
    alert('Exporting comprehensive ML analysis report as PDF...');
  };

  const handleExportExcel = () => {
    alert('Exporting data tables and statistics as Excel...');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ML Analytics Report</h1>
              <p className="text-gray-600">Comprehensive machine learning analysis and poverty escape predictions</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button 
                onClick={handleExportExcel}
                className="px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Excel
              </button>
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <FileText size={18} />
                PDF Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Years (2022-2024)</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Categories</option>
                <option value="poor">Poor & Needy</option>
                <option value="education">Education Support</option>
                <option value="medical">Medical Aid</option>
                <option value="business">Business Capital</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Total Recipients</p>
              <p className="text-3xl font-bold text-gray-900">{summaryData.totalRecipients.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">2022-2024 period</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Predicted Escapes</p>
              <p className="text-3xl font-bold text-gray-900">{summaryData.predictedEscapes.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 mt-1">+{summaryData.escapeRate}% rate</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Model Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{summaryData.modelAccuracy}%</p>
              <p className="text-xs text-gray-500 mt-1">Gradient Boosting</p>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Perfect Recall</p>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500 mt-1">No escapes missed</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Yearly Breakdown */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Yearly Performance Analysis</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Year</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Recipients</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Escapes</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.year}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{item.recipients.toLocaleString()}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{item.escapes}</td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-emerald-600 font-medium">{item.rate}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recipients by Category</h2>
              <div className="space-y-4">
                {categoryDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{item.recipients.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Employment Analysis */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Employment Category Analysis</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Employment Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Recipients</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Escape Rate</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employmentAnalysis.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.type}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{item.recipients.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{item.escapeRate}%</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          item.escapeRate > 18 ? 'bg-emerald-50 text-emerald-700' : 
                          item.escapeRate > 15 ? 'bg-blue-50 text-blue-700' : 
                          'bg-orange-50 text-orange-700'
                        }`}>
                          {item.escapeRate > 18 ? 'High' : item.escapeRate > 15 ? 'Moderate' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature Importance Table */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top 10 Predictive Features (Gradient Boosting)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Feature</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Importance Score</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {topPredictors.map((item) => (
                    <tr key={item.rank} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                          {item.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.feature}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{item.importance.toFixed(1)}%</td>
                      <td className="py-4 px-4">
                        <div className="w-32 bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${item.importance * 6}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recipients Risk Level Table */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Recipients Risk Assessment</h2>
            <p className="text-sm text-gray-600 mb-6">
              View detailed risk data for each recipient. Click on a recipient to see their complete poverty escape prediction analysis.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">#</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">As Of Time</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Recipient ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">District</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Risk Level</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Risk Score</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Household Size</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-1234', category: 'Poor & Needy', district: 'Petaling', riskLevel: 'Low', score: 15, household: 5 },
                    { id: 2, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-1567', category: 'Education', district: 'Klang', riskLevel: 'Low', score: 17, household: 4 },
                    { id: 3, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-1890', category: 'Medical Aid', district: 'Gombak', riskLevel: 'Low', score: 18, household: 6 },
                    { id: 4, status: 'Active', date: '2023-12-10 03:00:00', recipientId: 'ZK-2024-2123', category: 'Business Capital', district: 'Hulu Langat', riskLevel: 'Low', score: 16, household: 3 },
                    { id: 5, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-2456', category: 'Poor & Needy', district: 'Petaling', riskLevel: 'Medium', score: 32, household: 7 },
                    { id: 6, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-2789', category: 'Education', district: 'Klang', riskLevel: 'Medium', score: 38, household: 5 },
                    { id: 7, status: 'Review', date: '2023-12-09 00:00:00', recipientId: 'ZK-2024-3012', category: 'Debt Relief', district: 'Gombak', riskLevel: 'High', score: 67, household: 8 },
                    { id: 8, status: 'Active', date: '2023-12-10 00:00:00', recipientId: 'ZK-2024-3345', category: 'Medical Aid', district: 'Petaling', riskLevel: 'Medium', score: 42, household: 4 },
                  ].map((recipient) => (
                    <tr key={recipient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="py-4 px-4 text-sm text-gray-700">{recipient.id}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            recipient.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}></span>
                          <span className="text-sm text-gray-700">{recipient.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{recipient.date}</td>
                      <td className="py-4 px-4">
                        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                          {recipient.recipientId}
                        </a>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{recipient.category}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{recipient.district}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          recipient.riskLevel === 'Low' ? 'bg-emerald-500 text-white' :
                          recipient.riskLevel === 'Medium' ? 'bg-orange-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {recipient.riskLevel}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{recipient.score}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{recipient.household}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}