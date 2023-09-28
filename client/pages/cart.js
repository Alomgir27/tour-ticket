import ProductCart from "@/components/Cart/ProductCart";
import SelectDeselectAll from "@/components/Cart/SelectDeselectAll";
import TotalAmount from "@/components/Cart/TotalAmount";
import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import React from "react";

const cart = () => {
    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb />
                <div className="flex flex-col lg:flex-row mt-10 gap-6">
                    <div className="flex flex-col gap-4">
                        <SelectDeselectAll />
                        <ProductCart />
                    </div>
                    <TotalAmount />
                </div>
            </Container>
        </div>
    );
};

export default cart;
