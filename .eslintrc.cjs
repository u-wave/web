'use strict';

module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],

  plugins: ['compat', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2022,
  },

  rules: {
    'arrow-body-style': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/function-component-definition': ['off', {
      namedComponents: 'function-declaration',
      unnamedComponents: 'arrow-function',
    }],
  },

  settings: {
    polyfills: [
      'Array.from',
      'Number.isFinite',
      'Number.isNaN',
      'Object.assign',
      'Object.is',
      'Object.values',
      'Promise',
      'AbortController',
      'fetch',
      'Headers',
      'URL',
      'CSS.escape',
    ],
  },

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },

    {
      files: ['src/**/*.{js,jsx}'],
      rules: {
        'compat/compat': 'error',
      },
    },
    {
      files: ['tasks/**/*.{js,jsx}', '*.config.js', '.eslintrc.js', 'test/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        'no-console': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.{js,jsx}'],
      plugins: ['eslint-plugin-jest', 'eslint-plugin-jest-dom', 'eslint-plugin-testing-library'],
      extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      env: {
        jest: true,
      },
    },
  ],
};
