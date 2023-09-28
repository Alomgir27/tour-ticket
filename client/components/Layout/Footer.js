import React from "react";
import Container from "../Layout/Container";
import Link from "next/link";
import VisaSvg from "../Svg/VisaSvg";
import MasterSvg from "../Svg/MasterSvg";
import AmexSvg from "../Svg/AmexSvg";
import PaypalSvg from "../Svg/PaypalSvg";
import GooglePaySvg from "../Svg/GooglePaySvg";
import ApplePaySvg from "../Svg/ApplePaySvg";
import InstagramSvg from "../Svg/InstagramSvg";
import FacebookSvg from "../Svg/FacebookSvg";
import YoutubeSvg from "../Svg/YoutubeSvg";
import TwitterSvg from "../Svg/TwitterSvg";
import LinkedinSvg from "../Svg/LinkedinSvg";

const Footer = () => {
    return (
        <div className="md:bg-[url('/assets/footer.svg')] bg-cover pt-24 pb-10 ">
            <Container customClass="flex flex-col gap-20">
                <div className="grid grid-cols-footer gap-9">
                    <div className="flex flex-col gap-4 ">
                        <h3 className="text-slate-800 text-base font-semibold">Company</h3>
                        <div className="flex flex-col w-fit text-neutral-700 text-base font-normal gap-3">
                            <Link href={"/#"}>About Us</Link>
                            <Link href={"/#"}>Privacy Policy</Link>
                            <Link href={"/#"}>Blog</Link>
                            <Link href={"/#"}>Travel Guides</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <h3 className="text-slate-800 text-base font-semibold">Solutions</h3>
                        <div className="flex flex-col w-fit text-neutral-700 text-base font-normal gap-3">
                            <Link href={"/#"}>Free online ticketing</Link>
                            <Link href={"/#"}>QR scanning</Link>
                            <Link href={"/#"}>Capacity management</Link>
                            <Link href={"/#"}>Point of sale</Link>
                            <Link href={"/#"}>Product selection</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <h3 className="text-slate-800 text-base font-semibold">Support</h3>
                        <div className="flex flex-col w-fit text-neutral-700 text-base font-normal gap-3">
                            <Link href={"/#"}>Contact Us</Link>
                            <Link href={"/#"}>Guide</Link>
                            <Link href={"/#"}>Event</Link>
                            <Link href={"/#"}>Help Center</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 ">
                            <h3 className="text-slate-800 text-base font-semibold">Payment Channels</h3>
                            <div className="flex flex-wrap w-fit text-neutral-700 text-base font-normal gap-3">
                                <VisaSvg />
                                <MasterSvg />
                                <AmexSvg />
                                <PaypalSvg />
                                <GooglePaySvg />
                                <ApplePaySvg />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 ">
                            <h3 className="text-slate-800 text-base font-semibold">Follow Us</h3>
                            <div className="flex  gap-6 w-fit flex-wrap text-neutral-700 text-base font-normal">
                                <Link href={"/#"}>
                                    <FacebookSvg />
                                </Link>
                                <Link href={"/#"}>
                                    <YoutubeSvg />
                                </Link>
                                <Link href={"/#"}>
                                    <TwitterSvg />
                                </Link>
                                <Link href={"/#"}>
                                    <LinkedinSvg />
                                </Link>
                                <Link href={"/#"}>
                                    <InstagramSvg />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-neutral-700 text-sm font-normal flex flex-col items-center gap-2">
                    <p>© 2022 ROME OPEN BUS TOUR</p>
                    <p>Via Francesco Crispi 1300187– ROMA ITC.F. E P.I. 12594941002</p>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
