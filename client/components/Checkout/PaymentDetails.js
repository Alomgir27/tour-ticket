import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';


const PaymentDetails = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, countryCode, setCountryCode, setStep }) => {

  useEffect(() => {
    const handlePayment = async () => {
      // Load the Stripe.js script
      const stripe = await loadStripe('pk_test_51O2n9OGD1q5uAn9WWDG2Ky7oYN527XM2OEqV2OOElz5dzcX5cHuw5DePsOEeC2kgJUmd9JoHhwKQPZBC63ooyqc300nAjS5guP');


      const redirrect = await stripe.redirectToCheckout({
        lineItems: [
          // Replace with the ID of your price
          { price: 'price_1O2nVkGD1q5uAn9WaaJlpHwe', quantity: 1 },
        ],
        mode: 'subscription',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      });

      if (redirrect.error) {
        alert(redirrect.error.message);
      }
    };

    handlePayment();
  }, []);






  return (
    <div className="w-[816px] h-[874px] flex-col justify-center items-center gap-6 inline-flex" id="payment-form" >
      <div className="self-stretch h-[165px] pb-6 border border-zinc-100 flex-col justify-start items-center gap-6 flex">
        <div className="self-stretch h-[141px] flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-between items-center gap-6 inline-flex">
            <div className="grow shrink basis-0 text-black text-[20px] font-semibold">
              Personal Info
            </div>
          </div>
          <div className="self-stretch px-5 py-[18px] bg-white rounded-md border border-zinc-100 justify-start items-center gap-6 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
              <p className="text-[16px] font-semibold">
                {firstName} {lastName}
              </p>
              <p className="text-[16px] font-semibold">
                {countryCode} {phone}
              </p>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                <p className="text-[16px] font-semibold">
                  {email}
                </p>
              </div>
            </div>
            <div className="text-red-500 text-[16px] font-semibold" onClick={() => setStep(1)}>
              Edit
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[599px] pb-6 border border-zinc-100 flex-col justify-start items-center gap-6 flex">
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
        {/* <div className="px-6 py-3.5 bg-red-500 rounded-md justify-center items-center gap-2.5 inline-flexn ext-center text-white capitalize leading-none">
            Confirm payment
        </div> */}

      </div>
    </div>
  );
};

export default PaymentDetails;
