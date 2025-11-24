import React, { useState, useEffect } from 'react';
import { Grid, Paper, CircularProgress, Box } from '@mui/material';
import KPICard from '../KPI/KPICard';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';
import Filters from '../Filters/Filters';

const SummaryComponent = () => {
  const [filters, setFilters] = useState({
    incomeLevel: 'All',
    location: 'All',
    year: 'All',
  });
  const [kpiData, setKpiData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const [kpis, charts] = await Promise.all([
        fetch(`http://localhost:3001/api/kpis?${query}`).then(res => res.json()),
        fetch(`http://localhost:3001/api/charts?${query}`).then(res => res.json()),
      ]);
      setKpiData(kpis);
      setChartData(charts);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Total Recipients" value={kpiData.totalRecipients} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Poverty Escape Rate" value={kpiData.povertyEscapeRate} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Average Income" value={kpiData.averageIncome} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="New Recipients (This Year)" value={kpiData.newRecipients} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <BarChart data={chartData.barChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <PieChart data={chartData.pieChartData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryComponent;
