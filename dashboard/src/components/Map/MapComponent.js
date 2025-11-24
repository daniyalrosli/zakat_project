import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [selectedDaerah, setSelectedDaerah] = useState('All');
  const [mapData, setMapData] = useState([]);
  const [daerahOptions, setDaerahOptions] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const response = await fetch('http://localhost:3001/api/filters');
      const data = await response.json();
      setDaerahOptions(data.locations);
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams({ daerah: selectedDaerah }).toString();
      const response = await fetch(`http://localhost:3001/api/map?${query}`);
      const data = await response.json();
      setMapData(data);
    };
    fetchData();
  }, [selectedDaerah]);

  const handleDaerahChange = (event) => {
    setSelectedDaerah(event.target.value);
  };

  // A simple function to generate random coordinates for demonstration
  // In a real application, you would have actual latitude and longitude data
  const getRandomCoords = (daerah) => {
    // This is a mock function. Replace with real coordinates.
    const coords = {
        'KUALA MUDA': [5.6, 100.4],
        'KOTA SETAR': [6.1, 100.3],
        'KUBANG PASU': [6.4, 100.4],
        'PENDANG': [5.9, 100.4],
        'KULIM': [5.3, 100.5],
        'LANGKAWI': [6.3, 99.8],
        'PADANG TERAP': [6.2, 100.6],
        'SIK': [5.8, 100.7],
        'BALING': [5.6, 100.9],
        'YAN': [5.8, 100.3],
        'BANDAR BAHARU': [5.1, 100.5],
    };
    const base = coords[daerah] || [5.8, 100.5];
    return [base[0] + (Math.random() - 0.5) * 0.1, base[1] + (Math.random() - 0.5) * 0.1];
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Daerah</InputLabel>
            <Select value={selectedDaerah} label="Daerah" onChange={handleDaerahChange}>
              {daerahOptions.map(daerah => (
                <MenuItem key={daerah} value={daerah}>{daerah}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <MapContainer center={[5.8, 100.5]} zoom={9} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData.map(recipient => {
          const position = getRandomCoords(recipient.DAERAH);
          return (
            <Marker key={recipient.NoKP} position={position}>
              <Popup>
                <b>{recipient.Nama}</b><br />
                Daerah: {recipient.DAERAH}<br />
                Income: RM{recipient.JumlahPendapatan}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
