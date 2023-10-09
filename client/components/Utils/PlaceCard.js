import React from "react";
import NextImage from "./NextImage";

function PlaceCard({ item }) {
  return (
    <div className="relative w-full h-[212px] max-xs:w-full rounded-2xl overflow-hidden cursor-pointer">
    {item?.image && (
      <NextImage
        src={item?.image || "/images/placeholder.png"}
        alt="top-place"
        className="object-cover object-center"
        width={500}
      />
    )}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
       <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end px-4 pb-4">
         <h3 className="text-white text-lg font-semibold text-center">{item?.title}</h3>
         <p className="text-white text-sm text-center">{item?.short_desc}</p>
       </div>
     </div>
  );
}

export default PlaceCard;