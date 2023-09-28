import React from "react";
import { TickmarkSvg } from "../Svg/TickmarkSvg";

const SelectDeselectAll = () => {
    return (
        <div className=" h-12 px-5 py-3.5 bg-white rounded-md border border-zinc-100 justify-between items-center gap-[13px] inline-flex">
            <div className="justify-start items-center gap-[13px] flex">
                <TickmarkSvg />
                <div className=" text-[16px] font-bold capitalize">Select all Items</div>
            </div>
            <div className=" text-[14px] font-normal capitalize">Deselect All</div>
        </div>
    );
};

export default SelectDeselectAll;
