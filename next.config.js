/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "womanadvice.ru",
      "images.ua.prom.st",
      "i.pinimg.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets")],
  },
};

module.exports = nextConfig;
