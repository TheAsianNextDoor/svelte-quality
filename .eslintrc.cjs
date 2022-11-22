/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
    'vitest-globals/env': true,
  },
  settings: {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    'svelte3/typescript': () => require('typescript'),
    jest: {
      version: 28,
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vitest-globals/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['svelte3'],
  rules: {
    // import
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'unknown',
          'object',
          'type',
        ],
      },
    ],

    // misc
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
};

// module.exports = {
// 	root: true,
// 	parser: '@typescript-eslint/parser',
// 	extends: [
// 				'airbnb-base',
// 		'airbnb-typescript/base',
// 		'plugin:@typescript-eslint/recommended', 'prettier'],
// 	plugins: ['svelte3', '@typescript-eslint'],
// 	ignorePatterns: ['*.cjs'],
// 	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
// 	settings: {
// 		'svelte3/typescript': () => require('typescript')
// 	},
// 	parserOptions: {
// 		sourceType: 'module',
// 		ecmaVersion: 2020,
// 		project: './tsconfig.eslint.json',
// 	},
// 	env: {
// 		browser: true,
// 		es2017: true,
// 		node: true
// 	}
// };
