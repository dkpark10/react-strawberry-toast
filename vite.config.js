import path from 'path';
import { copyFileSync } from 'fs';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import preserveDirectives from 'rollup-preserve-directives';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  if (env.VITE_HEADLESS === 'true') {
    return {
      plugins: [
        dts({
          rollupTypes: true,
          beforeWriteFile: (typeFilePath) => {
            if (typeFilePath === path.resolve(__dirname, 'dist/index.d.ts')) {
              const targetPath = path.resolve(__dirname, 'dist/headless.d.ts');
              copyFileSync(typeFilePath, targetPath);
            }
          },
        }),
      ],
      build: {
        emptyOutDir: false,
        minify: true,
        lib: {
          entry: path.resolve(__dirname, 'src/hooks/use-strawberry-toast.ts'),
          formats: ['es', 'cjs'],
          fileName: 'headless',
        },
        outDir: 'dist',
        rollupOptions: {
          external: ['react', 'react-dom'],
        },
      },
    };
  }

  return {
    plugins: [
      dts({
        rollupTypes: true,
      }),
      svgr(),
      preserveDirectives(),
    ],
    build: {
      emptyOutDir: false,
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
  };
});
