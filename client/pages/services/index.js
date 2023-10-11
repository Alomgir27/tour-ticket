import React, { useState, useEffect } from "react";
import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import CategoryCard from "@/components/Utils/CategoryCard";
import Loading from "@/components/Utils/Loading";
import Pagination from "@/components/Utils/Pagination";
import { useRouter } from "next/router";
import { useGetCategories } from "@/App/Repositories/Categories/GetCategories";
import { fetchData, fetchVendraData  } from "@/App/Repositories/Services/GetServices";
import LocalProductCard from "@/components/Utils/LocalProductCard";
//search components
import FilterComponent from "@/components/Utils/FilterComponent/FilterComponent";
import DestinationsComponent from "@/components/Utils/FilterComponent/DestinationsComponent";
import DatePicker from "@/components/Utils/FilterComponent/DatePicker";
import HourPicker from "@/components/Utils/FilterComponent/HourPicker";
import TextInput from "@/components/Utils/FilterComponent/TextInput";
import PricePicker from "@/components/Utils/FilterComponent/PricePicker";
import Sorting from "@/components/Utils/FilterComponent/Sorting";


const services = () => {
    const router = useRouter();
    const [categoryList, setCategoryList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [venTraTaProducts, setVenTraTaProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [startDate, setStartDate] = useState(''); // '2021-08-01
    const [endDate, setEndDate] = useState('');
    const [sort, setSort] = useState("");
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [lowerPrice, setLowerPirce] = useState("");
    const [higherPrice, setHigherPrice] = useState("");


    const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useGetCategories();


    useEffect(() => {
        const params = {
            search: search,
            category: category,
            destinationId: destinationId,
            categoryId: categoryId,
            startDate: startDate,
            endDate: endDate,
            sort: sort,
            startHour: startHour,
            endHour: endHour,
            lowerPrice: lowerPrice,
            higherPrice: higherPrice,
            page: page,
        };
        fetchData(params).then((data) => {
            console.log(data);
            setServiceList(data?.data?.data);
            setTotalPages(data?.data?.last_page);
            setTotalItems(data?.data?.total);
        });
    }, [search, category, destinationId, categoryId, startDate, endDate, sort, startHour, endHour, lowerPrice, higherPrice, page]);

    useEffect(() => {
        const params = {
            destinationId: destinationId,
            categoryId: categoryId,
        };
        fetchVendraData(params).then((data) => {
            setVenTraTaProducts(data);
        }
        );
    }, [destinationId, categoryId]);

    useEffect(() => {
        const params = {
            search: search,
            category: category,
            destinationId: destinationId,
            categoryId: categoryId,
            startDate: startDate,
            endDate: endDate,
            sort: sort,
            startHour: startHour,
            endHour: endHour,
            lowerPrice: lowerPrice,
            higherPrice: higherPrice,
            page: page,
        };
        const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
        router.push(`/services?${queryString}`);
    }, [search, category, destinationId, categoryId, startDate, endDate, sort, startHour, endHour, lowerPrice, higherPrice, page]);


    useEffect(() => {
        if (categoryData) {
            let destinationList = [];
            categoryData?.map((item) => {
                 destinationList = [...destinationList, ...item?.destinations];
            });
            setDestinationList(destinationList);
        }
    }, [categoryData]);

    useEffect(() => {
        if (destinationId && categoryData) {
            let categoryList = [];
            categoryData?.map((item) => {
                item?.destinations.map((destination) => {
                    if (destination.id == destinationId) {
                        categoryList = [...categoryList, ...destination.categories];
                    }
                }
                );
            });
            setCategoryList(categoryList);
        }
    }
        , [destinationId]);

    useEffect(() => {
        setIsLoading(categoryLoading);
    }, [categoryLoading]);

    useEffect(() => {
        if(!destinationId) {
            setCategoryId("");
            setCategory("");
        }
    }, [destinationId]);


    const paginationOptions = {
        totalPages: totalPages,
        totalItems: totalItems,
        page: page,
        setPage: setPage,
    };

    const handleCategory = (id) => {
        setCategoryId(id);
        categoryList?.map((item) => {
            if (item.id == id) {
                setCategory(item?.title);
            }
        }
        );
    }

    const handleDestination = (id) => {
        setDestinationId(id);
    }

  

    if (isLoading) return <Loading />;
    if (categoryError) return <div>Something went wrong</div>;

    return (
        <Container>
            <BreadCrumb path={router.asPath} />
            <div className="flex flex-col md:flex-row mt-8">
                <div className="w-full md:w-1/4">

                <div className="mb-4">
                    <TextInput
                        label="Search"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        type="text"
                    />
                </div>
            
                <div className="mb-4">
                    <DestinationsComponent 
                    items={destinationList} 
                    selected={destinationId} 
                    setSelected={handleDestination}
                    />
                </div>

                {destinationId && (
                    <div className="mb-4">
                        <FilterComponent 
                          items={categoryList?.map((item) => ({ id: item?.id, name: item?.title }))} 
                          selected={categoryId} 
                          setSelected={handleCategory} 
                          />
                    </div>
                  )}
                

                <div className="mb-4">
                    <DatePicker
                        date={startDate}
                        setDate={setStartDate}
                        startDate={new Date()}
                        label='Select Starting Time'
                    />
                </div>

                {startDate && (
                    <div className="mb-4">
                        <DatePicker
                            date={endDate}
                            setDate={setEndDate}
                            startDate={startDate}
                            label='Select End Time'
                        />
                    </div>
                )}

                <div className="mb-4">
                    <HourPicker
                        hour={startHour}
                        setHour={setStartHour}
                        label={"Start"}
                        startHour={new Date()}
                    />
                </div>

                {startHour && (
                    <div className="mb-4">
                        <HourPicker
                            hour={endHour}
                            setHour={setEndHour}
                            label={"End"}
                            startHour={new Date(startHour)}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <PricePicker
                        lowerPrice={lowerPrice}
                        setLowerPirce={setLowerPirce}
                        higherPrice={higherPrice}
                        setHigherPrice={setHigherPrice}
                        label={"Price"}
                    />
                </div>

                <div className="mb-4">
                    <Sorting
                        sort={sort}
                        setSort={setSort}
                        label={"Sort"}
                    />
                </div>

               

                </div>
                <div className="w-full md:w-3/4 pl-0 md:pl-8">
                {venTraTaProducts?.length > 0 && (
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




