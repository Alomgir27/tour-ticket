import BlogContainer from "@/components/Index/BlogContainer";
import TopPlace from "@/components/Index/TopPlace";
import Container from "@/components/Layout/Container";
import SearchCard from "@/components/Search/SearchCard";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import Pagination from "@/components/Utils/Pagination";
import TransitionComponent from "@/components/Utils/TransitionComponent";
import FilterComponent from "@/components/Utils/FilterComponent";
import TimeComponent from "@/components/Utils/TimeComponent";
import DestinationsComponent from "@/components/Utils/DestinationsComponent";
import InterestsComponent from "@/components/Utils/InterestsComponent";
import React from "react";

function search() {
    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb />

                <div className="bg-white">
                    <main className="mx-auto max-w-7xl ">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-10">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                    Result for “hop on hop”
                                </h1>
                                <p className="text-slate-800 text-base font-normal leading-relaxed">
                                    150 results founded
                                </p>
                            </div>

                            <div className="flex items-center">
                                <TransitionComponent />

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
                                <form className="hidden lg:block">
                                    <FilterComponent />
                                    <TimeComponent />
                                    <DestinationsComponent />
                                    <InterestsComponent />
                                </form>

                                {/* <!-- Product grid --> */}
                                <div className="lg:col-span-3">
                                    <div className="w-full border-b border-zinc-100 pb-5  mt-[34px] justify-between items-center gap-6 flex flex-col md:flex-row">
                                        <div className="basis-full flex flex-col gap-4">
                                            <SearchCard />
                                            <SearchCard />
                                            <SearchCard />
                                            <SearchCard />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mb-[100px] mt-[58px]">
                                        <Pagination />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </Container>
            <div className="flex flex-col gap-[100px]">
                <TopPlace />
                <BlogContainer
                    title={"See Some Tour Blog"}
                    subtitle={
                        "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                    }
                />
            </div>
        </div>
    );
}

export default search;
