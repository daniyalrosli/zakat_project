import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', actual: 4000, forecast: 2400 },
  { name: 'Feb', actual: 3000, forecast: 1398 },
  { name: 'Mar', actual: 2000, forecast: 9800 },
  { name: 'Apr', actual: 2780, forecast: 3908 },
  { name: 'May', actual: 1890, forecast: 4800 },
  { name: 'Jun', actual: 2390, forecast: 3800 },
  { name: 'Jul', actual: 3490, forecast: 4300 },
];

const TimeSeriesChart = () => {
  return (
    <>
        <h3>Poverty Escape Rate Forecast</h3>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    </>
  );
};

export default TimeSeriesChart;
