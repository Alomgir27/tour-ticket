import SearchSvg from "../Svg/SearchSvg";
import { HiArrowLongLeft } from "react-icons/hi2";

export const WhereAreYouGoingSearchBox = () => (
    <div
        className="bg-[#ede8e8] p-1 rounded-[12px] w-full mt-4 mb-10 lg:mt-10 lg:mb-28 max-md:mb-10"
        style={{ boxShadow: "" }}
        // 0px 14px 54px 0px rgba(87, 29, 11, 0.2)
    >
        <div className="flex items-center gap-2 bg-white p-[5px] rounded-[12px]">
            <div className="ml-2 mr-1">
                <SearchSvg />
            </div>
            <input
                type="text"
                name=""
                id=""
                placeholder="Where are you going?"
                className="w-full outline-none lg:text-lg sm:text-sm font-medium py-2.5"
            />
            <button className="text-white w-[130px] h-[52px] px-[35px] py-2.5 bg-red-500 rounded-lg justify-center items-center inline-flex max-xs:hidden">
                Search
            </button>
        </div>
    </div>
);

export const GoBackFromHelpAndSupport = () => (
    <div className="flex items-center gap-4 mb-11 cursor-pointer">
        <HiArrowLongLeft size={24} />
        <p>Help & Support</p>
    </div>
);

export const HelpSearchBox = () => (
    <div>
        <div className="text-2xl font-bold capitalize leading-normal mb-3"></div>
    </div>
);
