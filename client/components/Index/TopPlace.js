import React from "react";
import CategoryCardTitle from "./CategoryCardTitle";
import Container from "../Layout/Container";
import PlaceCard from "../Utils/PlaceCard";

function TopPlace({ topBlogs }) {
    return (
        <Container>
            <div className="flex flex-col gap-9 pb-16">
                <CategoryCardTitle
                    title={"Top Places in the rome"}
                    subtitle={
                        "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                    }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                   {topBlogs?.map((blog) => (
                        <PlaceCard
                            key={blog.id}
                            item={blog}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default TopPlace;
