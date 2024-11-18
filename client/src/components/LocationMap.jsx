import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMap = () => {
  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={13} className="h-96 w-full rounded-lg shadow-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.7128, -74.0060]} icon={icon}>
        <Popup>
          <h3 className="font-bold">NGO Office</h3>
          <p>123 Main St, New York, NY 10001</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
