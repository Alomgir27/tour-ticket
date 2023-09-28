import React from "react";
import CategoryTag from "../Utils/CategoryTag";
import { FavouriteFillSvg } from "../Svg/FavouriteFillSvg";

function SearchCard() {
    return (
        <div className="w-full relative hover:shadow border rounded-2xl flex flex-col md:flex-row overflow-hidden">
            <button className="absolute text-white text-xs font-bold capitalize leading-loose top-0 left-0 p-2 rounded-tl-2xl bg-red-500 justify-start items-start gap-2.5 flex">
                -15% OFF
            </button>
            <img className="w-full md:w-[300px]  rounded-tl-2xl  " src="https://via.placeholder.com/300x200" />

            <div className=" px-2.5 pt-2.5 pb-5 flex flex-col  gap-2.5 w-full">
                <div className=" flex flex-col gap-6">
                    <div className=" flex-col justify-start items-start gap-3 flex">
                        <div className="gap-4 flex items-center justify-between w-full">
                            <div className="gap-3 inline-flex">
                                <CategoryTag title={"Hop on hop off"} bgColor={"bg-red-100"} />
                                <CategoryTag title={"Green Line"} bgColor={"bg-green-400"} />
                            </div>
                            <FavouriteFillSvg />
                        </div>
                        <div className="  text-base font-semibold leading-normal">
                            Ticket valid for one run. No Hop Off.Ticket valid for one run. No HopTicket valid for one
                            run. No Hop
                        </div>
                    </div>
                    <div className="items-center font-medium gap-1 flex ">
                        <div className=" text-xs  leading-normal">1 Run</div>
                        <div className="leading-[0]">⦁</div>
                        <div className=" text-xs  leading-normal">Small Group</div>
                    </div>
                    <div className=" justify-start items-center gap-2.5 inline-flex">
                        <div className="text-red-500 text-2xl font-black leading-normal">€ 15.3</div>
                        <div className="grow shrink basis-0 opacity-50   font-medium line-through leading-normal">
                            € 17
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
