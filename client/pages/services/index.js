import React, { useState, useEffect } from "react";
import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import CategoryCard from "@/components/Utils/CategoryCard";
import Loading from "@/components/Utils/Loading";
import Pagination from "@/components/Utils/Pagination";
import { useRouter } from "next/router";
import { useGetServices } from "@/App/Repositories/Services/GetServices";
import { useGetCategories } from "@/App/Repositories/Categories/GetCategories";
import TextInput from "@/components/Utils/TextInput";
import LocalProductCard from "@/components/Utils/LocalProductCard";


const services = () => {
    const router = useRouter();
    const pageNumber = router.query.page || 1;
    const [search, setSearch] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [venTraTaProducts, setVenTraTaProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const { data: serviceData, isLoading: serviceLoading, isError: serviceError, venTraTaProducts: venTraProducts  } = useGetServices(page,  destinationId, categoryId);
    const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useGetCategories();

    useEffect(() => {
        if (serviceData) {
            setServiceList(serviceData?.data?.data);
            setTotalPages(serviceData?.data?.last_page);
            setTotalItems(serviceData?.data?.total);
        }
    }, [serviceData]);

    useEffect(() => {
        if (venTraProducts) {
            setVenTraTaProducts(venTraProducts);
        }
    },
        [venTraProducts]
    );

    useEffect(() => {
        if (categoryData) {
            let destinationList = [];
            categoryData?.map((item) => {
                 destinationList = [...destinationList, ...item?.destinations];
            });
            let categoryList = [];
            categoryData?.map((item) => {
                item?.destinations.map((destination) => {
                     categoryList = [...categoryList, ...destination.categories];
                });
            });
           
            setDestinationList(destinationList);
            setCategoryList(categoryList);
        }
    }, [categoryData]);

    useEffect(() => {
        setIsLoading(serviceLoading || categoryLoading);
    }, [serviceLoading, categoryLoading]);


    const paginationOptions = {
        totalPages: totalPages,
        totalItems: totalItems,
        currentPage: page,
        setPage: setPage,
    };

    const handleCategory = (e) => {
        setCategoryId(e.target.value);
    }

    const handleDestination = (e) => {
        setDestinationId(e.target.value);
    }

    if (isLoading) return <Loading />;
    if (serviceError || categoryError) return <div>Something went wrong</div>;

    return (
        <Container>
            <BreadCrumb path={router.asPath} />
            <div className="flex flex-col md:flex-row mt-8">
                <div className="w-full md:w-1/4">
                    <div className="mb-4">
                       <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" onChange={handleDestination}>
                            <option value="" selected>All Destinations</option>
                            {destinationList?.map((destination) => (
                                <option key={destination?.id} value={destination?.id} selected={destinationId == destination?.id}> 
                                    {destination?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {destinationId && (
                        <div className="mb-4">
                            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" onChange={handleCategory}>
                                <option value="" selected>All Categories</option>
                                {categoryList?.map((category) => (
                                    <option key={category?.id} value={category?.id} selected={categoryId == category?.id}>
                                        {category?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {/* toggel show all here by radio button */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="showAll" name="showAll" value="showAll" checked={showAll} onChange={() => setShowAll(true)} />
                            <label htmlFor="showAll">Show All</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="showAll" name="showAll" value="showAll" checked={!showAll} onChange={() => setShowAll(false)} />
                            <label htmlFor="showAll">Show Max 8</label>
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-3/4 pl-0 md:pl-8">
                {venTraProducts?.length > 0 && (
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold capitalize">Services</div>
                        <div className="text-sm font-semibold text-gray-500">
                            {showAll ? "Showing all" : `Showing ${Math.min(8, venTraTaProducts?.length || 0)} of ` + (venTraTaProducts?.length ? venTraTaProducts?.length : 0)  + " results"}
                        </div>
                    </div>
                )}
                    <div className="grid grid-cols-4 gap-6 max-xs:grid-cols-1 max-xs:gap-4 grid-cols-service-cards">
                        {venTraTaProducts?.slice(0, showAll ? venTraTaProducts?.length : 8).map((item, index) => {
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
                    {serviceList?.length > 0 && (
                      <span className="text-2xl font-bold capitalize">New Services</span>
                    )}

                    <div className="grid grid-cols-4 gap-6 max-xs:grid-cols-1 max-xs:gap-4 grid-cols-service-cards mt-8 mb-8">
                        {serviceList?.map((item, index) => {
                            return (
                                <LocalProductCard
                                    key={item?.id}
                                    item={item}
                                />
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <Pagination {...paginationOptions} />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default services;




