/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  transpilePackages: ['react-strawberry-toast'],

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
