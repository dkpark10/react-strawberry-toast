/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },

  transpilePackages: ['react-strawberry-toast'],

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
