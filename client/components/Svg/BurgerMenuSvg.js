import React from "react";

const BurgerMenuSvg = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame">
        <path
          id="Vector"
          d="M3.75 6.75H20.25M3.75 12H20.25M3.75 17.25H20.25"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          fillOpacity="round"
        />
      </g>
    </svg>
  );
};

export default BurgerMenuSvg;
