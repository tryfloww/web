/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yt3.ggpht.com"],
  },
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
  },
};

export default nextConfig;
