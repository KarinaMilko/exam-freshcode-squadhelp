import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  plugins: [
    {
      name: 'transform-js-to-jsx',
      async transform (code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: browserslistToEsbuild([
      '>0.2%',
      'not dead',
      'not ie <= 11',
      'not op_mini all',
    ]),
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
