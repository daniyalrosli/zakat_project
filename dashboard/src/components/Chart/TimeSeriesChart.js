import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeSeriesChart = ({ data }) => {
  return (
    <>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Actual Escape Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Forecasted Escape Rate" stroke="#82ca9d" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </>
  );
};

export default TimeSeriesChart;
