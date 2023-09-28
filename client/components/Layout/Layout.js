import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "../Index/Hero";
import { useRouter } from "next/router";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import Loading from "../Utils/Loading";

function Layout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (!session && status === "authenticated") {
    //         if (router.pathname != "/login" && router.pathname != "/signup") {
    //             router.push("/login");
    //         }
    //     }
    // }, [session, router, status]);

    useEffect(() => {
        if (session && status === "authenticated") {
            if (router.pathname == "/login" || router.pathname == "/signup") {
                router.push("/");
            }
        }
    }, [session, router, status]);


    if (status === "loading") {
        return <Loading />;
    }


    return (
        // Make header top hero and childrens fill all screen and footer bottom
        <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
            {router.pathname == "/" && (
                <div className="absolute z-0 w-full h-[810px] bg-gradient-to-b from-orange-50 to-orange-100/0" />
            )}
            {/* {router.pathname != "/login" && router.pathname != "/signup" && ( */}
               <Header />
            {/* )} */}
            {router.pathname == "/" && <Hero />}
            {children}
            {/* {router.pathname != "/login" && router.pathname != "/signup" &&  */}
            <Footer />
             {/* } */}
        </div>
    );
}

export default Layout;
