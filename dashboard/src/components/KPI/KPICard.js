import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const KPICard = ({ title, value }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KPICard;
