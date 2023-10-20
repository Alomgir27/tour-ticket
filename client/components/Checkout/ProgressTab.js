import React from "react";

const ProgressTab = ({ step, setStep }) => {

    return (
        <div className="w-full h-[62px] px-5 py-3.5 bg-white rounded-md border border-zinc-100 justify-center items-center gap-[13px] inline-flex">
            <div className="w-[237px] h-[34px] relative">
                <div className={`w-[133px] h-[0px] left-[48px] top-[10px] absolute opacity-40 border ${step === 1 ? "border-slate-800" : "border-red-500"}`} />
                <div className={`w-[75px] h-[34px] left-0 top-0 absolute flex-col justify-center items-center gap-[5px] inline-flex ${step === 1 ? "opacity-100" : ""}`} onClick={() => setStep(1)}>
                    <div className="w-5 h-5 relative">
                        <div className={`w-5 h-5 left-0 top-0 absolute bg-white rounded-full border ${step === 1 ? "border-slate-800" : "border-red-500"}`} />
                        <div className={`w-3 h-3 left-[4px] top-[4px] absolute rounded-full border border-red-500 ${step === 1 ? "bg-red-500" : ""}`} />
                    </div>
                    <div className="text-center text-red-500 text-[12px] font-medium capitalize mt-2">Personal Info</div>
                </div>
                <div className={`w-[93px] h-[34px] left-[144px] top-0 absolute opacity-40 flex-col justify-center items-center gap-[5px] inline-flex ${step === 2 ? "opacity-100" : ""}`}>
                    <div className="w-5 h-5 relative">
                        <div className={`w-5 h-5 left-0 top-0 absolute bg-white rounded-full border ${step === 2 ? "border-slate-800" : "border-red-500"}`} />
                        <div className={`w-3 h-3 left-[4px] top-[4px] absolute rounded-full border border-red-500 ${step === 2 ? "bg-red-500" : ""}`} />
                    </div>
                    <div className={`text-center  text-[12px] font-medium capitalize mt-2 ${step === 2 ? "text-red-500" : "text-slate-800"}`}>Payment Details</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressTab;
