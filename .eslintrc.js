module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/base',
    '@vue/airbnb',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 3 },
      ObjectPattern: { multiline: true, minProperties: 3 },
      ImportDeclaration: { multiline: true, minProperties: 3 },
      ExportDeclaration: { multiline: true, minProperties: 3 },
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: { jest: true },
    },
  ],
};
