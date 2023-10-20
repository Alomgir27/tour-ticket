import React, { useState, useEffect } from "react";
import OrderSummary from "@/components/Checkout/OrderSummary/OrderSummary";
import PersonalForm from "@/components/Checkout/PersonalForm";
import ProgressTab from "@/components/Checkout/ProgressTab";
import PaymentDetails from "@/components/Checkout/PaymentDetails";
import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import { useRouter } from "next/router";
import axios from "axios";
import { ApiAuth, ApiBase, Capabilities } from "@/Helper/ApiBase";
import { ApiBaseMysql } from "@/Helper/ApiBase";

const checkout = () => {
    const router = useRouter();
    const [object, setObject] = useState({});
    const [step, setStep] = useState(1);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState('+39');

    const [product, setProduct] = useState({});



    useEffect(() => {
        if (!object.productId) return;
        (async () => {
            try {
                if (object.productId.length > 20) {
                    const res = await axios.get(`${ApiBase}/products/${object.productId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            'Octo-Capabilities': Capabilities,
                            Authorization: `Bearer ${ApiAuth}`,
                        },
                    });
                    setProduct(res.data);
                    console.log(res.data);
                } else {
                    const res = await axios.get(`${ApiBaseMysql}/services/${object.productId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            'Octo-Capabilities': Capabilities,
                            Authorization: `Bearer ${ApiAuth}`,
                        },
                    });
                    setProduct(res?.data?.data);
                    console.log(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [object]);



    useEffect(() => {
        if (router.query.data) {
            setObject(JSON.parse(router.query.data));
        }
    }
        , [router.query.data]);


    const handleBookNow = async () => {

        if (step === 1) {
            if (!firstName || !lastName || !email || !phone) {
                alert("Please fill all the fields");
                return;
            }
            setStep(2);
            return;
        }

        try {

            const res2 = await axios.post(`${ApiBase}/bookings/${res.data.id}/confirm`, {
                resellerReference: "VOUCHER-0123",
                contact: {
                    fullName: "Oliver Morgan",
                    emailAddress: "a.h.joy066@gmail.com",
                    phoneNumber: "+447840739436",
                    locales: ["en-GB", "en-US", "en"],
                    country: "GB",
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
            });
            console.log(res2);

        } catch (error) {
            console.log(error);
        }

    };

    const tabs = [
        {
            id: 1,
            title: "Personal Info",
            component: <PersonalForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} countryCode={countryCode} setCountryCode={setCountryCode} />,
        },
        {
            id: 2,
            title: "Payment Details",
            component: <PaymentDetails firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} countryCode={countryCode} setCountryCode={setCountryCode} setStep={setStep} />,
        },
    ];


    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb />
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-10">
                    <div className="col-span-2 mt-10 flex flex-col gap-6 items-center">
                        <ProgressTab step={step} setStep={setStep} />
                        {tabs.map((tab) => {
                            if (tab.id === step) {
                                return tab.component;
                            }
                        }
                        )}
                        <button className="px-[50px] py-3.5 bg-red-500 rounded-md justify-center items-center gap-2.5 flex text-center text-white capitalize leading-none w-[fit-content]" type="button" onClick={() => handleBookNow()}>
                            {step === 1 ? "Continue to payment" : "Book now"}
                        </button>
                    </div>
                    <OrderSummary product={product} data={object} isVentrata={object?.productId?.length > 20} />
                </div>
            </Container>
        </div>
    );
};

export default checkout;
