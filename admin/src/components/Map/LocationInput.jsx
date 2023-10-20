import React, { useState } from 'react';
//add lazy loading react-leaftlet
import dynamic from 'next/dynamic';
const MapWithNoSSR = dynamic(() => import('./Map'), { ssr: false });
import { ApiBase } from '../../../Helper/ApiBase';
import axios from 'axios';
import { useRouter } from 'next/router';


const LocationInput = () => {
  const router = useRouter();
  const [location, setLocation] = useState({ lat: 23.810331, lng: 90.412521 });
  const [title, setTitle] = useState(''); // [lat, lng]
  const [description, setDescription] = useState(''); // [lat, lng]
  const [address, setAddress] = useState(''); // [lat, lng


  const handleSubmit = async () => {
    const data = {
      title,
      description,
      address,
      lat: location.lat,
      lng: location.lng
    }
    const res = await axios.post(`${ApiBase}/store`, data);
    console.log(res);
    alert('Location Added Successfully');
    setTitle('');
    setDescription('');
    setAddress('');


  }


  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div>
      <div className='py-2 px-4 border rounded'>
        <button className='btn btn-primary mt-2 px-2' onClick={() => router.push('/store')}>Back</button>
      </div>

      <MapWithNoSSR
        // stores={stores}
        center={location}
        onLocationChange={handleLocationChange}
      />
      <div className='mt-2 py-2 px-2'>Selected Location:</div>
      <div className='py-2 px-4 border rounded'>
        <div className='mt-2'>Title: {title}</div>
        <div className='mt-2'>Description: {description}</div>
        <div className='mt-2'>Latitude: {location.lat}</div>
        <div className='mt-2'>Longitude: {location.lng}</div>
      </div>
      <div className='py-2 px-4 border rounded'>
        <input
          type="text"
          placeholder="Enter location title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control mt-2 px-2'
        />
        <textarea
          type="text"
          placeholder="Enter location description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='form-control mt-2 px-2'
        />
        <textarea
          type="text"
          placeholder="Enter location address & phone"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='form-control mt-2 px-2'
        />
      </div>
      <div className='py-2 px-4 border rounded'>
        <button className='btn btn-primary mt-2 px-2' onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  );
};

export default LocationInput;
