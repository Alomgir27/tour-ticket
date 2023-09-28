import React from "react";
import CheckmarkSvg from "../Svg/CheckmarkSvg";

function IconList({ title }) {
    return (
        <p className="flex items-center ">
            <span className="text-green-500 mr-2">
                <CheckmarkSvg />
            </span>
            {title}
        </p>
    );
}

export default IconList;
