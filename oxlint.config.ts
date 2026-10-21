import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: [
    'eslint',
    'import',
    'jest',
    'jsx-a11y',
    'react',
    'react-perf',
    'typescript',
    'vitest',
  ],
  jsPlugins: [
    'eslint-plugin-compat',
  ],
});
