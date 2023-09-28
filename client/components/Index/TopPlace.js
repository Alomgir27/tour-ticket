import React from "react";
import CategoryCardTitle from "./CategoryCardTitle";
import Container from "../Layout/Container";
import PlaceCard from "../Utils/PlaceCard";

function TopPlace() {
    return (
        <Container>
            <div className="flex flex-col gap-9 pb-16">
                <CategoryCardTitle
                    title={"Top Places in the rome"}
                    subtitle={
                        "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                    }
                />
                <div className="grid grid-cols-top-places gap-3">
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                </div>
            </div>
        </Container>
    );
}

export default TopPlace;
