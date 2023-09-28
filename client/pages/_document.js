import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
    return (
        <Html lang="en" style={{ scrollBehavior: "smooth" }}>
            <Head />
            <body className="font-inter text-slate-800">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
