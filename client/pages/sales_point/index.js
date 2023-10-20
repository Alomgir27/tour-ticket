import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
    ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false,
});
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { ApiBaseMysql } from '@/Helper/ApiBase';
import { useRouter } from 'next/router';
const SalePoints = () => {
    const [stores, setStores] = useState([]);
    const router = useRouter();
    //dhaka
    const [center, setCenter] = useState([23.8103, 90.4125]);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${ApiBaseMysql}/store`);
                setStores(res.data?.data);
                console.log(res.data?.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        //if page refreshes, it will get the current location from the browser
        if (router.asPath === '/sales_point') {
            router.push(router.asPath);
        }

    }, []);




    return (
        <div className="flex flex-row gap-10 sm:gap-16 md:gap-12">
            <div className="w-[80%] h-full p-4 rounded flex-col justify-center items-center gap-6 inline-flex" id="payment-form" >
                <MapContainer
                    center={center}
                    zoom={8}
                    style={{ height: '100vh', width: '100%' }}
                    doubleClickZoom={true}
                >
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                        attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
                        id="mapbox/streets-v11" // Replace with your Mapbox style ID
                        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} // Your Mapbox access token
                        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        mapboxApiUrl={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
                        mapStyle={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}


                    />
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
                </MapContainer>
            </div>
            <div className="w-[20%]  p-4 rounded bg-[#F5F5F5] flex-col justify-center items-center h-[816px] overflow-y-scroll scrollbar-y-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200" id="payment-form" >
                {stores && stores?.map((store, index) => (
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5 " key={index}>
                        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="" className="w-10 h-10 rounded-full" />
                        <a href="#">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{store.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{store.address}</p>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{store.description}</p>
                        <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
                            See our guideline
                            <svg class="w-3 h-3 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                            </svg>
                        </a>
                    </div>



                ))}
            </div>

        </div>
    );
};

export default SalePoints;
