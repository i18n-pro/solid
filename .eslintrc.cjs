module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:solid/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'solid'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'solid/style-prop': 0,
    'solid/prefer-for': 0,
  },
}
