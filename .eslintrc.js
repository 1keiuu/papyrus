module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'import/extensions':0,
    'semi':0,
    'quotes': 0,
    'comma-spacing': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 1,
    'comma-dangle':0,
    'key-spacing':0,
    'max-len':0,
    'no-console':0,
    'comma-dangle':0,
    'global-require': 1,
    'import/newline-after-import':0,
    'object-shorthand':0,
    'prefer-arrow-callback':0,
    'func-names':0,
    'import/prefer-default-export':0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
