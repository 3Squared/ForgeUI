module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },

  plugins: ["vue", "@typescript-eslint", "unused-imports"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/no-mutating-props": "off",
  },
};
