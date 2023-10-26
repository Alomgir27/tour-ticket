import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ApiBase } from "@/Helper/ApiBase";
import axios from "axios";
import { Capabilities } from "@/Helper/ApiBase";
import { ApiAuth } from "@/Helper/ApiBase";
import moment from "moment";

const success = () => {
    const router = useRouter();
    const [object, setObject] = useState({});

    useEffect(() => {
        if (!router?.query?.id) return;
        (async () => {
            try {
                const res = await axios.get(`${ApiBase}/bookings/${router.query.id}`, {
                    headers: {
                        'Authorization': `Bearer ${ApiAuth}`,
                        "Content-Type": "application/json",
                        "Octo-Capabilities": Capabilities,
                    },
                });
                setObject(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [router?.query?.id]);

    const handleDownloadPDF = async () => {
        let url = object?.voucher?.deliveryOptions[2].deliveryValue;
        if (!url) return;
        await axios.get(url, {
            headers: {
                Accept: "application/pdf",
            },
            responseType: "blob",
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: "application/pdf" });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = `voucher-${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}.pdf`;
                link.click();
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className="h-fit p-2.5 bg-green-300 mx-10 my-10 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex px-10 py-10">
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[20px] font-semibold capitalize">Order Summary</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Order Number: {object?.id}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Order Date: {moment(object?.utcCreatedAt).format("DD MMM YYYY hh:mm A")}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Order Status: {object?.status}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Payment Status: Success</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Payment Method: {object?.voucher?.redemptionMethod}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Payment Date: {moment(object?.utcConfirmedAt).format("DD MMM YYYY hh:mm A")}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Number of Tickets: {object?.unitItems?.length}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <div className=" text-black text-[16px] font-semibold capitalize">Payment Amount: {object?.pricing?.retail}</div>
            </div>
            <p className="self-stretch justify-start items-start gap-2.5 flex text-[#4F4F4F] text-[16px] font-semibold capitalize border-t border-b border-zinc-100 py-5 px-0">
                Your order has been successfully placed. Please check your email for the voucher.
            </p>
            <div className="self-stretch justify-start items-start gap-2.5 flex">
                <button className="w-full h-12 bg-orange-100 rounded-md justify-center items-center gap-2.5 flex" onClick={() => handleDownloadPDF()}>
                    <div className=" text-black text-[16px] font-semibold capitalize">Download PDF</div>
                </button>
            </div>
        </div>
    );
}

export default success;




