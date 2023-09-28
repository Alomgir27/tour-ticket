import useDataFromBokun from "@/hooks/useDataFromBokun";
import React from "react";
import { useEffect } from "react";
import PriceTag from "./PriceTag";

const TourList = ({ tours }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
};

const TourCard = ({ tour }) => {
    const { id } = tour;
    const apiData = useDataFromBokun(`/product-list.json/${id}?currency=ISK&lang=EN`);
    const activityId = apiData?.items[0].activity.id;

    return (
        <div className="max-w-xs mx-4 my-4 bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={tour.keyPhoto.derived[1].url} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h3>
                {/* <p className="text-gray-600 text-sm mb-2">{tour.description}</p> */}
                {/* dangerously inject html element */}
                <div dangerouslySetInnerHTML={{ __html: tour.description }}></div>
                <PriceTag activityId={activityId} />
            </div>
        </div>
    );
};

export default TourList;
