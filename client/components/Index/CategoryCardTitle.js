import React from "react";
import DownArrowSvg from "../Svg/DownArrowSvg";
import { useSelector } from "react-redux";

function CategoryCardTitle({ title, subtitle, withBg, onDestinationChange }) {
  const { selectedDestination } = useSelector((state) => state.products);
  const { destinations } = useSelector((state) => state.products);
  return (
    <div className="flex items-center justify-between max-xs:flex-col max-xs:items-start">
      <div className="flex-col gap-4 inline-flex max-xs:gap-2 max-xs:h-fit">
        <div className="text-4xl font-extrabold capitalize max-xs:text-2xl">
          {title}
        </div>
        <div className="text-lg capitalize max-xs:text-sm">{subtitle}</div>
      </div>
      {withBg && (
        <div className="flex items-center gap-4 max-xs:gap-2">
          <div className="text-md capitalize max-xs:text-sm font-semibold">
            Selected Destination:
          </div>
          <div className="w-[200px] h-[30px] bg-slate-200 rounded-xl flex-col p-[5px]  gap-2.5 flex items-center justify-center">
            <select onChange={(e) => onDestinationChange(e.target.value)} className="w-full h-full outline-none bg-transparent">
              {destinations?.map((item, index) => (
                <option key={index} value={item.id} selected={item.id === selectedDestination?.id} className="capitalize text-sm">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryCardTitle;
