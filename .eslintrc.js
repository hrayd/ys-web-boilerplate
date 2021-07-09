module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["react-app", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "react-hooks/exhaustive-deps": "error",
  },
};
