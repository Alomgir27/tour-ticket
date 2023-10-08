import React, { useState, useEffect } from "react";
import Container from "../Layout/Container";
import CategoryCard from "../Utils/CategoryCard";
import CategoryCardTitle from "./CategoryCardTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";


function CategoryCardContainer({ withBg, title, subtitle, products, onDestinationChange }) {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className={`${withBg ? "bg-slate-100" : ""} py-16 max-xs:py-10`}>
            <Container>
                <div className="flex flex-col gap-9 max-xs:gap-6">
                    <CategoryCardTitle withBg={withBg} title={title} subtitle={subtitle}  onDestinationChange={onDestinationChange} />
                    {/* show 4 */}
                    <div className="grid grid-cols-4 gap-6 max-xs:grid-cols-1 max-xs:gap-4 grid-cols-service-cards">
                        {products?.slice(0, showAll ? products?.length : 8).map((item, index) => {
                            const netPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].net;
                            const retailPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].retail;
                            const discount = Math.round(((retailPrice - netPrice) / retailPrice) * 100);

                            return (
                                <CategoryCard
                                    key={item.internalName}
                                    link={`/services/${item?.id}`}
                                    img={item?.coverImageUrl ? item?.coverImageUrl : item?.bannerImageUrl ? item?.bannerImageUrl : item?.galleryImages?.[0]?.url ?? ""}
                                    title={item?.title}
                                    price={retailPrice}
                                    actual_price={netPrice}
                                    discount={Math.abs(discount)}
                                    tags={item?.subtitle}
                                />
                            );
                        })}
                    </div>
                    {/* <div className="max-w-screen-lg mx-auto max-xs:hidden">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={4}
                            spaceBetween={10}
                            navigation
                            className="mySwiper"
                        >
                            { products?.slice(8).map((item, index) => (
                                    <SwiperSlide>
                                        <CategoryCard
                                            key={item.internalName}
                                            link="/details"
                                            img={item?.coverImageUrl ? item?.coverImageUrl : item?.bannerImageUrl ? item?.bannerImageUrl : item?.galleryImages?.[0]?.url ?? ""}
                                            title={item?.title}
                                            price={item?.price}
                                            actual_price={item?.actual_price}
                                            discount={item?.discount}
                                            tags={item?.tags}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div> */}
                    <div className="flex items-center justify-center">
                        {/* <Link href={"/services"} onClick={() => setShowAll(true)}> */}
                            <button className="w-[200px] h-16 bg-slate-200 rounded-xl flex-col p-[5px]  gap-2.5 flex items-center justify-center" onClick={() => setShowAll(!showAll) }>
                                <div className="bg-white h-full w-full rounded-xl transition-all duration-300 hover:shadow-[0_14px_54px_0px_rgba(87,29,11,0.2)] items-center gap-2.5 flex justify-center  text-lg font-medium capitalize">
                                    {showAll ? "Show Less" : "Show All"}
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
                        {/* </Link> */}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryCardContainer;
