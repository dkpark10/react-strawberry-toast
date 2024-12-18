import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => ({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js',
  },
}));
