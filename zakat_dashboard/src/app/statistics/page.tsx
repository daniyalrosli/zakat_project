'use client';

import Navbar from '@/components/navbar';
import { useState } from 'react';

export default function Statistics() {
  const [selectedDaerah, setSelectedDaerah] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Recipients by daerah for donut chart
  const recipientsByCategory = [
    { name: 'Petaling', value: 2845, color: '#ef4444', percentage: 28.7 },
    { name: 'Klang', value: 2134, color: '#3b82f6', percentage: 21.5 },
    { name: 'Gombak', value: 1678, color: '#eab308', percentage: 16.9 },
    { name: 'Hulu Langat', value: 1456, color: '#22c55e', percentage: 14.7 },
    { name: 'Others', value: 1810, color: '#8b5cf6', percentage: 18.2 },
  ];

  // Recipients by state for bar chart
  const recipientsByState = [
    { state: 'Selangor', count: 3542 },
    { state: 'Kuala Lumpur', count: 2834 },
    { state: 'Johor', count: 1923 },
    { state: 'Penang', count: 1456 },
    { state: 'Perak', count: 1289 },
    { state: 'Kedah', count: 987 },
    { state: 'Kelantan', count: 823 },
    { state: 'Pahang', count: 756 },
    { state: 'Negeri Sembilan', count: 645 },
    { state: 'Melaka', count: 534 },
    { state: 'Terengganu', count: 489 },
    { state: 'Perlis', count: 378 },
    { state: 'Sabah', count: 312 },
    { state: 'Sarawak', count: 289 },
  ];

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Jan-23', count: 678 },
    { month: 'Feb-23', count: 723 },
    { month: 'Mar-23', count: 645 },
    { month: 'Apr-23', count: 812 },
    { month: 'May-23', count: 756 },
    { month: 'Jun-23', count: 891 },
    { month: 'Jul-23', count: 734 },
    { month: 'Aug-23', count: 823 },
    { month: 'Sep-23', count: 698 },
    { month: 'Oct-23', count: 867 },
    { month: 'Nov-23', count: 945 },
    { month: 'Dec-23', count: 723 },
    { month: 'Jan-24', count: 789 },
    { month: 'Feb-24', count: 834 },
  ];

  const maxCount = Math.max(...recipientsByState.map(s => s.count));
  const maxMonthly = Math.max(...monthlyTrend.map(m => m.count));
  const totalRecipients = recipientsByCategory.reduce((sum, cat) => sum + cat.value, 0);

  // Calculate donut chart
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentAngle = -90;

  const donutSegments = recipientsByCategory.map(cat => {
    const angle = (cat.value / totalRecipients) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startX = 90 + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = 90 + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = 90 + radius * Math.cos((currentAngle * Math.PI) / 180);
    const endY = 90 + radius * Math.sin((currentAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      ...cat,
      path: `M 90 90 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Statistics: Zakat Recipients by Location</h1>
            <p className="text-sm text-gray-600">
              Interactive map and visual analytics of zakat recipient distribution across Malaysia
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select 
              value={selectedDaerah}
              onChange={(e) => setSelectedDaerah(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Daerah</option>
              <option value="petaling">Petaling</option>
              <option value="klang">Klang</option>
              <option value="gombak">Gombak</option>
              <option value="hulu-langat">Hulu Langat</option>
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

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Map Section (Left) */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Malaysia - Recipients Map</h2>
                <button className="px-3 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800 transition-colors">
                  Published
                </button>
              </div>
              
              {/* Map Placeholder */}
              <div className="relative bg-gray-50 rounded-lg h-96 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-gray-700 text-sm mb-2">Interactive Map View</p>
                  <p className="text-gray-500 text-xs">Recipients distribution across Malaysian states and daerah</p>
                  <p className="text-gray-400 text-xs mt-4">* Map visualization requires external mapping library (e.g., Mapbox, Google Maps)</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>High Density</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Medium Density</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Low Density</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Charts */}
            <div className="space-y-6">
              
              {/* Donut Chart - Recipients by Daerah */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Recipients by Daerah</h3>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-90">
                      {donutSegments.map((segment, index) => (
                        <path
                          key={index}
                          d={segment.path}
                          fill={segment.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                      <circle cx="90" cy="90" r="45" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-600">Total</span>
                      <span className="text-2xl font-bold text-gray-900">{(totalRecipients / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 w-full">
                    {recipientsByCategory.map((cat, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.color }}></div>
                          <span className="text-gray-700">{cat.name}</span>
                        </div>
                        <span className="text-gray-600">{cat.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bar Chart - Recipients by State */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">States</h3>
                </div>
                
                <div className="h-48 flex items-end justify-between gap-1">
                  {recipientsByState.map((state, index) => {
                    const height = (state.count / maxCount) * 100;
                    const colors = ['#eab308', '#f97316', '#3b82f6', '#8b5cf6', '#ef4444', '#22c55e'];
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full rounded-t transition-all hover:opacity-80"
                          style={{ 
                            height: `${height}%`,
                            backgroundColor: colors[index % colors.length]
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500 overflow-x-auto">
                  {recipientsByState.map((state, index) => (
                    <span key={index} className="flex-1 text-center truncate" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '9px' }}>
                      {state.state}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Monthly Trend Chart - Full Width */}
          <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recipients Trend</h3>
            </div>
            
            <div className="relative h-48">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area under the line */}
                <path
                  d={`M 0,${192 - (monthlyTrend[0].count / maxMonthly) * 160} ${monthlyTrend.map((m, i) => {
                    const x = (i / (monthlyTrend.length - 1)) * 100;
                    const y = 192 - (m.count / maxMonthly) * 160;
                    return `L ${x}%,${y}`;
                  }).join(' ')} L 100%,192 L 0,192 Z`}
                  fill="url(#lineGradient)"
                />
                
                {/* Line */}
                <polyline
                  points={monthlyTrend.map((m, i) => {
                    const x = (i / (monthlyTrend.length - 1)) * 100;
                    const y = 192 - (m.count / maxMonthly) * 160;
                    return `${x}%,${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Points */}
                {monthlyTrend.map((m, i) => {
                  const x = (i / (monthlyTrend.length - 1)) * 100;
                  const y = 192 - (m.count / maxMonthly) * 160;
                  return (
                    <circle
                      key={i}
                      cx={`${x}%`}
                      cy={y}
                      r="3"
                      fill="#22c55e"
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
            
            <div className="mt-4 flex justify-between text-xs text-gray-500 overflow-x-auto">
              {monthlyTrend.map((m, index) => (
                <span key={index} className="flex-shrink-0 px-1">{m.month}</span>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}