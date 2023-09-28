import React from "react";
import { CalendarSvg } from "../Svg/CalendarSvg";
import { TickmarkSvg } from "../Svg/TickmarkSvg";

const ProductCart = () => {
    return (
        <div className=" flex-col justify-start items-center inline-flex">
            <div className="w-full pt-5 bg-white rounded-t-lg border-x border-t border-zinc-100 self-stretch px-5 justify-start items-start gap-6 inline-flex pb-[30px]">
                <TickmarkSvg />
                <div className="grow shrink basis-0 justify-start items-start gap-[26px] flex flex-col sm:flex-row">
                    <img className="w-[125px] h-[90px] rounded-lg" src="https://via.placeholder.com/125x90" />

                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
                        <div className="self-stretch  text-[18px] font-bold leading-normal">
                            Green Line 24/48/72 hour Hop on hop off tour of Rome
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
                            <div className=" text-sm font-normal leading-snug">1 Adult (Age 16 - 99)</div>
                            <div className=" text-sm font-normal leading-snug">24 hour pass</div>
                            <div className=" text-sm font-normal leading-snug">23 June</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full rounded-b-lg self-stretch px-5 py-[15px] border border-zinc-100 justify-between items-end inline-flex">
                <div className="justify-start items-center gap-2.5 flex flex-wrap">
                    <CalendarSvg />
                    <div className=" text-sm font-medium capitalize leading-loose">12/15/2023</div>
                    <div className="text-red-500 text-sm font-medium capitalize leading-loose">
                        Edit Date and Quantity
                    </div>
                </div>
                <div className=" font-semibold leading-relaxed">US $8.65</div>
            </div>
        </div>
    );
};

export default ProductCart;
