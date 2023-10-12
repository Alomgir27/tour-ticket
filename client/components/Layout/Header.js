import React from "react";
import Container from "./Container";
import FavouriteSvg from "../Svg/FavouriteSvg";
import CartSvg from "../Svg/CartSvg";
import DownArrowSvg from "../Svg/DownArrowSvg";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchSvg from "../Svg/SearchSvg";
import BurgerMenuSvg from "../Svg/BurgerMenuSvg";
import { useSession, signOut } from "next-auth/react";

function Header() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div className={`${router.pathname == "/" ? "relative z-10 left-0 right-0" : ""}`}>
            <Container className="relative z-10">
                <nav className="h-[100px] max-lg:h-20 w-full flex-center-between ">
                    <Link href={"/"}>
                        <img className="max-lg:w-20 lg:h-10" src="/assets/coure-logo.png" alt="coure-logo" />
                    </Link>
                    <div className="flex-i-center w-[774px] gap-[64px] justify-end max-lg:w-full max-lg:gap-10">
                        <ul className="flex-i-center gap-[34px] max-lg:gap-5 max-md:hidden max-lg:min-w-fit ">
                            <Link href={"/#"}>
                                <li className="font-bold max-lg:min-w-fit">Home</li>
                            </Link>
                            <Link href={"/services"}>
                                <li className="max-lg:min-w-fit">Services</li>
                            </Link>
                            <Link href={"/blogs"}>
                                <li className="max-lg:min-w-fit">Blog</li>
                            </Link>
                            <Link href={"/sales_point#"}>
                                <li className="max-lg:min-w-fit">Sales Point</li>
                            </Link>
                        </ul>
                        <div
                            className={`${
                                router.pathname != "/" ? "gap-6" : "lg:gap-[45px] max-lg:gap-[14px]"
                            } flex-i-center max-lg:!justify-between `}
                        >
                            <div
                                className={`flex-i-center gap-6 max-lg:gap-[14px] ${
                                    router.pathname != "/"
                                        ? "bg-rose-50 h-[38px] justify-center w-[136px] rounded-lg"
                                        : ""
                                }`}
                            >
                                {router.pathname != "/" && (
                                    <div className="w-5 h-5">
                                        <SearchSvg className="w-5 h-5" />
                                    </div>
                                )}
                                <FavouriteSvg />
                                <Link href={"/cart"}>
                                    <CartSvg />
                                </Link>
                            </div>
                            {/* Lang and flag */}
                            {/* <div
                className={`flex-i-center gap-2.5 ${
                  router.pathname != "/"
                    ? "bg-rose-50 h-[max-md:block 38px] justify-center w-[96px] rounded-lg"
                    : ""
                }`}
              >
                <img className="w-5 h-5 rounded-full" src="/assets/us.png" alt="USA" />
                <p>EN</p>
                <DownArrowSvg />
              </div> */}
                            <BurgerMenuSvg className={"md:hidden cursor-pointer"} />
                            {session && status === "authenticated" ? (
                                <div className="flex gap-2.5">
                                    <div className="flex-i-center gap-2.5">
                                        <img className="w-5 h-5 rounded-full" src="/assets/us.png" alt="USA" />
                                        <p>EN</p>
                                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                           <DownArrowSvg />
                                        </button>
                                        {isMenuOpen && (
                                            <button onClick={() => signOut()} className="absolute top-20  w-[120px] h-[40px] flex justify-center items-center gap-2.5 flex-col justify-center items-center gap-2.5 flex-col bg-[#F9F9F9]">
                                                Sign out
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <button className="max-md:hidden max-lg:min-w-fit max-lg:px-6 max-lg:h-9 lg:max-w-[120px] lg:min-w-[120px] h-10 rounded-lg border border-slate-800 justify-center items-center gap-2.5 flex  capitalize leading-loose" type="button" onClick={() => router.push("/login")}>
                                    Log in
                                </button>
                            )}
                           
                                        

                        </div>
                    </div>
                </nav>
            </Container>
        </div>
    );
}

export default Header;
