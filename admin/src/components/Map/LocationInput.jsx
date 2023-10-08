import React, { useState } from 'react';
//add lazy loading react-leaftlet
import dynamic from 'next/dynamic';
const MapWithNoSSR = dynamic(() => import('./Map'), { ssr: false });



const LocationInput = () => {
  const [location, setLocation] = useState({ lat: 23.810331, lng: 90.412521 });

  //stores data in dhaka
  const stores = [
    { name: 'Store 1', location: [23.810331, 90.412521] }, // [lat, lng]
    { name: 'Store 2', location: [23.010331, 90.212521] },
    { name: 'Store 3', location: [23.210331, 90.112521] },
    { name: 'Store 4', location: [23.410331, 90.312521] }

  ];

  
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div>
        <MapWithNoSSR
            stores={stores}
            center={location}
            onLocationChange={handleLocationChange}
        />
      <input
        type="text"
        placeholder="Enter location name/address"
        value={`${location.lat}, ${location.lng}`}
        readOnly
      />
    </div>
  );
};

export default LocationInput;
