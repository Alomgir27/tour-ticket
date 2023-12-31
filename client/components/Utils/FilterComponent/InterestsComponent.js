// components/FilterComponent.js
import React, { useState } from "react";

const InterestsComponent = () => {
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
                    aria-controls="filter-interests-2"
                    aria-expanded={isSectionOpen}
                >
                    <span className="font-medium text-gray-900">Interests</span>
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
            <div className={`${isSectionOpen ? "" : "hidden"}`} id="filter-interests-2">
                <div className="pt-4" id="filter-interests-2">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                id="filter-interests-0"
                                name="interests[]"
                                value="2l"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-0" className="ml-3 text-sm text-gray-600">
                                Local Culture
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="filter-interests-1"
                                name="interests[]"
                                value="6l"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-1" className="ml-3 text-sm text-gray-600">
                                Outdoor
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="filter-interests-2"
                                name="interests[]"
                                value="12l"
                                type="checkbox"
                                checked
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-2" className="ml-3 text-sm text-gray-600">
                                Nature
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="filter-interests-3"
                                name="interests[]"
                                value="18l"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-3" className="ml-3 text-sm text-gray-600">
                                Architechture
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="filter-interests-4"
                                name="interests[]"
                                value="20l"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-4" className="ml-3 text-sm text-gray-600">
                                City Sightseeing
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="filter-interests-5"
                                name="interests[]"
                                value="40l"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label for="filter-interests-5" className="ml-3 text-sm text-gray-600">
                                Photography
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterestsComponent;
