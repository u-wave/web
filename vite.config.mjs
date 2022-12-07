import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  clearScreen: false,
  build: {
    outDir: 'npm/public/',
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
    react(),
    yaml(),
  ],
});
