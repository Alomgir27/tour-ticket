import React from "react";

function CategoryTag({ title, bgColor }) {
    return (
        <button
            className={`${bgColor} px-1 md:px-2.5 py-[5px] rounded-sm  gap-2.5 flex  text-xs font-medium uppercase leading-3 w-fit`}
        >
            {title?.slice(0, 30)}
        </button>
    );
}

export default CategoryTag;
