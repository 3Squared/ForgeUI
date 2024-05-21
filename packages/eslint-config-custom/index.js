module.exports = {
  ignorePatterns: ["*.vue.d.ts", "dist/**", "icons.ts"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "@vue/typescript",
    "@vue/prettier",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["unused-imports"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "tabWidth": 2,
        "useTabs": false,
        "printWidth": 160,
        "singleQuote": false,
        "trailingComma": "none",
        "bracketSpacing": true,
        "bracketSemiLine": false,
        "arrowParens": "always",
        "endOfLine": "auto",
        htmlWhitespaceSensitivity: "ignore"
      }
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-undef": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/require-prop-types": "error",
    "vue/this-in-template": ["error", "never"],
    "vue/max-attributes-per-line": "off",
    "vue/require-v-for-key": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-useless-escape": "warn",
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always"
      }
    ],
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": "off",
    //turned off to pass build
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-var-requires": "warn"
  },
};
