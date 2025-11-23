import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, TextField } from '@mui/material';

const Filters = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Income Level</InputLabel>
          <Select label="Income Level" defaultValue="">
            <MenuItem value="b40">B40</MenuItem>
            <MenuItem value="m40">M40</MenuItem>
            <MenuItem value="t20">T20</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select label="Location" defaultValue="">
            <MenuItem value="kl">Kuala Lumpur</MenuItem>
            <MenuItem value="pj">Petaling Jaya</MenuItem>
            <MenuItem value="puchong">Puchong</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
            id="year"
            label="Year"
            type="number"
            fullWidth
            InputLabelProps={{
            shrink: true,
            }}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
