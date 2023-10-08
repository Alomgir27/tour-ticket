import React from "react";

function BlogTags({tags}) {
    return (
        <div className="rounded-2xl flex-col flex group cursor-pointer">
            <div className="text-zinc-800 bg-slate-200 rounded-sm text-sm font-normal px-2 py-1">
                {tags?.map((item, index) => (
                    <span key={index} className="capitalize">{item + " "}</span>
                ))}
            </div>
        </div>
    );
}

export default BlogTags;
