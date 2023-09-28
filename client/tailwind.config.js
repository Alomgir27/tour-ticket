/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "top-places": "repeat(auto-fit,minmax(min(300px,100%),1fr))",
                "service-cards": "repeat(auto-fit,minmax(min(280px,100%),1fr))",
                footer: "repeat(auto-fit,minmax(min(140px,100%),1fr))",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            screens: {
                customScrOne: "1401px",
                xs: "416px",
            },
            colors: {},
        },
    },
    plugins: [],
};
