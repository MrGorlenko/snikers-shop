/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "api.thepara.shop"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets")],
  },
};

module.exports = nextConfig;
