import { ProductsService } from "@/App/Services/Products/ProductsService";
import { BlogsService } from "@/App/Services/Blogs/BlogsService";
import BlogContainer from "@/components/Index/BlogContainer";
import CategoryCardContainer from "@/components/Index/CategoryCardContainer";
import LocalProductsContainer from "@/components/Index/LocalProductsContainer";
import TopPlace from "@/components/Index/TopPlace";
import Loading from "@/components/Utils/Loading";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


function Index() {
    const { loading } = useSelector((state) => state.products);
    const { products } = useSelector((state) => state.products);
    const { selectedDestination } = useSelector((state) => state.products);
    const { localProducts } = useSelector((state) => state.products);
    const { blogs } = useSelector((state) => state.blogs);
    const { topBlogs } = useSelector((state) => state.blogs);   
    
    

    useEffect(() => {
        if(products?.length > 0 || localProducts?.length > 0 || blogs?.length > 0) return;
        (async () => {
           await ProductsService.getInit();
              await BlogsService.getInit();

        }
        )();
    }, []);

    const onDestinationChange = async (id) => {
        await ProductsService.getProductsByDestinationId(id);
    }


    if (loading) return <Loading />;

    return (
        <div className="flex flex-col gap-10 sm:gap-16 md:gap-12">
           
            <CategoryCardContainer
                products={products}
                title={"Top Destinations"}
                subtitle={`Discover the best activities in ${selectedDestination?.name} and ${selectedDestination?.name} Area`}
                withBg={true}
                onDestinationChange={onDestinationChange}
            />
           
            <LocalProductsContainer products={localProducts}  />
           
            <TopPlace topBlogs={topBlogs} />

            <BlogContainer
                title={"Latest Blogs"}
                subtitle={
                    "Explore the latest blogs from our blog section. We have a wide range of blogs that you can read and get information about the places you want to visit."
                }
                blogs={blogs}
            />
        </div>
    );
}

export default Index;
