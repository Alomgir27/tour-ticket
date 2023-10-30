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
import { useSession } from "next-auth/react";




const checkout = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [object, setObject] = useState({});

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState('');

    const [product, setProduct] = useState({});




    useEffect(() => {
        if (!object.productId) return;
        (async () => {
            try {
                if (object?.productId?.length > 20) {
                    const res = await axios.get(`${ApiBase}/bookings/${object.bookingId}`, {
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
        let params = {
            firstName: router.query.firstName || "",
            lastName: router.query.lastName || "",
            email: router.query.email || "",
            phone: router.query.phone || "",
            countryCode: router.query.countryCode || "",
            bookingId: router.query.id || "",
            productId: router.query.productId || "",
            data: router.query.data || "",
        }
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        console.log(queryString);
        router.push(`/checkout?${queryString}`);
    }, []);

    useEffect(() => {
        if (router.query.firstName) {
            setFirstName(router.query.firstName);
        }
        if (router.query.lastName) {
            setLastName(router.query.lastName);
        }
        if (router.query.email) {
            setEmail(router.query.email);
        }
        if (router.query.phone) {
            setPhone(router.query.phone);
        }
        if (router.query.countryCode) {
            setCountryCode(router.query.countryCode);
        }
    }
        , [router.query.firstName, router.query.lastName, router.query.email, router.query.phone, router.query.countryCode]);



    useEffect(() => {
        if (router.query.data) {
            setObject(JSON.parse(router.query.data));
        }
    }
        , [router.query.data]);


    const [countryCodes, setCountryCodes] = useState([]);

    useEffect(() => {
        // Fetch the list of country codes from an API
        axios.get('https://restcountries.com/v2/all')
            .then((response) => {
                const codes = response.data.map(country => ({
                    name: country.name,
                    callingCode: `+${country.callingCodes[0]}`,
                }));
                setCountryCodes(codes);
                console.log(codes);
            })
            .catch((error) => {
                console.error('Error fetching country codes:', error);
            });
    }, []);


    useEffect(() => {
        if (status === "loading") return;
        if (session) {
            setFirstName(session?.user?.name?.split(" ")[0]);
            setLastName(session?.user?.name?.split(" ")[1]);
            setEmail(session?.user?.email);
        }

    }, [status]);






    const handleBookNow = async () => {

        if (!firstName || !lastName || !email || !phone) {
            alert("Please fill all the fields");
            return;
        }

        if (!object?.productId) return alert("Something went wrong");

        try {
            const bookingId = object?.bookingId;

            const res = await axios.patch(`${ApiBase}/bookings/${bookingId}`, {
                resellerReference: process.env.NEXT_PUBLIC_RESELLER_REFERENCE,
                contact: {
                    fullName: `${firstName} ${lastName}`,
                    emailAddress: email,
                    phoneNumber: phone,
                    locales: ['en-US'], // ['en-US', 'it-IT']
                    country: 'US'
                },
                currency: "USD",
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
            });
            console.log(res.data);
            let params = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                countryCode: countryCode,
                bookingId: bookingId,
                productId: object?.productId,
                data: JSON.stringify(object),
            }

            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            console.log(queryString);
            router.push(`/checkout/${bookingId}?${queryString}`);

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }

    };




    return (
        <div className="mt-10 flex flex-col">
            <Container>
                <BreadCrumb />
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-10">
                    <div className="col-span-2 mt-10 flex flex-col gap-6 items-center">
                        {/* <ProgressTab step={router?.query?.id ? 2 : 1} /> */}
                        <PersonalForm
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            countryCodes={countryCodes}
                        />
                        <button className="px-[50px] py-3.5 bg-red-500 rounded-md justify-center items-center gap-2.5 flex text-center text-white capitalize leading-none w-[fit-content]" type="button" onClick={() => handleBookNow()}>
                            {"Continue to payment"}
                        </button>
                    </div>
                    <div className="col-span-1">
                        <OrderSummary product={product} data={object} isVentrata={object?.productId?.length > 20} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default checkout;


