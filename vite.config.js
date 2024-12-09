import { defineConfig } from 'vite';
import wyw from '@wyw-in-js/vite';
import path from 'path'

export default defineConfig(() => ({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    wyw({
      include: ['./src/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
}));
