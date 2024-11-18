import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ClickMarker = ({ setClickedLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setClickedLocation([lat, lng]);
    },
  });

  return null;
};

const StoryMap = ({ locations }) => {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <MapContainer center={[16.5062, 80.6480]} zoom={12} className="h-96 w-full rounded-lg">
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Labels">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.Overlay>
      </LayersControl>
      {locations.map((location, index) => (
        <Marker key={index} position={location.position} icon={icon}>
          <Popup>
            <h3 className="font-bold">{location.title}</h3>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
      <ClickMarker setClickedLocation={setClickedLocation} />
      {clickedLocation && (
        <Marker position={clickedLocation} icon={icon}>
          <Popup>
            <h3 className="font-bold">Clicked Location</h3>
            <p>Latitude: {clickedLocation[0]}</p>
            <p>Longitude: {clickedLocation[1]}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default StoryMap;
