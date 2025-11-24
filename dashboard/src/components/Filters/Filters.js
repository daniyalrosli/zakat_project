import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const Filters = ({ filters, setFilters }) => {
  const [filterOptions, setFilterOptions] = useState({
    incomeLevels: [],
    locations: [],
    years: [],
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const response = await fetch('http://localhost:3001/api/filters');
      const data = await response.json();
      setFilterOptions(data);
    };
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Income Level</InputLabel>
          <Select label="Income Level" name="incomeLevel" value={filters.incomeLevel} onChange={handleFilterChange}>
            {filterOptions.incomeLevels.map(level => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select label="Location" name="location" value={filters.location} onChange={handleFilterChange}>
            {filterOptions.locations.map(loc => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select label="Year" name="year" value={filters.year} onChange={handleFilterChange}>
            {filterOptions.years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
