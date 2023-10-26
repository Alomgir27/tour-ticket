import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/Layout/Layout";
import { SessionProvider } from "next-auth/react"
import Toast from "../components/Toast/Toast";
import { store } from "@/reduxStore/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "swiper/css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <Layout>
                    <NextNProgress
                        color="#ef4444"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={true}
                    />
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </Provider>
    );
}
