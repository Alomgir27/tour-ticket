import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonalForm = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, countryCode, setCountryCode, countryCodes }) => {

    return (
        <div className="w-full pb-6 border-b border-zinc-100 flex-col justify-start items-center gap-6 flex">
            <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch justify-between items-center gap-6 flex">
                    <div className="grow shrink basis-0 text-black text-[20px] font-semibold">Personal Info</div>
                </div>
                <div className="self-stretch justify-start items-start gap-6 flex flex-wrap">
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">First name *</div>
                        <input
                            placeholder="Enter your first name"
                            type="text"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Last Name*</div>
                        <input
                            placeholder="Enter your last name"
                            type="text"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="self-stretch justify-start items-start gap-6 flex flex-wrap">
                    <div className="grow shrink basis-[310px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Phone Number</div>
                        <div className="self-stretch justify-start items-start gap-2.5 flex">
                            <select
                                className="self-stretch px-5 py-5 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex max-w-[320px]"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                            >
                                {countryCodes.map(country => (
                                    <option key={country.name} value={country.callingCode}>{country.name} ({country.callingCode})</option>
                                ))}
                            </select>

                            <input
                                placeholder="Enter your phone number without country code"
                                className="self-stretch px-5 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex w-[420px]"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                            />
                        </div>
                    </div>
                    <div className="grow shrink basis-[330px] flex-col justify-start items-start gap-2.5 flex">
                        <div className=" font-bold">Email Address*</div>
                        <input
                            placeholder="Enter your email address"
                            type="email"
                            className="self-stretch px-5 h-12 bg-white rounded-md border border-zinc-100 justify-start items-start gap-2.5 flex placeholder:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalForm;
