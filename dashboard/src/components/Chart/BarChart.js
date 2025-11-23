import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Kuala Lumpur', recipients: 400 },
  { name: 'Petaling Jaya', recipients: 300 },
  { name: 'Puchong', recipients: 200 },
  { name: 'Shah Alam', recipients: 278 },
];

const BarChart = () => {
  return (
    <>
      <h3>Recipients by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="recipients" fill="#8884d8" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChart;
