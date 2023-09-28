import React from "react";
import BlogTags from "@/components/Utils/BlogTags";

function BlogCard({ img }) {
    return (
        <div className="w-full h-fit rounded-2xl flex-col flex group cursor-pointer">
            <img className="h-[170px] object-cover rounded-tl-2xl rounded-tr-2xl" src={`/assets/blog/${img}`} />
            <div className="px-2.5 pt-2.5 pb-4 transition-all duration-300 bg-white group-hover:shadow-[0_14px_24px_0px_rgba(87,29,11,0.15)] rounded-bl-2xl rounded-br-2xl border flex-col gap-2.5 flex">
                <div className="flex-col items-start gap-3 flex">
                <div className="flex justify-between w-full gap-3">
                            <BlogTags/>
                            <p className="text-sm font-normal">date</p>
                     </div>
                    <div className="font-semibold text-base">Colosseum tour with roman forum and palatine hill</div>
                    
                    <div className="flex-col justify-center items-start gap-3 flex">
                        <div className="opacity-70 leading-normal text-sm font-normal">
                            See our top discount guided tours. Colosseum, Vatican Museums, Pompeii...
                        </div>
                        {/* <div className="w-[136px] text-red-500 font-semibold text-base capitalize leading-normal">Read More</div> */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
