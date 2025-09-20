const { defineConfig } = require('tsup');
const { sassPlugin } = require('esbuild-sass-plugin');
const path = require('path');
const fs = require('fs');

export default defineConfig([
  {
    minify: true,
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    entry: ['src/index.ts'],
    outDir: 'dist',
    external: ['react', 'react-dom'],
    platform: 'browser',
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: ['src/styles/style.scss', 'src/styles/style2.scss', 'src/styles/style3.scss'],
    minify: true,
    esbuildPlugins: [
      sassPlugin({
        type: 'css',
      }),
    ],
  },
  {
    minify: true,
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    entry: ['src/headless.ts'],
    platform: 'browser',
    outDir: 'dist',
    external: ['react', 'react-dom'],
  },
]);
