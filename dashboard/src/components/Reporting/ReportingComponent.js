import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Recipient Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'riskLevel', headerName: 'Risk Level', width: 110 },
  { field: 'region', headerName: 'Region', width: 160 },
];

const rows = [
  { id: 1, name: 'Ahmad', status: 'Active', riskLevel: 'Low', region: 'Kuala Lumpur' },
  { id: 2, name: 'Siti', status: 'Active', riskLevel: 'Medium', region: 'Petaling Jaya' },
  { id: 3, name: 'Muthu', status: 'Inactive', riskLevel: 'High', region: 'Puchong' },
  { id: 4, name: 'Tan', status: 'Active', riskLevel: 'Low', region: 'Kuala Lumpur' },
  { id: 5, name: 'Zainab', status: 'Active', riskLevel: 'Low', region: 'Shah Alam' },
];

const ReportingComponent = () => {
  return (
    <div>
      <h2>Reporting</h2>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default ReportingComponent;
