import React from "react";
import OverviewCard from "../Utils/OverviewCard";
import CancelSvg from "../Svg/CancelSvg";
import Link from "next/link";

function CheckAvailabilityCard({ price, actual_price, discount }) {
    return (
        <div className="sticky top-8 max-w-[400px] lg:w-[400px] h-fit p-2.5 bg-slate-100 rounded-lg flex-col justify-start items-start inline-flex ">
            <div className="h-fit p-3 bg-white rounded-lg flex-col justify-start items-center gap-8 flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <div className="leading-none">
                            <span className=" text-slate-800 text-base font-semibold leading-none capitalize">
                                From{" "}
                            </span>
                            <span className="text-slate-800 text-opacity-40 text-base leading-none font-normal line-through capitalize">
                                US$ {price}
                            </span>

                        </div>
                        <div className="text-red-500 text-2xl font-extrabold leading-none capitalize">
                            US$ {actual_price}
                        </div>
                        <div className="capitalize text-base leading-none">Per person</div>
                        <p className="text-slate-800 text-base font-semibold leading-none capitalize">
                            Save {discount}%{" "}
                        </p>
                    </div>
                    <div className=" transition-colors bg-red-500 hover:shadow-red-100 hover:shadow-lg rounded-lg justify-center items-center cursor-pointer">
                        <Link
                            scroll={false}
                            href="#package_options"
                            className="px-2 md:px-4 py-4 md:py-5 inline-block text-center text-base text-white font-medium capitalize leading-none scroll-smooth"
                        >
                            Check availability
                        </Link>
                    </div>
                </div>
                <OverviewCard
                    icon={<CancelSvg />}
                    wFull="w-full"
                    backgroundColor={"bg-red-50"}
                    liteBg={"bg-red-200"}
                    title={"Free cancellation"}
                    subtitle={"Cancel up to 24 hours in advance for a full refund"}
                />
            </div>
        </div>
    );
}

export default CheckAvailabilityCard;
