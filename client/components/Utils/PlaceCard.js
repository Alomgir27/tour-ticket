import React from "react";

function PlaceCard() {
  return (
    <div className="w-full h-[212px] flex-col justify-end flex relative max-xs:rounded-2xl rounded-[20px] max-xs:w-full">
      <img
        className="w-full h-[212px] max-xs:w-full"
        src="/assets/top-place/top-place1.png"
        alt=""
      />
      <div className="absolute w-full max-xs:px-3 max-xs:py-3 px-[21px] py-[23px] bg-gradient-to-t from-black via-black/70 to-black/0 rounded-bl-2xl rounded-br-2xl flex-col gap-0.5 flex">
        <div className="text-white text-lg font-bold capitalize">
          Title of the Place name
        </div>
        <div className="opacity-60 text-white font-light capitalize">
          subtitle this beauty of place
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
