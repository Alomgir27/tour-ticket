import useDataFromBokun from "@/hooks/useDataFromBokun";
import React from "react";
import Loading from "../Utils/Loading";
import { useEffect } from "react";
import { useState } from "react";

const PriceTag = ({ activityId }) => {
    const [actId, setActId] = useState(null);
    useEffect(() => {
        // If activityId is not available, set it to 0
        if (!activityId) {
            setActId(null);
        } else {
            setActId(activityId);
        }
    }, [activityId]);
    console.log(actId);
    const apiDataActivities = useDataFromBokun(`/activity.json/${actId}/price-list`);
    console.log(apiDataActivities);

    if (apiDataActivities) {
        return <PriceList prices={apiDataActivities} />;
    } else {
        return (
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
            </div>
        );
    }
};

const PriceList = ({ prices }) => {
    return (
        <div className="container mx-auto mt-8">
            {prices?.pricesByDateRange.map((price, index) => (
                <PriceCard key={index} dateRange={price} rates={price.rates} />
            ))}
        </div>
    );
};

const PriceCard = ({ dateRange, rates }) => {
    const { from, to } = dateRange;
    const rate = rates[0]; // Assuming there is only one rate per date range

    return (
        <div className="max-w-md mx-auto my-4 bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Price for {from} to {to}
                </h3>
                {rate.passengers.map((passenger) => (
                    <div key={passenger.pricingCategoryId} className="mb-2">
                        <p className="text-gray-600">{passenger.title}</p>
                        <p className="text-2xl font-semibold text-indigo-600">
                            {passenger.price.amount} {passenger.price.currency}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriceTag;
