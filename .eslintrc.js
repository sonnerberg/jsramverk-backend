module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  plugins: ['mocha'],
  extends: ['eslint:recommended', 'plugin:mocha/recommended'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
  },
}
