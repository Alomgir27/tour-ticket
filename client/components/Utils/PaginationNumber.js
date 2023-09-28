import React from "react";

const PaginationNumber = ({ children, active = false, ...props }) => {
    return (
        <button
            {...props}
            className={`px-3.5 py-[9px] rounded shadow flex-col justify-center items-center inline-flex ${
                active && "bg-red-500 text-white"
            }`}
        >
            <div className="w-4 text-center  text-[16px] font-normal leading-none">{children}</div>
        </button>
    );
};

export default PaginationNumber;
