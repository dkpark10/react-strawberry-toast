const createMDX = require('@next/mdx');

const withMdx = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  transpilePackages: ['react-strawberry-toast'],

  trailingSlash: true,

  assetPrefix:
    process.env.NODE_ENV === 'production' && process.env.NEXT_BUILD !== 'LOCAL'
      ? '/react-strawberry-toast'
      : '',

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    return config;
  },
};

module.exports = withMdx(nextConfig);
