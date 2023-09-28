import React from "react";

function SearchSvg({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 17.5L22 22"
        stroke="#2A2C3E"
        strokeWidth="1.5"
        strokeLinecap="round"
        fillOpacity="round"
      />
      <path
        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
        stroke="#2A2C3E"
        strokeWidth="1.5"
        fillOpacity="round"
      />
    </svg>
  );
}

export default SearchSvg;
