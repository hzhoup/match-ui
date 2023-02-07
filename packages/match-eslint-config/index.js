module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
    browser: true
  },
  rules: {}
}
