module.exports = {
  root: true,
  extends: [
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
