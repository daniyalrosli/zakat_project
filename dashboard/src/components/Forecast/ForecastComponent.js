import React, { useState, useEffect } from 'react';
import TimeSeriesChart from '../Chart/TimeSeriesChart';
import { Box, CircularProgress } from '@mui/material';

const ForecastComponent = () => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/forecast');
      const data = await response.json();
      setForecastData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  return (
    <div>
      <h2>Poverty Escape Rate Forecast</h2>
      <TimeSeriesChart data={forecastData} />
    </div>
  );
};

export default ForecastComponent;
