import React, { useState, useEffect } from "react";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router";
import axios from "axios";
import { ApiAuth, ApiBase, Capabilities } from "@/Helper/ApiBase";
import { ApiBaseMysql } from "@/Helper/ApiBase";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);




const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        if (!router?.query?.id) return;
        if (router?.query?.id) {
            const bookingUrl = `${ApiBase}/bookings/${router.query.id}`;
            axios.get(bookingUrl, {
                headers: {
                    'Authorization': `Bearer ${ApiAuth}`,
                    'Content-Type': 'application/json',
                    'Octo-Capabilities': Capabilities,
                }
            }).then((res) => {
                setBooking(res.data);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [router?.query?.id]);




    const sendEmailWithPdf = async (email, fullName, ticketUrl) => {
        try {
            const response = await axios.post(`${ApiBaseMysql}/send-email`, {
                to: email,
                recipientName: fullName,
                subject: 'Ticket',
                body: 'Ticket attached',
                attachments: [
                    {
                        filename: 'ticket.pdf',
                        path: ticketUrl,
                        contentType: 'application/pdf',
                    },
                ],
            });

            console.log(response.data.message);
        } catch (error) {
            console.error('Email sending failed:', error);
        }
    };




    const handleStripePayment = async (event) => {
        event.preventDefault();
        if (!booking) {
            console.log('Booking not found');
            return;
        }

        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log('Stripe Payment Success!', paymentMethod);
            const bookingId = booking.uuid;
            const amount = booking.pricing.retail;
            if (!amount) return alert('Amount not found')
            const bookingUrl = `${ApiBase}/bookings/${bookingId}/confirm`;
            axios.post(bookingUrl, {
                cardPayment: {
                    gateway: 'stripe',
                    stripe: {
                        version: 'latest',
                        paymentIntent: {
                            id: paymentMethod.id,
                            publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
                            clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
                            amount: amount,
                            currency: "USD"
                        }
                    }
                },
                resellerReference: process.env.NEXT_PUBLIC_STRIPE_RESLLER_REFERENCE,
                contact: {
                    fullName: booking.contact.fullName,
                    emailAddress: booking.contact.emailAddress,
                    phoneNumber: booking.contact.phoneNumber,
                    locales: ['en-US', 'en', 'en-GB'],
                    country: booking.contact.country
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${ApiAuth}`,
                    'Content-Type': 'application/json',
                    'Octo-Capabilities': Capabilities,
                }
            }).then(async (res) => {
                console.log(res);
                const ticketUrl = res.data.voucher.deliveryOptions[2].deliveryValue;
                await sendEmailWithPdf(booking.contact.emailAddress, booking.contact.fullName, ticketUrl);
                setLoading(false);
                router.push(`/checkout/${bookingId}/success`);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
                router.push(`/checkout/${bookingId}/failed?error=${err}&${router?.asPath?.split('?')[1]}`);
            });
        } else {
            setLoading(false);
            console.log('Stripe Payment Error:', error.message);
        }
    };

    return (
        <div className="container mt-10" id="payment-form">
            <form onSubmit={handleStripePayment}>
                <div className="form-row mb-3 bg-white rounded-md border border-zinc-100 p-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: 'black',
                                    '::placeholder': {
                                        color: 'gray-400',
                                    },
                                },
                                invalid: {
                                    color: 'red-500',
                                },
                            },
                        }}
                    />
                </div>


                <div className="text-red-500 text-sm font-semibold">
                    {booking?.pricing?.retail && `Total Amount: ${booking?.pricing?.retail}`}
                </div>
                {!loading ?
                    (
                        <div className="text-red-500 text-sm font-semibold">
                            <button type='submit' disabled={!stripe} className='bg-red-500 text-white px-4 py-2 rounded-md mt-4'>
                                Pay with Stripe
                            </button>
                        </div>
                    ) : (
                        <div className="text-red-500 text-sm font-semibold">
                            <h1>Processing...</h1>
                        </div>
                    )}
            </form>


        </div>
    );
};

const Index = () => {
    const [data, setData] = useState({});
    const router = useRouter();
    useEffect(() => {
        let params = {
            bookingId: router?.query?.id,
            productId: router?.query?.productId,
            firstName: router?.query?.firstName,
            lastName: router?.query?.lastName,
            email: router?.query?.email,
            phone: router?.query?.phone,
            countryCode: router?.query?.countryCode,
            data: router?.query?.data ? JSON.parse(router?.query?.data) : null,
        };
        setData(params);

    }, [router?.query?.id, router?.query?.productId, router?.query?.firstName, router?.query?.lastName, router?.query?.email, router?.query?.phone, router?.query?.countryCode]);
    return (
        <div className="mt-10 flex flex-col gap-6 items-center w-full px-10">
            <div className="self-stretch h-[165px] pb-6 border border-zinc-100 flex-col justify-start items-center gap-6 flex">
                <div className="self-stretch h-[141px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-stretch justify-between items-center gap-6 inline-flex">
                        <div className="grow shrink basis-0 text-black text-[20px] font-semibold p-5">
                            Personal Info
                        </div>
                    </div>
                    <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-start items-center gap-6 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                            <p className="text-[16px] font-semibold">
                                {data?.firstName} {data?.lastName}
                            </p>
                            <p className="text-[16px] font-semibold">
                                {data?.phone}
                            </p>
                            <p className="text-[16px] font-semibold">
                                {data?.email}
                            </p>

                        </div>
                        <div className="text-red-500 text-[16px] font-semibold customize-button cursor-pointer" onClick={() => router.push(`/checkout?${router?.asPath?.split('?')[1]}`)}>
                            Edit
                        </div>
                    </div>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            {/* <div className="self-stretch h-[599px] pb-6 border border-zinc-100 flex-col justify-start items-center gap-6 flex">
        <div className="self-stretch h-[507px] flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-between items-center gap-6 inline-flex">
            <div className="grow shrink basis-0 text-black text-[20px] font-semibold">
              Select a payment method
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 h-[60px] justify-between items-center gap-2.5 flex">
              <div className="grow shrink basis-0 h-[60px] px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 flex">
                <div className="justify-start items-center gap-3 flex">
                  <div className="w-5 h-5 opacity-50 bg-white rounded-full border border-slate-800" />
                  <div className="">
                    Paypal
                  </div>
                </div>
                <div className="w-[62.50px] h-[16.66px] relative"></div>
              </div>
            </div>
            <div className="grow shrink basis-0 h-[60px] justify-between items-center gap-2.5 flex">
              <div className="grow shrink basis-0 h-[60px] px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 flex">
                <div className="justify-start items-center gap-3 flex">
                  <div className="w-5 h-5 opacity-50 bg-white rounded-full border border-slate-800" />
                  <div className="">
                    Google Pay
                  </div>
                </div>
                <div className="w-[50.72px] h-[20px] relative">
                  <div className="w-[16.42px] h-[16.64px] left-0 top-0 absolute"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-96 px-5 py-[18px] bg-white rounded-md border border-zinc-100 flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch justify-between items-start gap-[572px] inline-flex">
              <div className="justify-start items-center gap-3 flex">
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute bg-white rounded-full border border-red-500" />
                  <div className="w-3 h-3 left-[4px] top-[4px] absolute bg-red-500 rounded-full border border-red-500" />
                </div>
                <div className="">
                  Debit or credit card
                </div>
              </div>
              <div className="w-5 h-5 relative" />
            </div>
            <div className="self-stretch h-[206px] flex-col justify-start items-start gap-6 flex">
              <div className="self-stretch h-[74px] flex-col justify-start items-start gap-2.5 flex">
                <div className=" text-[16px] font-bold">
                  Name on card
                </div>
                <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 inline-flex">
                  <div className="">
                    MD Ahosan Habib
                  </div>
                  <div className="w-4 h-4 relative" />
                </div>
              </div>
              <div className="self-stretch h-[108px] flex-col justify-start items-start gap-2.5 flex">
                <div className=" text-[16px] font-bold">
                  Card Number
                </div>
                <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 inline-flex">
                  <div className="">
                    1234 5678 9012 3456
                  </div>
                  <div className="w-6 h-4 relative">
                    <div className="w-[19.31px] h-[12.08px] left-[2.24px] top-[1.99px] absolute"></div>
                  </div>
                </div>
                <div className="justify-start items-start gap-2.5 inline-flex">
                  <div className="w-9 h-6 relative">
                    <div className="w-[30px] h-[9.21px] left-[3px] top-[7.39px] absolute"></div>
                  </div>
                  <div className="w-9 h-6 relative">
                    <div className="w-[28.77px] h-[18px] left-[3.61px] top-[3px] absolute"></div>
                  </div>
                  <div className="w-9 h-6 relative">
                    <div className="w-[28.97px] h-[18.12px] left-[3.36px] top-[2.99px] absolute"></div>
                  </div>
                  <div className="w-9 h-6 relative">
                    <div className="w-6 h-[18.49px] left-[6px] top-[2.76px] absolute"></div>
                  </div>
                  <div className="w-9 h-6 relative" />
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                <div className=" text-[16px] font-bold">
                  Expiry date
                </div>
                <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 inline-flex">
                  <div className="">
                    MM/YY
                  </div>
                  <div className="w-6 h-4 relative" />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                <div className=" text-[16px] font-bold">
                  CVC / CVV
                </div>
                <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-between items-center gap-2.5 inline-flex">
                  <div className="">
                    3 digits
                  </div>
                  <div className="w-6 h-4 relative" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div> */}
        </div>
    );
};

export default Index;
