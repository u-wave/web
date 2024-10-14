import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactCompiler from 'eslint-plugin-react-compiler';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import compat from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import vitest from 'eslint-plugin-vitest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

// Mostly based on eslint-config-airbnb.
// TODO(@goto-bus-stop): perhaps replace by prettier :shrug:
const styleRules = {
  // enforce line breaks after opening and before closing array brackets
  // https://eslint.org/docs/rules/array-bracket-newline
  'array-bracket-newline': ['error', 'consistent'],

  // enforce spacing inside array brackets
  'array-bracket-spacing': ['error', 'never'],

  // enforce spacing inside single-line blocks
  // https://eslint.org/docs/rules/block-spacing
  'block-spacing': ['error', 'always'],

  // enforce one true brace style
  'brace-style': ['error', '1tbs', { allowSingleLine: true }],

  // require camel case names
  camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],

  // enforce or disallow capitalization of the first letter of a comment
  // https://eslint.org/docs/rules/capitalized-comments
  'capitalized-comments': ['off', 'never', {
    line: {
      ignorePattern: '.*',
      ignoreInlineComments: true,
      ignoreConsecutiveComments: true,
    },
    block: {
      ignorePattern: '.*',
      ignoreInlineComments: true,
      ignoreConsecutiveComments: true,
    },
  }],

  // require trailing commas in multiline object literals
  'comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'always-multiline',
  }],

  // enforce spacing before and after comma
  'comma-spacing': ['error', { before: false, after: true }],

  // enforce one true comma style
  'comma-style': ['error', 'last', {
    exceptions: {
      ArrayExpression: false,
      ArrayPattern: false,
      ArrowFunctionExpression: false,
      CallExpression: false,
      FunctionDeclaration: false,
      FunctionExpression: false,
      ImportDeclaration: false,
      ObjectExpression: false,
      ObjectPattern: false,
      VariableDeclaration: false,
      NewExpression: false,
    },
  }],

  // disallow padding inside computed properties
  'computed-property-spacing': ['error', 'never'],

  // enforces consistent naming when capturing the current execution context
  'consistent-this': 'off',

  // enforce newline at the end of file, with no multiple empty lines
  'eol-last': ['error', 'always'],

  // https://eslint.org/docs/rules/function-call-argument-newline
  'function-call-argument-newline': ['error', 'consistent'],

  // enforce spacing between functions and their invocations
  // https://eslint.org/docs/rules/func-call-spacing
  'func-call-spacing': ['error', 'never'],

  // requires function names to match the name of the variable or property to which they are
  // assigned
  // https://eslint.org/docs/rules/func-name-matching
  'func-name-matching': ['off', 'always', {
    includeCommonJSModuleExports: false,
    considerPropertyDescriptor: true,
  }],

  // require function expressions to have a name
  // https://eslint.org/docs/rules/func-names
  'func-names': 'warn',

  // enforces use of function declarations or expressions
  // https://eslint.org/docs/rules/func-style
  // TODO: enable
  'func-style': ['off', 'expression'],

  // require line breaks inside function parentheses if there are line breaks between parameters
  // https://eslint.org/docs/rules/function-paren-newline
  'function-paren-newline': ['error', 'multiline-arguments'],

  // disallow specified identifiers
  // https://eslint.org/docs/rules/id-denylist
  'id-denylist': 'off',

  // this option enforces minimum and maximum identifier lengths
  // (variable names, property names etc.)
  'id-length': 'off',

  // require identifiers to match the provided regular expression
  'id-match': 'off',

  // Enforce the location of arrow function bodies with implicit returns
  // https://eslint.org/docs/rules/implicit-arrow-linebreak
  'implicit-arrow-linebreak': ['error', 'beside'],

  // this option sets a specific tab width for your code
  // https://eslint.org/docs/rules/indent
  indent: ['error', 2, {
    SwitchCase: 1,
    VariableDeclarator: 1,
    outerIIFEBody: 1,
    // MemberExpression: null,
    FunctionDeclaration: {
      parameters: 1,
      body: 1,
    },
    FunctionExpression: {
      parameters: 1,
      body: 1,
    },
    CallExpression: {
      arguments: 1,
    },
    ArrayExpression: 1,
    ObjectExpression: 1,
    ImportDeclaration: 1,
    flatTernaryExpressions: false,
    // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
    ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
    ignoreComments: false,
  }],

  // specify whether double or single quotes should be used in JSX attributes
  // https://eslint.org/docs/rules/jsx-quotes
  'jsx-quotes': ['off', 'prefer-double'],

  // enforces spacing between keys and values in object literal properties
  'key-spacing': ['error', { beforeColon: false, afterColon: true }],

  // require a space before & after certain keywords
  'keyword-spacing': ['error', {
    before: true,
    after: true,
    overrides: {
      return: { after: true },
      throw: { after: true },
      case: { after: true },
    },
  }],

  // enforce position of line comments
  // https://eslint.org/docs/rules/line-comment-position
  // TODO: enable?
  'line-comment-position': ['off', {
    position: 'above',
    ignorePattern: '',
    applyDefaultPatterns: true,
  }],

  // disallow mixed 'LF' and 'CRLF' as linebreaks
  // https://eslint.org/docs/rules/linebreak-style
  'linebreak-style': ['error', 'unix'],

  // require or disallow an empty line between class members
  // https://eslint.org/docs/rules/lines-between-class-members
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],

  // enforces empty lines around comments
  'lines-around-comment': 'off',

  // require or disallow newlines around directives
  // https://eslint.org/docs/rules/lines-around-directive
  'lines-around-directive': ['error', {
    before: 'always',
    after: 'always',
  }],

  // Require or disallow logical assignment logical operator shorthand
  // https://eslint.org/docs/latest/rules/logical-assignment-operators
  // TODO, semver-major: enable
  'logical-assignment-operators': ['off', 'always', {
    enforceForIfStatements: true,
  }],

  // specify the maximum depth that blocks can be nested
  'max-depth': ['off', 4],

  // specify the maximum length of a line in your program
  // https://eslint.org/docs/rules/max-len
  'max-len': ['error', 100, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],

  // specify the max number of lines in a file
  // https://eslint.org/docs/rules/max-lines
  'max-lines': ['off', {
    max: 300,
    skipBlankLines: true,
    skipComments: true,
  }],

  // enforce a maximum function length
  // https://eslint.org/docs/rules/max-lines-per-function
  'max-lines-per-function': ['off', {
    max: 50,
    skipBlankLines: true,
    skipComments: true,
    IIFEs: true,
  }],

  // specify the maximum depth callbacks can be nested
  'max-nested-callbacks': 'off',

  // limits the number of parameters that can be used in the function declaration.
  'max-params': ['off', 3],

  // specify the maximum number of statement allowed in a function
  'max-statements': ['off', 10],

  // restrict the number of statements per line
  // https://eslint.org/docs/rules/max-statements-per-line
  'max-statements-per-line': ['off', { max: 1 }],

  // enforce a particular style for multiline comments
  // https://eslint.org/docs/rules/multiline-comment-style
  'multiline-comment-style': ['off', 'starred-block'],

  // require multiline ternary
  // https://eslint.org/docs/rules/multiline-ternary
  // TODO: enable?
  'multiline-ternary': ['off', 'never'],

  // require a capital letter for constructors
  'new-cap': ['error', {
    newIsCap: true,
    newIsCapExceptions: [],
    capIsNew: false,
    capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
  }],

  // disallow the omission of parentheses when invoking a constructor with no arguments
  // https://eslint.org/docs/rules/new-parens
  'new-parens': 'error',

  // allow/disallow an empty newline after var statement
  'newline-after-var': 'off',

  // https://eslint.org/docs/rules/newline-before-return
  'newline-before-return': 'off',

  // enforces new line after each method call in the chain to make it
  // more readable and easy to maintain
  // https://eslint.org/docs/rules/newline-per-chained-call
  'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

  // disallow use of the Array constructor
  'no-array-constructor': 'error',

  // disallow use of bitwise operators
  // https://eslint.org/docs/rules/no-bitwise
  'no-bitwise': 'error',

  // disallow comments inline after code
  'no-inline-comments': 'off',

  // disallow if as the only statement in an else block
  // https://eslint.org/docs/rules/no-lonely-if
  'no-lonely-if': 'error',

  // disallow un-paren'd mixes of different operators
  // https://eslint.org/docs/rules/no-mixed-operators
  'no-mixed-operators': ['error', {
    // the list of arithmetic groups disallows mixing `%` and `**`
    // with other arithmetic operators.
    groups: [
      ['%', '**'],
      ['%', '+'],
      ['%', '-'],
      ['%', '*'],
      ['%', '/'],
      ['/', '*'],
      ['&', '|', '<<', '>>', '>>>'],
      ['==', '!=', '===', '!=='],
      ['&&', '||'],
    ],
    allowSamePrecedence: false,
  }],

  // disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': 'error',

  // disallow use of chained assignment expressions
  // https://eslint.org/docs/rules/no-multi-assign
  'no-multi-assign': ['error'],

  // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning
  // https://eslint.org/docs/rules/no-multiple-empty-lines
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

  // disallow negated conditions
  // https://eslint.org/docs/rules/no-negated-condition
  'no-negated-condition': 'off',

  // disallow nested ternary expressions
  'no-nested-ternary': 'error',

  // disallow use of the Object constructor
  'no-new-object': 'error',

  // disallow use of unary operators, ++ and --
  // https://eslint.org/docs/rules/no-plusplus
  'no-plusplus': 'error',

  // disallow certain syntax forms
  // https://eslint.org/docs/rules/no-restricted-syntax
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

  // disallow space between function identifier and application
  // deprecated in favor of func-call-spacing
  'no-spaced-func': 'off',

  // disallow tab characters entirely
  'no-tabs': 'error',

  // disallow the use of ternary operators
  'no-ternary': 'off',

  // disallow trailing whitespace at the end of lines
  'no-trailing-spaces': ['error', {
    skipBlankLines: false,
    ignoreComments: false,
  }],

  // disallow dangling underscores in identifiers
  // https://eslint.org/docs/rules/no-underscore-dangle
  'no-underscore-dangle': ['error', {
    allow: ['_id'],
    allowAfterThis: false,
    allowAfterSuper: false,
    enforceInMethodNames: true,
  }],

  // disallow the use of Boolean literals in conditional expressions
  // also, prefer `a || b` over `a ? a : b`
  // https://eslint.org/docs/rules/no-unneeded-ternary
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],

  // disallow whitespace before properties
  // https://eslint.org/docs/rules/no-whitespace-before-property
  'no-whitespace-before-property': 'error',

  // enforce the location of single-line statements
  // https://eslint.org/docs/rules/nonblock-statement-body-position
  'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],

  // require padding inside curly braces
  'object-curly-spacing': ['error', 'always'],

  // enforce line breaks between braces
  // https://eslint.org/docs/rules/object-curly-newline
  'object-curly-newline': ['error', {
    ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
  }],

  // enforce "same line" or "multiple line" on object properties.
  // https://eslint.org/docs/rules/object-property-newline
  'object-property-newline': ['error', {
    allowAllPropertiesOnSameLine: true,
  }],

  // allow just one var statement per function
  'one-var': ['error', 'never'],

  // require a newline around variable declaration
  // https://eslint.org/docs/rules/one-var-declaration-per-line
  'one-var-declaration-per-line': ['error', 'always'],

  // require assignment operator shorthand where possible or prohibit it entirely
  // https://eslint.org/docs/rules/operator-assignment
  'operator-assignment': ['error', 'always'],

  // Requires operator at the beginning of the line in multiline statements
  // https://eslint.org/docs/rules/operator-linebreak
  'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],

  // disallow padding within blocks
  'padded-blocks': ['error', {
    blocks: 'never',
    classes: 'never',
    switches: 'never',
  }, {
    allowSingleLineBlocks: true,
  }],

  // Require or disallow padding lines between statements
  // https://eslint.org/docs/rules/padding-line-between-statements
  'padding-line-between-statements': 'off',

  // Disallow the use of Math.pow in favor of the ** operator
  // https://eslint.org/docs/rules/prefer-exponentiation-operator
  'prefer-exponentiation-operator': 'error',

  // Prefer use of an object spread over Object.assign
  // https://eslint.org/docs/rules/prefer-object-spread
  'prefer-object-spread': 'error',

  // require quotes around object literal property names
  // https://eslint.org/docs/rules/quote-props.html
  'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

  // specify whether double or single quotes should be used
  quotes: ['error', 'single', { avoidEscape: true }],

  // do not require jsdoc
  // https://eslint.org/docs/rules/require-jsdoc
  'require-jsdoc': 'off',

  // require or disallow use of semicolons instead of ASI
  semi: ['error', 'always'],

  // enforce spacing before and after semicolons
  'semi-spacing': ['error', { before: false, after: true }],

  // Enforce location of semicolons
  // https://eslint.org/docs/rules/semi-style
  'semi-style': ['error', 'last'],

  // requires object keys to be sorted
  'sort-keys': ['off', 'asc', { caseSensitive: false, natural: true }],

  // sort variables within the same declaration block
  'sort-vars': 'off',

  // require or disallow space before blocks
  'space-before-blocks': 'error',

  // require or disallow space before function opening parenthesis
  // https://eslint.org/docs/rules/space-before-function-paren
  'space-before-function-paren': ['error', {
    anonymous: 'always',
    named: 'never',
    asyncArrow: 'always',
  }],

  // require or disallow spaces inside parentheses
  'space-in-parens': ['error', 'never'],

  // require spaces around operators
  'space-infix-ops': 'error',

  // Require or disallow spaces before/after unary operators
  // https://eslint.org/docs/rules/space-unary-ops
  'space-unary-ops': ['error', {
    words: true,
    nonwords: false,
    overrides: {
    },
  }],

  // require or disallow a space immediately following the // or /* in a comment
  // https://eslint.org/docs/rules/spaced-comment
  'spaced-comment': ['error', 'always', {
    line: {
      exceptions: ['-', '+'],
      markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
    },
    block: {
      exceptions: ['-', '+'],
      markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
      balanced: true,
    },
  }],

  // Enforce spacing around colons of switch statements
  // https://eslint.org/docs/rules/switch-colon-spacing
  'switch-colon-spacing': ['error', { after: true, before: false }],

  // Require or disallow spacing between template tags and their literals
  // https://eslint.org/docs/rules/template-tag-spacing
  'template-tag-spacing': ['error', 'never'],

  // require or disallow the Unicode Byte Order Mark
  // https://eslint.org/docs/rules/unicode-bom
  'unicode-bom': ['error', 'never'],

  // require regex literals to be wrapped in parentheses
  'wrap-regex': 'off',
};

export default [
  { ignores: ['coverage/**', 'npm/public/**'] },

  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  compat.configs['flat/recommended'],

  {
    files: ['**/*.{mjs,js,ts,mts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    files: ['**/*.{mjs,cjs,js,ts,mts,cts,jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
      },

      globals: {
        process: 'readonly',
      },
    },

    rules: {
      'arrow-body-style': 'off',
      'no-underscore-dangle': ['error', { allow: ['_id'] }],

      // Not sure what this is doing internally but it's not doing the right thing
      'react/no-is-mounted': 'off',
      // Not true anymore
      'react/react-in-jsx-scope': 'off',
      // Nobody cares
      'react/display-name': 'off',
      // 'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
      // 'react/forbid-prop-types': 'off',
      // 'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/static-property-placement': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/function-component-definition': ['off', {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      // Not following this at the moment
      'jsx-a11y/no-autofocus': 'warn',
      'react-compiler/react-compiler': 'warn',
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
  },

  {
    files: ['src/**/*.{mjs,cjs,js,ts,mts,cts,jsx,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }],
    },
    settings: {
      'import/core-modules': [
        'virtual:emoji-shortcodes',
      ],
    },
  },

  { rules: styleRules },

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-compiler/react-compiler': 'warn',
    },
  },

  ts.configs.eslintRecommended,
  ...ts.configs.recommended,

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
    files: ['src/**/*.{mjs,cjs,js,ts,mts,cts,jsx,tsx}'],
    rules: {
      'compat/compat': 'error',
    },
  },

  {
    files: ['**/__tests__/**/*.{js,jsx}'],
    plugins: {
      vitest,
      'jest-dom': jestDom,
      'testing-library': testingLibrary,
    },
    languageOptions: {
      globals: vitest.environments.env.globals,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      // testingLibrary.configs['flat/react'].rules,
    },
  },
];
