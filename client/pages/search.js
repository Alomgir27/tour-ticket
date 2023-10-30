import React, { useEffect, useState } from "react";
//data
import { useGetCategories } from "@/App/Repositories/Categories/GetCategories";
import { fetchData, fetchVendraData } from "@/App/Repositories/Services/GetServices";
import { fetchBlogs } from "@/App/Repositories/Blogs/GetBlogs";

//components
import TopPlace from "@/components/Index/TopPlace";
import Container from "@/components/Layout/Container";
import SearchCard from "@/components/Search/SearchCard";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import Pagination from "@/components/Utils/Pagination";
//search components
import FilterComponent from "@/components/Utils/FilterComponent/FilterComponent";
import DestinationsComponent from "@/components/Utils/FilterComponent/DestinationsComponent";
import DatePicker from "@/components/Utils/FilterComponent/DatePicker";
import HourPicker from "@/components/Utils/FilterComponent/HourPicker";
import TextInput from "@/components/Utils/FilterComponent/TextInput";
import PricePicker from "@/components/Utils/FilterComponent/PricePicker";
import Sorting from "@/components/Utils/FilterComponent/Sorting";

//router
import { useRouter } from "next/router";

function search() {

    const router = useRouter();
    const [categoryList, setCategoryList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [venTraTaProducts, setVenTraTaProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);

    //pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    //filter
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
    const [fakeLowerPrice, setFakeLowerPrice] = useState("");
    const [fakeHigherPrice, setFakeHigherPrice] = useState("");
    const [fakeSearch, setFakeSearch] = useState("");

    const { data: categoryData } = useGetCategories();

    useEffect(() => {
        const params = {
            search: search,
            category: category,
            destinationId: destinationId,
            categoryId: categoryId,
            startDate: startDate ? startDate.toISOString().split("T")[0] : startDate,
            endDate: endDate ? endDate.toISOString().split("T")[0] : endDate,
            sort: sort,
            startHour: startHour ? startHour.toISOString().split("T")[1] : startHour,
            endHour: endHour ? endHour.toISOString().split("T")[1] : endHour,
            lowerPrice: lowerPrice,
            higherPrice: higherPrice,
            page: page,
        };
        fetchData(params).then((data) => {
            setServiceList(data?.data?.data);
            setTotalPages(data?.data?.last_page);
            setTotalItems(data?.data?.total);
        });
    }, [router.asPath, page]);

    useEffect(() => {
        const params = {
            destinationId: destinationId,
            categoryId: categoryId,
        };
        fetchVendraData(params).then((data) => {
            setVenTraTaProducts(data);
        }
        );
    }, [router.asPath]);

    useEffect(() => {
        const params = {
            search: search ? search : router.query?.search,
        }
        fetchBlogs(params).then((data) => {
            console.log(data);
            setBlogs(data?.data?.data);
        }
        );
    }
        , [search]);



    useEffect(() => {
        if ((startHour && endHour && startHour > endHour) || (startDate && endDate && startDate > endDate)) {
            return;
        }
        const params = {
            search: search ? search : router.query?.search,
            category: category,
            destinationId: destinationId,
            categoryId: categoryId,
            startDate: startDate ? startDate.toISOString().split("T")[0] : startDate,
            endDate: endDate ? endDate.toISOString().split("T")[0] : endDate,
            sort: sort,
            startHour: startHour ? startHour.toISOString().split("T")[1] : startHour,
            endHour: endHour ? endHour.toISOString().split("T")[1] : endHour,
            lowerPrice: lowerPrice,
            higherPrice: higherPrice,
            page: page,
        };
        const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
        router.push(`/search?${queryString}`);
    }, [category, destinationId, categoryId, startDate, endDate, sort, startHour, endHour, lowerPrice, higherPrice, page]);

    useEffect(() => {
        if (router.query?.search) {
            setSearch(router.query?.search);
        }
    }, [router.query?.search]);


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
        if (!destinationId) {
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

    const handleApplyPrice = () => {
        setLowerPirce(fakeLowerPrice);
        setHigherPrice(fakeHigherPrice);
    }

    const handleApplySearch = () => {
        setSearch(fakeSearch);
    }
    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb path={router.asPath} />

                <div className="bg-white">
                    <main className="mx-auto max-w-7xl ">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-10">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-xl font-semibold leading-7 text-gray-900 sm:text-4xl sm:truncate">
                                    Result for "{search ? search : router.query?.search ? router.query?.search : ""}"
                                </h1>
                                <p className="text-slate-800 text-base font-normal leading-relaxed">
                                    {totalItems + venTraTaProducts?.length} results found
                                </p>
                            </div>

                            <div className="flex items-center">

                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                >
                                    <span className="sr-only">Filters</span>
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-4">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* <!-- Filters --> */}
                                <div className="w-full max-w-xs lg:col-span-1 lg:max-w-none">
                                    <div className="mb-4">
                                        <TextInput
                                            label="Search"
                                            name="search"
                                            value={fakeSearch}
                                            onChange={(e) => setFakeSearch(e.target.value)}
                                            onApply={handleApplySearch}
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
                                            label='Select Starting Date'
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <DatePicker
                                            date={endDate}
                                            setDate={setEndDate}
                                            startDate={startDate}
                                            label='Select End Date'
                                        />
                                    </div>

                                    {startDate > endDate && startDate && endDate && (
                                        <span className="text-red-500">End date should be greater than start date</span>
                                    )}

                                    <div className="mb-4">
                                        <HourPicker
                                            hour={startHour}
                                            setHour={setStartHour}
                                            label={"Start"}
                                            startHour={new Date()}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <HourPicker
                                            hour={endHour}
                                            setHour={setEndHour}
                                            label={"End"}
                                            startHour={new Date(startHour)}
                                        />
                                    </div>

                                    {startHour > endHour && startHour && endHour && (
                                        <span className="text-red-500">End time should be greater than start time</span>
                                    )}

                                    <div className="mb-4">
                                        <PricePicker
                                            lowerPrice={fakeLowerPrice}
                                            setLowerPirce={setFakeLowerPrice}
                                            higherPrice={fakeHigherPrice}
                                            setHigherPrice={setFakeHigherPrice}
                                            label={"Price"}
                                            onApply={handleApplyPrice}
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

                                {/* <!-- Product grid --> */}
                                <div className="lg:col-span-3">
                                    <div className="w-full border-b border-zinc-100 pb-5  mt-[34px] justify-between items-center gap-6 flex flex-col md:flex-row">
                                        <div className="basis-full flex flex-col gap-4">
                                            {serviceList?.map((item) => (
                                                <SearchCard
                                                    key={item?.id}
                                                    id={item?.id}
                                                    title={item?.title}
                                                    tags={item?.tags}
                                                    description={item?.short_description}
                                                    price={item?.price}
                                                    actual_price={item?.actual_price}
                                                    discount={item?.discount}
                                                    image={item?.images}
                                                    category={item?.category}
                                                    highlight={item?.service_exp[0]?.highlights}
                                                />
                                            ))}
                                            {venTraTaProducts?.map((item) => {
                                                const orginalPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].original;
                                                const actualPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].retail;
                                                const discountPrice = Math.round(((orginalPrice - actualPrice) / orginalPrice) * 100);

                                                return (
                                                    <SearchCard
                                                        key={item?.id}
                                                        id={item?.id}
                                                        title={item?.title}
                                                        tags={item?.internalName}
                                                        description={item?.shortDescription}
                                                        price={orginalPrice}
                                                        actual_price={actualPrice}
                                                        discount={discountPrice}
                                                        image={item?.coverImageUrl ? item?.coverImageUrl : item?.bannerImageUrl ? item?.bannerImageUrl : item?.galleryImages?.[0]?.url ?? ""}
                                                        category={item?.category || item?.subtitle}
                                                        highlight={item?.highlights[0]}
                                                        ventra={true}
                                                    />
                                                );
                                            }
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mb-[100px] mt-[58px]">
                                        <Pagination {...paginationOptions} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </Container>
            <div className="flex flex-col gap-[100px]">
                <TopPlace topBlogs={blogs} />
            </div>
        </div>
    );
}

export default search;
