import React from "react";
import DownArrowSvg from "../Svg/DownArrowSvg";
import PaginationNumber from "./PaginationNumber";
import { useRouter } from "next/router";

const Pagination = ({ paginationOptions }) => {
    const router = useRouter();
    const category = router.query.category || "All";
    console.log(paginationOptions);
    return (
        <div className=" h-[34px] justify-center items-center gap-0.5 inline-flex">
            <div
                className="w-8 h-8 py-[11px] justify-center items-center flex cursor-pointer"
                onClick={() => {
                    // persist query params
                    if (paginationOptions?.currentPage === 1) return;
                    router.push({
                        pathname: router.pathname,
                        query: { category: category, page: paginationOptions?.currentPage - 1 },
                    });
                }}
            >
                <DownArrowSvg className={"rotate-90"} />
            </div>
            {/* PAGINATION NUMBERS */}
            <div className="flex flex-wrap gap-1.5">
                {Array.from(Array(paginationOptions?.totalPages).keys()).map((item, index) => {
                    return (
                        <PaginationNumber
                            key={index}
                            active={paginationOptions?.currentPage === item + 1}
                            onClick={() => {
                                // persist query params
                                router.push({
                                    pathname: router.pathname,
                                    query: { category: category, page: item + 1 },
                                });
                            }}
                        >
                            {item + 1}
                        </PaginationNumber>
                    );
                })}
            </div>

            <div
                className="w-8 h-8 py-[11px] justify-center items-center flex cursor-pointer"
                onClick={() => {
                    if (paginationOptions?.currentPage === paginationOptions?.totalPages) return;
                    // persist query params
                    router.push({
                        pathname: router.pathname,
                        query: { category: category, page: paginationOptions.currentPage + 1 },
                    });
                }}
            >
                <DownArrowSvg className={"-rotate-90"} />
            </div>
        </div>
    );
};

export default Pagination;
