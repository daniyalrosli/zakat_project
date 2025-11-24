import React, { useState, Suspense, lazy } from 'react';
import { Tabs, Tab, Box, Typography, Container, CircularProgress } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';

const MapComponent = lazy(() => import('../Map/MapComponent'));
const ForecastComponent = lazy(() => import('../Forecast/ForecastComponent'));
const SummaryComponent = lazy(() => import('../Summary/SummaryComponent'));
const ReportingComponent = lazy(() => import('../Reporting/ReportingComponent'));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 2 }}>
            Zakat Dashboard
        </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Zakat dashboard tabs">
            <Tab icon={<MapIcon />} label="Maps & Statistics" />
            <Tab icon={<TimelineIcon />} label="Forecast" />
            <Tab icon={<AssessmentIcon />} label="Summary / Metrics" />
            <Tab icon={<DescriptionIcon />} label="Reporting" />
          </Tabs>
        </Box>
        <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
          <TabPanel value={value} index={0}>
            <MapComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ForecastComponent />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SummaryComponent />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ReportingComponent />
          </TabPanel>
        </Suspense>
      </Box>
    </Container>
  );
};

export default Dashboard;
