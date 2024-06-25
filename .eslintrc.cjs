'use strict';

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  plugins: [
    'eslint-plugin-compat',
    'eslint-plugin-import',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jsx-a11y',
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    // Makes no sense
    'max-classes-per-file': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // Modify eslint-config-airbnb's rule to allow ForOfStatement
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    // Not sure what this is doing internally but it's not doing the right thing
    'react/no-is-mounted': 'off',
    // Not true anymore
    'react/react-in-jsx-scope': 'off',
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
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    'jsx-a11y/control-has-associated-label': [
      'warn',
      require('eslint-config-airbnb/rules/react-a11y')
        .rules['jsx-a11y/control-has-associated-label'][1],
    ],
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
    'import/core-modules': [
      'virtual:emoji-shortcodes',
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
      files: ['src/reducers/*'],
      rules: {
        // Reducers use default params differently
        'default-param-last': 'off',
        'no-param-reassign': ['error', {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        }],
      },
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
      plugins: ['eslint-plugin-vitest', 'eslint-plugin-jest-dom', 'eslint-plugin-testing-library'],
      extends: ['plugin:vitest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      env: {
        jest: true,
      },
    },
  ],
};
