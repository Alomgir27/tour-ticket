import React from "react";
import DownArrowSvg from "../Svg/DownArrowSvg";

function CategoryCardTitle({ title, subtitle, withBg }) {
  return (
    <div className="flex items-center justify-between max-xs:flex-col max-xs:items-start">
      <div className="flex-col gap-4 inline-flex max-xs:gap-2 max-xs:h-fit">
        <div className="text-4xl font-extrabold capitalize max-xs:text-2xl">
          {title}
        </div>
        <div className="text-lg capitalize max-xs:text-sm">{subtitle}</div>
      </div>
      {withBg && (
        <div className="w-[231px] h-[39px]  items-center gap-6 inline-flex max-xs:hidden">
          <div className="font-semibold capitalize">
            Short By:
          </div>
          <div className="h-[39px] p-2.5 bg-white justify-between items-center gap-2.5 flex">
            <div className="capitalize">All Buses</div>
            <DownArrowSvg/>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryCardTitle;
