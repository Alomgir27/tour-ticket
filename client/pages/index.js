import { ProductsRepo } from "@/App/Repositories/Products/ProductsRepo";
import { ProductsService } from "@/App/Services/Products/ProductsService";
import BlogContainer from "@/components/Index/BlogContainer";
import CategoryCardContainer from "@/components/Index/CategoryCardContainer";
import TopPlace from "@/components/Index/TopPlace";
import Container from "@/components/Layout/Container";
import Loading from "@/components/Utils/Loading";
import SlideMenuCard from "@/components/Utils/SlideMenuCard";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const getServerSideProps = async () => {
    const res = await ProductsRepo.getList();
    const products = await res;
    return { props: { products } };
};

function Index({ products }) {
    // useEffect(() => {
    //     ProductsService.getList();
    // }, []);
    const { loading } = useSelector((state) => state.products);
    const servicesList = [
        { title: "Tour and bus", status: true },
        { title: "Boat", status: false },
        { title: "Airport", status: false },
        { title: "Sports", status: false },
        { title: "Other’s", status: false },
    ];
    const [activeTab, setActiveTab] = useState(servicesList[0].title);

    // if (loading) return <Loading />;

    return (
        <div className="flex flex-col">
            <Container>
                <div className="mt-[118px] mb-12 flex flex-col gap-8 justify-center items-center">
                    <h3 className="text-4xl font-extrabold capitalize max-xs:text-2xl">Explore Our Services</h3>
                    <ul className="h-[72px] p-[5px] bg-slate-100 rounded-xl flex ">
                        {servicesList.map((item, index) => (
                            <SlideMenuCard
                                key={index}
                                title={item.title}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        ))}
                    </ul>
                </div>
            </Container>
            <CategoryCardContainer
                products={products}
                title={"Hop on hop off"}
                subtitle={"Discover Rome on the Open Bus"}
                withBg={true}
            />
            <CategoryCardContainer
                products={products}
                title={"Tours and Tickets in & outside rome"}
                subtitle={
                    "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                }
            />
            <TopPlace />
            <BlogContainer
                title={"See Some Tour Blog"}
                subtitle={
                    "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                }
            />
        </div>
    );
}

export default Index;
