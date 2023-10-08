import React, { useState } from "react";
import BlogTags from "@/components/Utils/BlogTags";
import NextImage from "./NextImage";

function BlogCard({ item  }) {
    const [readMore, setReadMore] = useState(false);
    return (
        <div className="w-full rounded-2xl flex-col flex group cursor-pointer overflow-hidden border border-slate-100 hover:shadow-[0_14px_24px_0px_rgba(87,29,11,0.15)] hover:border-transparent hover:border-[#FF4A4A] hover:shadow-[0_14px_54px_0px_rgba(87,29,11,0.2)] transition-all duration-300 h-fit">
            <NextImage className="h-[170px] w-full object-cover rounded-tl-2xl rounded-tr-2xl" src={item?.image} alt={item?.title} width={400} height={170} />
            <div className="px-2.5 pt-2.5 pb-4 transition-all duration-300 bg-white group-hover:shadow-[0_14px_24px_0px_rgba(87,29,11,0.15)] rounded-bl-2xl rounded-br-2xl border flex-col gap-2.5 flex h-full">
                <div className="flex-col items-start gap-3 flex">
                <div className="flex justify-between w-full gap-3">
                            <BlogTags tags={item?.tag?.split(",").map((item) => item.trim())} />
                            <p className="text-sm font-normal">{new Date(item?.created_at).toDateString()}</p>
                     </div>
                    <div className="font-semibold text-base">{item?.title}</div>    
                    
                    <div className="flex-col justify-center items-start gap-3 flex">
                        <div className="opacity-70 leading-normal text-sm font-normal">
                            {readMore ? item?.short_desc : item?.details}
                        </div>
                        <div className="w-[136px] text-red-500 font-semibold text-base capitalize leading-normal">
                            <span className="cursor-pointer" onClick={() => setReadMore(!readMore)}>
                                {readMore ? "Read Less" : "Read More"}
                            </span>
                      </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
