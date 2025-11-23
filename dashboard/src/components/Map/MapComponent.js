import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dummy data for recipients
const recipients = [
  { id: 1, name: 'Ahmad', position: [3.139, 101.6869], region: 'Kuala Lumpur' },
  { id: 2, name: 'Siti', position: [3.0738, 101.5183], region: 'Petaling Jaya' },
  { id: 3, name: 'Muthu', position: [2.9213, 101.6559], region: 'Puchong' },
];

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  return (
    <div>
      <h2>Recipients Map</h2>
      <MapContainer center={[3.139, 101.6869]} zoom={10} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {recipients.map(recipient => (
          <Marker key={recipient.id} position={recipient.position}>
            <Popup>
              <b>{recipient.name}</b><br />
              Region: {recipient.region}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
