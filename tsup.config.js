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
    esbuildPlugins: [
      sassPlugin({
        type: 'css',
      }),
    ],
    onSuccess: async () => {
      const indexCss = path.resolve('dist/index.css');
      const styleCss = path.resolve('dist/style.css');
      fs.renameSync(indexCss, styleCss);
    },
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
