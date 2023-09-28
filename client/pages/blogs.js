import Container from "@/components/Layout/Container";
import BlogCard from "@/components/Utils/BlogCard";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import CategoryCard from "@/components/Utils/CategoryCard";
import Pagination from "@/components/Utils/Pagination";
import SelectAndSearchBar from "@/components/expolore-all/SelectAndSearchBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const blogs = () => {
    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb />
                <div className="text-2xl font-bold capitalize leading-normal mt-8 mb-3">
                    Expanding Our Knowledge & Yours, One Blog at a Time
                </div>
                <p className="mb-5">All the latest news and events of our creative team.</p>
                <div className="mb-5">
                    <SelectAndSearchBar />
                </div>

                {/* TODO: API for Blogs Cards */}
                <div className="grid grid-cols-service-cards gap-5">
                    {[...Array(10)].map((_, item) => (
                        <BlogCard key={item} img={"blog1.png"} />
                    ))}
                </div>
                <div className="flex items-center justify-center mb-[100px] mt-[58px]">
                    <Pagination />
                </div>
            </Container>
        </div>
    );
};

export default blogs;
