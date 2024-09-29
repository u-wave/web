// @ts-check
/// <reference types="vitest">
import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';
import emoji from './tasks/emoji.mjs';
import prerender from './tasks/prerender.mjs';

const inputPkg = new URL('./package.json', import.meta.url);
const outputPkg = new URL('./npm/package.json', import.meta.url);

export default defineConfig({
  clearScreen: false,
  legacy: {
    // For the prerender plugin
    proxySsrExternalModules: true,
  },
  build: {
    outDir: 'npm/public/',
    assetsDir: 'static',
    manifest: true,
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
    watch: {
      ignored: ['npm/**'],
    },
  },
  plugins: [
    react(),
    yaml(),
    prerender({ file: 'index.html', source: 'src/index.tsx' }),
    prerender({ file: 'password-reset.html', source: 'src/password-reset/index.jsx' }),
    prerender({ file: 'privacy.html', source: 'src/markdown.tsx', props: { path: 'static/privacy.md' } }),
    emoji(),
    {
      name: 'u-wave-write-package-version',
      apply: 'build',
      async closeBundle() {
        const { version } = JSON.parse(await readFile(inputPkg, 'utf8'));
        const pkg = JSON.parse(await readFile(outputPkg, 'utf8'));
        pkg.version = version;
        await writeFile(outputPkg, `${JSON.stringify(pkg, null, 2)}\n`);
      },
    },
  ],
  test: {
    include: ['**/__tests__/*.{js,jsx,ts,tsx}'],
    globals: true,
    coverage: {
      exclude: ['npm/**'],
    },
    environment: 'jsdom',
    setupFiles: './test/setup.mjs',
  },
});
