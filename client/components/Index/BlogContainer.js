import React from "react";
import Container from "../Layout/Container";
import CategoryCardTitle from "./CategoryCardTitle";
import BlogCard from "../Utils/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

function BlogContainer({ title, subtitle }) {
    return (
        <div className={`bg-slate-100 py-16`}>
            <Container>
                <div className="flex flex-col gap-9">
                    <CategoryCardTitle title={title} subtitle={subtitle} />
                    {/* <div className="xs:hidden">
                        <Swiper
                            slidesPerView={1.15}
                            spaceBetween={"20"}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <BlogCard img={"blog1.png"} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlogCard img={"blog2.png"} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlogCard img={"blog3.png"} />
                            </SwiperSlide>
                        </Swiper>
                    </div> */}
                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-xs:hidden">
                        <BlogCard img={"blog1.png"} />
                        <BlogCard img={"blog2.png"} />
                        <BlogCard img={"blog3.png"} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default BlogContainer;
