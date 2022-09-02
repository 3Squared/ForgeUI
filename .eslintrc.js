module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-prop-types': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/max-attributes-per-line': 'off',
    'vue/require-prop-type-constructor': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true
      }
    }
  ],

  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:vue/strongly-recommended', '@vue/typescript']
};
