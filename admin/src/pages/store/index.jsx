import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const MapWithNoSSR = dynamic(() => import('./../../components/Map/Map'), { ssr: false });
import { useRouter } from 'next/router';
import axios from 'axios';
import { ApiBase } from './../../../Helper/ApiBase';

const Index = () => {
    const router = useRouter();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${ApiBase}/store`);
            setStores(res.data?.data);
            console.log(res.data?.data);
        })();
    }, []);

    return (
        <div>
            <div className='absolute top-0 left-0 py-2 px-4 border rounded w-full bg-transparent'>
                <button className='btn btn-primary mt-2 px-2' onClick={() => router.push('/')}>Home</button>
            </div>

            <div className='flex flex-row justify-center items-center py-2 px-4 border rounded'>
                <MapWithNoSSR
                    stores={stores}
                    center={{ lat: 23.810331, lng: 90.412521 }}
                    onLocationChange={() => { }}
                    style={{ height: '100vh', width: '100%' }}
                />

                {stores?.length > 0 && stores?.map((store, index) => (
                    <div className='py-2 px-4 border rounded'>
                        <p className='mt-2'>Store {index + 1}</p>
                        <div className='mt-2'>Title: {store.title}</div>
                        <div className='mt-2'>Description: {store.description}</div>
                        <div className='mt-2'>Latitude: {store.lat}</div>
                        <div className='mt-2'>Longitude: {store.lng}</div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Index;
