import React from "react";
import { useRouter } from "next/router";


export default function failed() {
    const router = useRouter();

    return (
        <div className="h-fit p-2.5 bg-red-200 mx-10 my-10 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex px-10 py-10">
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[20px] font-semibold capitalize">Order Summary</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[20px] font-semibold capitalize">Order Failed</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[20px] font-semibold capitalize">Please try again</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[20px] font-semibold capitalize">Order Id: {router?.query?.id}</div>
            </div>
            <button className="h-11 px-5 py-4 bg-red-500 rounded-lg border border-red-500 justify-center items-center gap-2.5 flex text-white font-bold leading-none" onClick={() => router.push(`/checkout/${router?.query?.id}?${router?.asPath?.split('?')[1]}`)}>
                Try Again
            </button>
        </div>
    )
}