import React, { useState } from "react";
import SearchSvg from "../Svg/SearchSvg";
import ExploreAllMenuItem from "./ExploreAllMenuItem";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SelectAndSearchBar = ({search, setSearch}) => {
    const router = useRouter();
    return (
        <div className="p-[5px] border-[5px] border-[#f0f3fb] rounded-2xl flex justify-between items-start md:items-center flex-col md:flex-row">
            {/* Selection Menu */}
            <div>
                {/* {exploreAllMenuItem.map((item) => {
                    const active = activeMenu === item;
                    return (
                        <ExploreAllMenuItem key={item} active={active} onClick={() => handleMenuClick(item)}>
                            {item}
                        </ExploreAllMenuItem>
                    );
                })} */}
                <span className="text-base font-medium leading-loose text-slate-800 mb-2.5 ml-2.5">
                    Blogs
                </span>
            </div>
            {/* Search */}
            <div className="lg:w-[210px] h-12 px-2.5 py-2 bg-slate-100 rounded-xl flex-col justify-start items-start gap-2.5 flex mt-5 md:mt-0">
                <div className="justify-start items-center gap-[15px] inline-flex">
                    <div className="w-4 h-4 relative">
                        <SearchSvg />
                    </div>
                    <input
                        placeholder="Search ..."
                        type="text"
                        className="text-slate-800 text-base font-normal leading-loose w-full bg-transparent outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                router.push(`/blogs?search=${search}`);
                            }
                        }
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectAndSearchBar;
