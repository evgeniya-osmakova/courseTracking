module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    indent: ['error', 4],
    'no-console': 1,
    'no-debugger': 2,
    'no-extra-semi': 1,
    'no-unexpected-multiline': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal', 'index', 'parent', 'sibling'], 'unknown'],
        pathGroups: [
          {
            pattern: '(utils|global|packages|providers|services|types)/**/*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '*.css',
            patternOptions: { matchBase: true },
            group: 'unknown',
            position: 'after',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-multi-spaces': [1, {
      exceptions: {},
    }],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
