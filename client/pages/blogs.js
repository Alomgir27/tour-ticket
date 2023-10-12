import React, { useEffect, useState } from "react";
import Container from "@/components/Layout/Container";
import BlogCard from "@/components/Utils/BlogCard";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import Pagination from "@/components/Utils/Pagination";
import SelectAndSearchBar from "@/components/expolore-all/SelectAndSearchBar";
import { fetchBlogs } from "@/App/Repositories/Blogs/GetBlogs";
import { useRouter } from "next/router";

const blogs = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    useEffect(() => {
        const params = {    
            search: search  
        }
        fetchBlogs(params).then((data) => {
            console.log(data);
            setBlogs(data?.data?.data);
            setTotalPages(data?.data?.last_page);
            setTotalItems(data?.data?.total);
        }
        );
    }
        , [router.asPath]);

    useEffect(() => {
        const params = {
            search: search,
            page: page
        }
        const queryString = new URLSearchParams(params).toString();
        router.push({
            pathname: router.pathname,
            query: queryString
        });
    }, [page]);

    const paginationOptions = {
        totalPages: totalPages,
        totalItems: totalItems,
        page: page,
        setPage: setPage,
    };


    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb path={router.asPath} />
                <div className="text-2xl font-bold capitalize leading-normal mt-8 mb-3">
                    Expanding Our Knowledge & Yours, One Blog at a Time
                </div>
                <p className="mb-5">All the latest news and events of our creative team.</p>
                <div className="mb-5">
                    <SelectAndSearchBar search={search} setSearch={setSearch} />
                </div>

                {/* TODO: API for Blogs Cards */}
                <div className="grid grid-cols-service-cards gap-5">
                    {blogs?.map((item) => (
                        <BlogCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex items-center justify-center mb-[100px] mt-[58px]">
                    <Pagination {...paginationOptions} />
                </div>
            </Container>
        </div>
    );
};

export default blogs;
