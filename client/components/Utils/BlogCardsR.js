import React from "react";
import BlogCard from "@/components/Utils/BlogCard";

function BlogCardsR({  }) {
    return (

         <div className="flex flex-col gap-3">
         <div className="text-lg font-bold capitalize leading-normal">
         Relavent Blogs
         </div>
         <div className="flex gap-2 w-fit">
                 <div className="grid w-[292px] grid-cols-service-cards gap-5">
                     {[...Array(3)].map((_, item) => (
                         <BlogCard key={item} img={"blog1.png"} />
                     ))}
                 </div>
         </div>
         </div>
    );
}

export default BlogCardsR;
