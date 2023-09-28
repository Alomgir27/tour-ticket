import React from "react";

const PersonalForm = () => {
    return (
        <div className="w-full pb-6 border-b border-zinc-100 flex-col justify-start items-center gap-6 flex">
            <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-between items-center gap-6 flex">
                    <div className="grow shrink basis-0 text-black text-[20px] font-semibold">Personal Info</div>
                </div>
                <div className="self-stretch justify-start items-start gap-6 flex flex-wrap">
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">First name *</div>
                        <input
                            placeholder="Enter your first name"
                            type="text"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                        />
                    </div>
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Last Name*</div>
                        <input
                            placeholder="Enter your last name"
                            type="text"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                        />
                    </div>
                </div>
                <div className="self-stretch justify-start items-start gap-6 flex flex-wrap">
                    <div className="grow shrink basis-[310px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Phone Number</div>
                        <div className="self-stretch justify-start items-start gap-2.5 flex">
                            <div className="h-12 p-[15px] bg-white rounded-md border border-zinc-100 justify-center items-center gap-2.5 flex">
                                <div className="justify-start items-center gap-2.5 flex">
                                    <img
                                        className="w-[28.80px] h-[18px] rounded-sm"
                                        src="https://via.placeholder.com/29x18"
                                    />
                                    <div className="">+1</div>
                                </div>
                            </div>
                            <input
                                placeholder="1XXX XXX XXX"
                                className="grow shrink  h-12 px-5 bg-white rounded-md border placeholder:/50 border-zinc-100 justify-start items-start gap-2.5 flex"
                            />
                        </div>
                    </div>
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Email Address*</div>
                        <input
                            placeholder="Enter your email address"
                            type="email"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                        />
                    </div>
                </div>
            </div>
            <button className="px-[50px] py-3.5 bg-red-500 rounded-md justify-center items-center gap-2.5 flex text-center text-white capitalize leading-none">
                Next
            </button>
        </div>
    );
};

export default PersonalForm;
