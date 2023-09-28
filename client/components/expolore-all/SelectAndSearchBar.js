import React, { useState } from "react";
import SearchSvg from "../Svg/SearchSvg";
import ExploreAllMenuItem from "./ExploreAllMenuItem";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SelectAndSearchBar = () => {
    const [activeMenu, setActiveMenu] = useState("All");
    const router = useRouter();
    const exploreAllMenuItem = ["All", "Boat", "Airport", "Events", "Others"];

    const handleMenuClick = (item) => {
        setActiveMenu(item);
        const pageNumber = router.query.page || 1;
        // persist query params
        router.push({
            pathname: router.pathname,
            query: { category: item, page: pageNumber },
        });
    };

    // set active menu on page load
    useEffect(() => {
        const { category } = router.query;
        if (category) {
            setActiveMenu(category);
        }
    }, []);

    return (
        <div className="p-[5px] border-[5px] border-[#f0f3fb] rounded-2xl flex justify-between items-start md:items-center flex-col md:flex-row">
            {/* Selection Menu */}
            <div>
                {exploreAllMenuItem.map((item) => {
                    const active = activeMenu === item;
                    return (
                        <ExploreAllMenuItem key={item} active={active} onClick={() => handleMenuClick(item)}>
                            {item}
                        </ExploreAllMenuItem>
                    );
                })}
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
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectAndSearchBar;
