import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import CategoryCard from "@/components/Utils/CategoryCard";
import Loading from "@/components/Utils/Loading";
import Pagination from "@/components/Utils/Pagination";
import SelectAndSearchBar from "@/components/expolore-all/SelectAndSearchBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const services = () => {
    const router = useRouter();
    const pageNumber = router.query.page || 1;

    // If page is not found

    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb />
                <div className="text-2xl font-bold capitalize leading-normal mt-8 mb-3">Hop on hop off</div>
                <p className="mb-5">Discover Rome on the Open Bus</p>
                <div className="mb-5">
                    <SelectAndSearchBar />
                </div>
                {/* TODO: API for Service Cards */}
                <div className="grid grid-cols-service-cards gap-5">
                    {/* {serviceList?.map((item, index) => {
                        return (
                            <CategoryCard
                                key={index}
                                link={`/services/${item?.id}`}
                                img={item?.images}
                                title={item?.title}
                                price={item?.price}
                                actual_price={item?.actual_price}
                                discount={item?.discount}
                                tags={item?.tags}
                            />
                        );
                    })} */}
                </div>
                <div className="flex items-center justify-center mb-[100px] mt-[58px]">
                    {/* <Pagination paginationOptions={paginationOptions} /> */}
                </div>
            </Container>
        </div>
    );
};

export default services;
