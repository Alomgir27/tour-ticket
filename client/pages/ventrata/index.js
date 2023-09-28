import React from "react";
import Container from "@/components/Layout/Container";
import VentraCard from "@/components/Utils/VentraCard";

const ventrata = ({ productList }) => {
    return (
        <Container>
            <div className="grid grid-cols-service-cards">
                {productList.map((product) => (
                    <VentraCard key={product.id} tour={product} />
                ))}
            </div>
        </Container>
    );
};

export async function getServerSideProps() {
    const url = `${process.env.VENTRATA_API}/products`;
    // Define your authorization token here
    const authToken = process.env.VENTRATA_AUTH_KEY;

    const headers = {
        Authorization: `Bearer ${authToken}`,
    };

    const res = await fetch(url, { headers });
    const data = await res.json();

    return {
        props: {
            productList: data,
        },
    };
}

export default ventrata;
