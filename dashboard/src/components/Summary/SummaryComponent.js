import React from 'react';
import { Grid, Paper } from '@mui/material';
import KPICard from '../KPI/KPICard';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';
import Filters from '../Filters/Filters';

const SummaryComponent = () => {
  return (
    <div>
      <h2>Summary / Metrics</h2>
      <Filters />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Total Recipients" value="1,234" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Poverty Escape Rate" value="15%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Average Income" value="MYR 1,200" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="New Recipients (YTD)" value="250" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <BarChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <PieChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryComponent;
