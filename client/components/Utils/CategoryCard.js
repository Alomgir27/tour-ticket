import React from "react";
import CategoryTag from "./CategoryTag";
import { FavouriteFillSvg } from "../Svg/FavouriteFillSvg";
import Link from "next/link";
import Image from "next/image";

function CategoryCard({ img, link, title, tags, price, actual_price, discount }) {
    return (
        <Link href={`${link}`}>
            <div
                className={`min-h-full relative cursor-pointer group bg-white hover:shadow-[0_14px_24px_0px_rgba(87,29,11,0.15)] rounded-bl-2xl rounded-br-2xl border`}
            >
                <Image
                    className="w-full rounded-t-2xl h-[195px]  object-cover"
                    src={img || "/assets/product_default_cover.jpeg"}
                    width={1200}
                    height={800}
                    alt={title}
                />

                <div className="flex flex-col min-h-[170px] justify-between px-2.5 pt-2.5 pb-2.5 transition-all duration-300">
                    <div className="flex flex-col gap-3">
                        <div className="flex-col gap-3 flex">
                            <div className="gap-3 flex max-lg:flex-col">
                                <CategoryTag title={tags || "Demo Tags"} bgColor={"bg-red-100"} />
                                {/* <CategoryTag title={"Green Line"} bgColor={"bg-green-400"} /> */}
                            </div>
                            <div className=" font-bold">{title.length < 48 ? title : title.slice(0, 48)}</div>
                        </div>

                        <ul className="list-disc list-inside text-xs leading-normal items-center gap-1 flex justify-self-end">
                            <li className="!list-none">1 Run</li>
                            <li className="ml-1">
                                <span className="-ml-2">Small Group</span>
                            </li>
                        </ul>
                    </div>

                    <div className=" items-center gap-2.5 inline-flex">
                        <div className="text-red-500 text-2xl font-black leading-normal">€ {actual_price}</div>
                        <div className="grow shrink basis-0 opacity-50  font-medium line-through leading-normal">
                            € {price}
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 px-2 h-[25px] text-center bg-red-500 rounded-tl-2xl text-white text-xs font-bold capitalize leading-loose">
                    -{`${discount}`}% OFF
                </div>
                <div className="absolute top-4 right-4">
                    <FavouriteFillSvg />
                </div>
            </div>
        </Link>
    );
}

export default CategoryCard;
