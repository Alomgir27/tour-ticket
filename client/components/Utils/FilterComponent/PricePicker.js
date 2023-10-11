import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PricePicker = ({ label,  lowerPirce, higherPirce, setLowerPirce, setHigherPrice }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3">
                <button
                    type="button"
                    onClick={toggleSection}
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    aria-controls="filter-time-2"
                    aria-expanded={isSectionOpen}
                >
                    <span className="font-medium text-gray-900">{label}</span>
                    <span className="ml-6 flex items-center">
                        {isSectionOpen ? (
                            <svg
                                className="h-5 w-5 fill-current text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5 fill-current text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                        )}
                    </span>
                </button>
            </h3>
            <div className={`${isSectionOpen ? "" : "hidden"}`} id="filter-time-2">
                <div className="pt-4" id="filter-time-2">
                    <div className="space-y-4">
                       <div className="flex items-center">
                          <input
                            type="number"
                            placeholder="Lower price"
                            className="w-full border border-gray-300 px-3 py-2 rounded-md mr-2"
                            value={lowerPirce}
                            onChange={(e) => setLowerPirce(e.target.value)}
                            />
                            <input
                            type="number"
                            placeholder="Higher price"
                            className="w-full border border-gray-300 px-3 py-2 rounded-md"
                            value={higherPirce}
                            onChange={(e) => setHigherPrice(e.target.value)}
                            />
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricePicker;
