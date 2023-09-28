import RedGiftBox from "@/components/Svg/RedGiftBox";
import React from "react";

const OrderSummary = () => {
    return (
        <div className="flex-col justify-end items-start gap-6 inline-flex">
            <div className="text-center  text-[18px] font-bold capitalize">Order Summary</div>
            <div className=" p-2.5 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-2.5 flex">
                {/* Two Order Summary Cards */}
                {[...Array(2)].map((_, i) => (
                    <div className="self-stretch  p-[15px] bg-white rounded-2xl flex-col justify-start items-center gap-[38px] flex">
                        <div className="self-stretch flex-col justify-center items-start gap-2.5 flex">
                            <div className="pb-2.5 justify-start items-start gap-3 inline-flex">
                                <img className="w-[66px] h-14 rounded-md" src="https://via.placeholder.com/66x56" />
                                <div className=" text-black text-[16px] font-semibold capitalize leading-relaxed">
                                    Green Line 24/48/72 hour Hop on hop off tour of Rome
                                </div>
                            </div>
                            <div className="self-stretch py-5 border-t border-b border-zinc-100 flex-col justify-start items-start gap-3 flex">
                                <div className=" justify-start items-center gap-2.5 inline-flex">
                                    <div className="w-5 h-5 relative" />
                                    <div className="grow shrink basis-0  text-[14px] font-medium capitalize">
                                        24h ride
                                    </div>
                                </div>
                                <div className=" justify-start items-center gap-2.5 inline-flex">
                                    <div className="w-5 h-5 relative" />
                                    <div className="grow shrink basis-0  text-[14px] font-medium capitalize">
                                        12 July 2023 at 10:00am
                                    </div>
                                </div>
                                <div className=" justify-start items-center gap-2.5 inline-flex">
                                    <div className="w-5 h-5 relative" />
                                    <div className="grow shrink basis-0  text-[14px] font-medium capitalize">
                                        12 July 2023 at 10:00am
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch justify-between items-center gap-3 inline-flex">
                                <div className=" text-[16px] font-extrabold capitalize">Price</div>
                                <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                    <div className=" text-[16px] font-extrabold capitalize">US$ 43.50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Promo Card} */}
                <div className="self-stretch  p-[15px] bg-white rounded-2xl flex-col justify-start items-start gap-3 flex">
                    <div className="self-stretch pt-5 pb-2.5 justify-start items-center gap-2.5 inline-flex">
                        <RedGiftBox />
                        <div className="text-red-500 text-[14px] font-medium capitalize">Enter Gift or Promo code</div>
                    </div>
                    <div className="self-stretch  flex-col justify-start items-start gap-5 flex">
                        <div className="self-stretch pt-5 bg-white border-t border-zinc-100 justify-between items-center gap-3 inline-flex">
                            <div className=" text-[16px] font-semibold capitalize">Subtotal</div>
                            <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                <div className="text-red-500 text-[24px] font-extrabold capitalize">US$ 43.50</div>
                                <div className="text-center  text-[12px] font-normal capitalize">
                                    All taxes and fees included
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch px-[15px] py-4 bg-orange-50 rounded-lg justify-start items-center gap-3 inline-flex">
                            <div className="w-10 h-10 p-[7px] bg-red-200 rounded-[30px] justify-center items-center flex">
                                <div className=" h-[26px] relative bg-red-500 rounded-2xl flex-col justify-start items-start flex" />
                            </div>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch  text-[14px] font-bold capitalize">Free cancellation</div>
                                <div className="self-stretch opacity-70  text-[14px] font-normal leading-snug">
                                    Cancel up to 24 hours in advance for a full refund
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
