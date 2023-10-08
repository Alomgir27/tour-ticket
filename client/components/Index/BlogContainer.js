import React from "react";
import Container from "../Layout/Container";
import CategoryCardTitle from "./CategoryCardTitle";
import BlogCard from "../Utils/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation } from "swiper/modules";

function BlogContainer({ blogs, title, subtitle }) {
    return (
        <div className={`bg-slate-100 py-16 max-xs:py-10`}>
            <Container>
                    <CategoryCardTitle title={title} subtitle={subtitle} />

                    <div className="max-w-screen-lg mx-auto max-xs:hidden mb-10 mt-5">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={3}
                            spaceBetween={10}
                            navigation
                            className="mySwiper"
                        >
                            {blogs?.map((item, index) => (
                                <SwiperSlide>
                                    <BlogCard key={index} item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    
                    {/* <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-xs:hidden">
                        {blogs?.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </div> */}

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
            </Container>
        </div>
    );
}

export default BlogContainer;
