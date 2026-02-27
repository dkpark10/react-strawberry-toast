const { defineConfig } = require('tsup');
const { sassPlugin } = require('esbuild-sass-plugin');
const fs = require('fs');

const removeDataTestId = async (files) => {
  const removeDataTestIdImpl = (code) =>
    code.replace(/"data-testid":\s*(`[^`]*`|"[^"]*"|[^,}]+),?/g, '');

  for (const file of files) {
    const content = await fs.promises.readFile(file, 'utf8');
    await fs.promises.writeFile(file, removeDataTestIdImpl(content));
  }
}

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
    async onSuccess() {
      await removeDataTestId(['dist/index.js', 'dist/index.mjs']);
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
    async onSuccess() {
      await removeDataTestId(['dist/headless.js', 'dist/headless.mjs']);
    },
  },
]);
