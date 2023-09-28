import React from "react";

const SelectDateCard = ({onClick, title, active, rounded = "rounded-full", px = "px-5", py = "py-2.5", width = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`grow ${px} ${py} ${width} text-center capitalize leading-none ${rounded} ${
                active ? "bg-red-500 text-white font-medium" : "border border-zinc-100 bg-white"
            }  justify-center items-center gap-2.5 flex`}
        >
            {title}
        </button>
    );
};

export default SelectDateCard;
