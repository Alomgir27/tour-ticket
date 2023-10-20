import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ stores, center, onLocationChange, style }) => {
  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: '80vh', width: '100%', ...style }}
      doubleClickZoom={true}
      whenReady={(map) => {
        map.target.on('click', (e) => {
          onLocationChange(e.latlng);
        }
        );
      }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
        id="mapbox/streets-v11" // Replace with your Mapbox style ID
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} // Your Mapbox access token
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
      {console.log(stores?.length, stores)}
      {stores?.length > 0 && stores?.map((store, index) => (
        <Marker
          key={index}
          position={{ lat: store.lat, lng: store.lng }}
          icon={
            new L.Icon({
              iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],

            })
          }
        >
          <Popup>{store.title}</Popup>
        </Marker>
      ))}
      <Marker
        position={center}
        icon={
          new L.Icon({
            iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],

          })
        }
      >
        <Popup>Selected Location</Popup>
      </Marker>

    </MapContainer>
  );
};

export default Map;
