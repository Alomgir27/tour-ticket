const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    domains: ["img.pokemondb.net", "localhost"],

  },
  exportPathMap: async function () {
    return {
       "/": { page: "/login" },
    };
  },
};

module.exports = nextConfig;
