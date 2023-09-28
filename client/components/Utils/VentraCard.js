import React from "react";

const VentraCard = ({ tour }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-xl font-semibold mb-2">{tour.title}</div>
            <div className="text-gray-600 mb-2">{tour.subtitle}</div>
            <div className="mb-4">
                <img
                    src={tour.coverImageUrl || "placeholder-image.jpg"}
                    alt={tour.title}
                    className="w-full h-auto rounded-lg"
                />
            </div>
            <div className="text-gray-800">
                <p>{tour.shortDescription || "No description available."}</p>
            </div>
            <div className="mt-4">
                <div className="text-lg font-semibold">Price:</div>
                {tour.options.map((option) => (
                    <div key={option.id} className="flex justify-between mb-2">
                        <span>{option.title}:</span>
                        {/* <span>{option.units[0]?.pricingFrom[2]?.net} GBP</span> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VentraCard;
