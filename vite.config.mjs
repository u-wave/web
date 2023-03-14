import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';
import prerender from './tasks/prerender.mjs';

const inputPkg = new URL('./package.json', import.meta.url);
const outputPkg = new URL('./npm/package.json', import.meta.url);

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '@mui/base': '@mui/base/modern',
      '@mui/icons-material': '@mui/icons-material/esm',
      '@mui/material': '@mui/material/modern',
      '@mui/styled-engine': '@mui/styled-engine/modern',
      '@mui/system': '@mui/system/modern',
      '@mui/utils': '@mui/utils/modern',
    },
  },
  build: {
    outDir: 'npm/public/',
    assetsDir: 'static',
    manifest: true,
    // This will be filled in by the `prerender` plugin.
    input: {},
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
    splitVendorChunkPlugin(),
    react(),
    yaml(),
    prerender({ file: 'index.html', source: 'src/index.jsx' }),
    prerender({ file: 'password-reset.html', source: 'src/password-reset/index.jsx' }),
    prerender({ file: 'privacy.html', source: 'src/markdown.jsx', props: { path: 'static/privacy.md' } }),
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
});
