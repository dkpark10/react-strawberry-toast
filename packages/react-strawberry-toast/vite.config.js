import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js',
    dir: './tests/unit',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.{ts,tsx}'],
    },
  },
});
