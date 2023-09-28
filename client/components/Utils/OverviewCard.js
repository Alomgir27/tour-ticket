import React from "react";

function OverviewCard({ title, subtitle, liteBg, backgroundColor, icon, wFull = "max-w-[400px]" }) {
    return (
        <div className={`${wFull}  p-4 rounded-lg justify-start items-center gap-3 flex ${backgroundColor}`}>
            <div className={`w-10 h-10 p-2 rounded-full justify-center items-center flex ${liteBg}`}>{icon}</div>
            <div className="flex-col gap-0.5 flex">
                <div className=" text-slate-800 text-base font-semibold capitaliz">{title}</div>
                <div className=" opacity-70 text-slate-800 text-sm font-normal leading-snug">{subtitle}</div>
            </div>
        </div>
    );
}

export default OverviewCard;

// max-w-[400px] min-w-[400px]
// ${wFull}
