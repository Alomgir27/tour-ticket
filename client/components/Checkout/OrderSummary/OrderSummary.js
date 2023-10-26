import RedGiftBox from "@/components/Svg/RedGiftBox";
import React from "react";
import moment from "moment";
import NextImage from "@/components/Utils/NextImage";

const OrderSummary = ({ product, data, isVentrata }) => {
    return (
        <div className="flex-col justify-end items-start gap-6 inline-flex">
            <div className="text-center  text-[18px] font-bold capitalize">Order Summary</div>
            <div className=" p-2.5 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-2.5 flex">
                {/* Two Order Summary Cards */}
                <div className="self-stretch  p-[15px] bg-white rounded-2xl flex-col justify-start items-center gap-[38px] flex min-w-[416px]">
                    <div className="self-stretch flex-col justify-center items-start gap-2.5 flex">
                        <div className="self-stretch justify-between items-center gap-3 inline-flex">
                            {isVentrata && product?.option?.coverImageUrl && (
                                <img className="w-full h-[100px] rounded-2xl object-cover object-center flex-shrink-0" src={product.option?.coverImageUrl || "/assets/placeholder.png"}
                                    alt="product" />
                            )}
                            {!isVentrata && product?.images && (
                                <NextImage className="w-full h-[100px] rounded-2xl object-cover object-center flex-shrink-0 min-w-[400px]" src={product.images || "/assets/placeholder.png"}
                                    alt="product" />
                            )}
                            <div className=" text-black text-[16px] font-semibold capitalize leading-relaxed">

                            </div>
                        </div>
                        <div className="self-stretch py-5 border-t border-b border-zinc-100 flex-col justify-start items-start gap-3 flex">
                            {data && data.info && data.info.map((info, index) => (
                                <div key={index} className="self-stretch justify-between items-center gap-3 inline-flex">
                                    <div className=" text-[16px] font-semibold capitalize">{info.type}</div>
                                    <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                        <div className=" text-[16px] font-semibold capitalize">{info.quantity} x US$ {info.price}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="self-stretch justify-between items-center gap-3 inline-flex">
                                <div className=" text-[16px] font-semibold capitalize">Total</div>
                                <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                    <div className=" text-[16px] font-semibold capitalize">US$ {data?.totalPrice}</div>
                                </div>
                            </div>
                            <div className="self-stretch justify-between items-center gap-3 inline-flex">
                                <div className=" text-[16px] font-semibold capitalize">Discount</div>
                                <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                    <div className=" text-[16px] font-semibold capitalize">US$ {data?.discount || 0}</div>
                                </div>
                            </div>
                            <div className="self-stretch justify-between items-center gap-3 inline-flex">
                                <div className=" text-[16px] font-semibold capitalize">Tax</div>
                                <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                    <div className=" text-[16px] font-semibold capitalize">US$ {product?.pricing?.retail - data?.totalPrice}</div>
                                </div>
                            </div>
                            {/* <div className=" justify-start items-center gap-2.5 inline-flex">
                                <div className="w-5 h-5 relative" />
                                <div className="grow shrink basis-0  text-[14px] font-medium capitalize">
                                    12 July 2023 at 10:00am
                                </div>
                            </div> */}
                        </div>
                        <div className="self-stretch justify-between items-center gap-3 inline-flex">
                            <div className=" text-[16px] font-extrabold capitalize">Price</div>
                            <div className="flex-col justify-center items-end gap-2.5 inline-flex">
                                <div className=" text-[16px] font-extrabold capitalize">US$ {product?.pricing?.retail}</div>
                            </div>
                        </div>
                        <div className="self-stretch justify-center items-center gap-3 inline-flex border-t border-zinc-100">
                            <div className="w-5 h-5 relative" />
                            <div className="grow shrink basis-0  text-[14px] font-medium capitalize text-slate-800 mt-5">
                                {moment(data?.id).format("DD MMM YYYY")} at {moment(data?.id).format("hh:mm a")}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promo Card} */}
                {/* <div className="self-stretch  p-[15px] bg-white rounded-2xl flex-col justify-start items-start gap-3 flex">
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
                </div> */}
            </div>
        </div>
    );
};

export default OrderSummary;
