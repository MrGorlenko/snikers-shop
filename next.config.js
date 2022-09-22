/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "static.nike.com",
      "assets.adidas.com",
      "media.gucci.com",
      "images.puma.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets")],
  },
};

module.exports = nextConfig;
