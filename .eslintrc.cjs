module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // 0 = off, 1 = warn, 2 = error
    "vue/no-unused-vars": 1,
    "vue/multi-word-component-names": 1,
    "vue/attribute-hyphenation": 0,
  },
};
