import React, { useState } from "react";
import CategoryTag from "../Utils/CategoryTag";
import { FavouriteFillSvg } from "../Svg/FavouriteFillSvg";
import NextImage from "../Utils/NextImage";
import Image from "next/image";

function SearchCard({
    title,
    tags,
    description,
    price,
    actual_price,
    discount,
    image,
    category,
    highlight,
    ventra,
    ...props
}) {
    const [showdesc, setShowdesc] = useState(false);
    return (
        <div className="w-full relative hover:shadow border rounded-2xl flex flex-col md:flex-row overflow-hidden">
            <button className="absolute text-white text-xs font-bold capitalize leading-loose top-0 left-0 p-2 rounded-tl-2xl bg-red-500 justify-start items-start gap-2.5 flex">
                <span className="text-xs font-medium">-{discount || 0}% OFF</span>
            </button>
            {ventra ? (
              <div className="relative">
                    <Image
                        className="h-full w-full rounded-tl-2xl"
                        src={image || "/assets/product_default_cover.jpeg"}
                        alt="ventra"
                        width={350}
                        height={200}
                    />
              </div>
            ) : (
                <NextImage
                    className="h-full w-full rounded-tl-2xl"
                    src={image || "/assets/product_default_cover.jpeg"}
                    alt="ventra"
                    width={350}
                    height={200}
                />
            )}

        

            <div className=" px-2.5 pt-2.5 pb-5 flex flex-col  gap-2.5 w-full">
                <div className=" flex flex-col gap-6">
                    <div className=" flex-col justify-start items-start gap-3 flex">
                        <div className="gap-4 flex items-center justify-between w-full">
                            <div className="gap-3 inline-flex">
                                <CategoryTag title={title || "Hop on hop off"} bgColor={"bg-red-100"} />
                                <CategoryTag title={tags || "Green Line"} bgColor={"bg-green-400"} />
                            </div>
                            <FavouriteFillSvg />
                        </div>
                        <div className="text-xl font-bold leading-normal">{title || "Hop on hop off"}</div>
                        <div className="text-sm leading-normal">
                            {description &&  description?.length > 108 ? (
                                <>
                                    {showdesc ? description : description.slice(0, 108)}
                                </>
                            ) : (
                                description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet mattis accumsan, odio augue aliquam diam, vitae."
                            )}
                            {description && description?.length > 108 && (
                                <span
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => setShowdesc(!showdesc)}
                                >
                                    {showdesc ? " Read less" : " Read more"}
                                </span>
                            )}
                            
                        </div>

                    </div>
                    <div className="items-center font-medium gap-1 flex ">
                        <div className=" text-xs  leading-normal">1 Run</div>
                        <div className="leading-[0]">⦁</div>
                        <div className=" text-xs  leading-normal">Small Group</div>
                    </div>
                    <div className=" justify-start items-center gap-2.5 inline-flex">
                        <div className="text-red-500 text-2xl font-black leading-normal">€ {actual_price}</div>
                        <div className="grow shrink basis-0 opacity-50   font-medium line-through leading-normal">
                            € {price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
