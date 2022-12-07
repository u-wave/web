import { fileURLToPath } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  clearScreen: false,
  build: {
    outDir: 'npm/public/',
    assetsDir: 'static',
    manifest: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        passwordReset: fileURLToPath(new URL('./src/password-reset/index.html', import.meta.url)),
      },
    },
  },
  server: {
    port: 6041,
    proxy: {
      '/api/socket': {
        target: 'http://127.0.0.1:6042',
        ws: true,
      },
      '/api': {
        target: 'http://127.0.0.1:6042',
      },
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    react(),
    yaml(),
  ],
});
