import React from "react";
import Container from "../Layout/Container";
import LocalProductCard from "../Utils/LocalProductCard";
import Link from "next/link";


function LocalProductsContainer({  products }) {
    return (
            <Container>
                <div className="flex flex-col gap-9 max-xs:gap-6">
                    <div className="flex flex-col gap-4 max-xs:gap-2">
                        <h3 className="text-4xl font-extrabold capitalize max-xs:text-2xl">
                            Explore Our Services
                        </h3>
                        <p className="text-lg max-xs:text-base">
                           This is the list of all the local products & services that we offer. We have a wide range of products & services that you can choose from.
                           So, what are you waiting for? Explore all the products & services that we offer and book your favorite one now.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-6 max-xs:grid-cols-1 max-xs:gap-4 grid-cols-service-cards">
                       {products?.map((item, index) => (
                            <LocalProductCard key={index} item={item} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href={"/services"}>
                            <button className="w-[200px] h-16 bg-slate-200 rounded-xl flex-col p-[5px]  gap-2.5 flex items-center justify-center">
                                <div className="bg-white h-full w-full rounded-xl transition-all duration-300 hover:shadow-[0_14px_54px_0px_rgba(87,29,11,0.2)] items-center gap-2.5 flex justify-center  text-lg font-medium capitalize">
                                    Explore all
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.5"
                                            d="M18.6667 16H5.33334"
                                            stroke="#FF4A4A"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            fillOpacity="round"
                                        />
                                        <path
                                            d="M24.7812 18.1366L23.4925 19.1517C21.4048 20.7964 20.3609 21.6186 19.5139 21.2436C18.6667 20.8685 18.6667 19.584 18.6667 17.0149V14.9848C18.6667 12.4157 18.6667 11.1312 19.5139 10.7561C20.3609 10.381 21.4048 11.2034 23.4925 12.848L24.7811 13.863C26.0381 14.8533 26.6667 15.3485 26.6667 15.9998C26.6667 16.6512 26.0381 17.1464 24.7812 18.1366Z"
                                            fill="#FF4A4A"
                                            stroke="#FF4A4A"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            fillOpacity="round"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
    );
}

export default LocalProductsContainer;
