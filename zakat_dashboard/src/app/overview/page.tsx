'use client';

import Navbar from '@/components/navbar';
import { DollarSign, TrendingUp, Users, Calendar, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Overview() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Monthly zakat data
  const monthlyData = [
    { month: 'Jan', amount: 3200 },
    { month: 'Feb', amount: 4500 },
    { month: 'Mar', amount: 3800 },
    { month: 'Apr', amount: 3600 },
    { month: 'May', amount: 3200 },
    { month: 'Jun', amount: 3400 },
    { month: 'Jul', amount: 3100 },
    { month: 'Aug', amount: 3900 },
    { month: 'Sep', amount: 3500 },
    { month: 'Oct', amount: 4200 },
    { month: 'Nov', amount: 4800 },
    { month: 'Dec', amount: 3600 },
  ];

  // Zakat by category
  const zakatByCategory = [
    { name: 'Poor & Needy', amount: 18500, color: 'bg-teal-500' },
    { name: 'Education', amount: 12300, color: 'bg-teal-400' },
    { name: 'Medical Aid', amount: 8450, color: 'bg-teal-300' },
    { name: 'Infrastructure', amount: 5980, color: 'bg-teal-200' },
    { name: 'Debt Relief', amount: 3800, color: 'bg-teal-100' },
  ];

  // Recipients by location
  const recipientsByLocation = [
    { location: 'Kuala Lumpur', percentage: 35 },
    { location: 'Penang', percentage: 28 },
    { location: 'Johor', percentage: 18 },
    { location: 'Selangor', percentage: 12 },
    { location: 'Perak', percentage: 7 },
  ];

  const currentZakat = 45230;
  const zakatGoal = 70000;
  const zakatPercentage = Math.round((currentZakat / zakatGoal) * 100);

  const pipelineValue = 12450;
  const pipelineGoal = 50000;
  const pipelinePercentage = Math.round((pipelineValue / pipelineGoal) * 100);

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Zakat Distribution Dashboard</h1>
            <p className="text-sm text-gray-600">
              Track zakat collections, distributions, and recipients across regions. View trends and forecasts to optimize reach.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Categories</option>
              <option value="poor">Poor & Needy</option>
              <option value="education">Education</option>
              <option value="medical">Medical Aid</option>
            </select>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Locations</option>
              <option value="kl">Kuala Lumpur</option>
              <option value="penang">Penang</option>
              <option value="johor">Johor</option>
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Row 1: New Recipients by Month */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">New Recipients by Month</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-red-400 rounded-t transition-all"
                        style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 1: Zakat by Category */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Zakat by Category</h3>
              <div className="space-y-1 mb-4">
                {zakatByCategory.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 h-12 rounded relative overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full ${item.color} flex items-center justify-between px-3 transition-all`}
                        style={{ width: `${(item.amount / zakatByCategory[0].amount) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-gray-800">{item.name}</span>
                        <span className="text-xs font-semibold text-gray-900">RM {item.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 1: Zakat for Current Month */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Zakat for Current Month</h3>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#fee2e2"
                      strokeWidth="20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="20"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - zakatPercentage / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{zakatPercentage}%</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Collected</p>
                    <p className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded">
                      RM {currentZakat.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Goal</p>
                    <p className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded">
                      RM {zakatGoal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Forecast for Current Month */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Forecast for Current Month</h3>
              <div className="h-48 flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="flex items-end justify-center gap-1 h-40">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col justify-end h-full">
                        <div className="w-full bg-red-400 h-1/3 rounded-t mb-1"></div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">Goal</p>
                          <p className="text-xs text-gray-500">RM 50K</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col justify-end h-full">
                        <div className="w-full bg-teal-500 h-2/3 rounded-t mb-1"></div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">Pending Forecast</p>
                          <p className="text-xs text-gray-500">RM 38.9K</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col justify-end h-full">
                        <div className="w-full bg-pink-300 h-1/2 rounded-t mb-1"></div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">Collected</p>
                          <p className="text-xs text-gray-500">RM 45.2K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">Total Forecast Value</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Recipients by Location */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Recipients by Location</h3>
              <div className="space-y-4">
                {recipientsByLocation.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.location}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
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

            {/* Row 2: Pipeline Coverage for Next Month */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Pipeline Coverage for Next Month</h3>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#fee2e2"
                      strokeWidth="20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="20"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - pipelinePercentage / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{pipelinePercentage}%</span>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-600 mb-2">Current Pipeline Value</p>
                  <p className="px-6 py-2 bg-red-100 text-red-700 text-lg font-semibold rounded">
                    RM {pipelineValue.toLocaleString()}
                  </p>
                  <button className="mt-3 text-xs text-gray-500 underline hover:text-gray-700">
                    Add next here
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}