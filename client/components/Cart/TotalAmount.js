import React from "react";
import OverviewCard from "../Utils/OverviewCard";
import CancelSvg from "../Svg/CancelSvg";

const TotalAmount = () => {
    return (
        <div className="max-w-[400px] h-[305px] p-2.5 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="max-w-[380px] h-[285px] p-[15px] bg-white rounded-2xl flex-col justify-start items-center gap-[38px] inline-flex">
                <div className="self-stretch h-[130px] flex-col justify-center items-start gap-[37px] flex">
                    <div className="self-stretch justify-between items-start gap-3 inline-flex">
                        <div className=" text-[16px] font-semibold capitalize">Total (1 Item):</div>
                        <div className="text-red-500 text-[24px] font-extrabold capitalize">US$ 43.50</div>
                    </div>
                    <div className="self-stretch h-[76px] flex-col justify-center items-center gap-2.5 flex">
                        <div className="self-stretch p-5 bg-red-500 rounded-lg justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-white text-[16px] font-bold capitalize leading-none">
                                Checkout
                            </div>
                        </div>
                        <div className="self-stretch text-center  text-[14px] font-normal capitalize">
                            All taxes and fees included
                        </div>
                    </div>
                </div>

                <OverviewCard
                    wFull="w-full"
                    icon={<CancelSvg />}
                    backgroundColor={"bg-orange-50"}
                    liteBg={"bg-red-200"}
                    title={"Free cancellation"}
                    subtitle={"Cancel up to 24 hours in advance for a full refund"}
                />
            </div>
        </div>
    );
};

export default TotalAmount;
