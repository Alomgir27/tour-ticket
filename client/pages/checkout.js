import OrderSummary from "@/components/Checkout/OrderSummary/OrderSummary";
import PersonalForm from "@/components/Checkout/PersonalForm";
import ProgressTab from "@/components/Checkout/ProgressTab";
import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import React from "react";

const checkout = () => {
    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb />
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-10">
                    <div className="col-span-2 mt-10 flex flex-col gap-6">
                        <ProgressTab />
                        <PersonalForm />
                    </div>
                    <OrderSummary />
                </div>
            </Container>
        </div>
    );
};

export default checkout;
