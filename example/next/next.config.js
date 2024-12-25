/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  reactStrictMode: true,

  transpilePackages: ['react-strawberry-toast'],

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
