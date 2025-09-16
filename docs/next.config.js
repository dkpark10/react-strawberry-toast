const createMDX = require('@next/mdx');
const remarkFrontmatter = require("remark-frontmatter");
const remarkMdxFrontmatter = require("remark-mdx-frontmatter");
const remarkGfm = require("remark-gfm");

const withMdx = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  transpilePackages: ['react-strawberry-toast'],

  trailingSlash: true,

  basePath:
    process.env.NODE_ENV === 'production' && process.env.NEXT_BUILD !== 'LOCAL'
      ? '/react-strawberry-toast'
      : '',

  images: {
    unoptimized: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withMdx(nextConfig);
