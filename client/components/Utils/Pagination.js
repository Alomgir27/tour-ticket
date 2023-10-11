import React, { useEffect, useState } from "react";
import DownArrowSvg from "../Svg/DownArrowSvg";
import PaginationNumber from "./PaginationNumber";

const Pagination = ({ page, setPage, totalPages, totalItems }) => {
    
    const [pages, setPages] = useState([]);

    useEffect(() => {
        let pages = [];
        for(let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
            pages.push(i);
        }
        setPages(pages);
    }
    , [page, totalPages]);


    



    return (
        <div className=" h-[34px] justify-center items-center gap-0.5 inline-flex">
            <div
                className="w-8 h-8 py-[11px] justify-center items-center flex cursor-pointer"
                onClick={() => {
                    if(page === 1) return;
                    setPage(page - 1);
                }
                }
            >
                <DownArrowSvg className={"rotate-90"} />
            </div>
            {/* PAGINATION NUMBERS */}
            <div className="flex flex-wrap gap-1.5">
                {pages.map((item, index) => {
                    return (
                        <PaginationNumber
                            key={index}
                            active={item === page}
                            onClick={() => {
                                if(item === page) return;
                                // persist query params
                                setPage(item);
                            }
                            }
                        >
                            {item}
                        </PaginationNumber>

                    );
                }
                )}
            </div>
            {/* PAGINATION NUMBERS */}

            <div
                className="w-8 h-8 py-[11px] justify-center items-center flex cursor-pointer"
                onClick={() => {
                    if(page === totalPages) return;
                    setPage(page + 1);
                }}
            >
                <DownArrowSvg className={"-rotate-90"} />
            </div>
        </div>
    );
};

export default Pagination;
