module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['standard'],
  plugins: [
    'prettier',
    'eslint-plugin-standard',
    'eslint-plugin-promise',
    'eslint-plugin-node',
    'eslint-plugin-import',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
}
