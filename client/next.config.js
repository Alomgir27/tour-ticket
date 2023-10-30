/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["via.placeholder.com", "previews.123rf.com", "images.pexels.com", "cdn.ventrata.com", "localhost", "lh3.googleusercontent", "images.unsplash.com"],
    },
};

module.exports = nextConfig;
