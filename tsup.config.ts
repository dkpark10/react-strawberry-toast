import { defineConfig, Options } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

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
      js: '"use client";'
    },  
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
