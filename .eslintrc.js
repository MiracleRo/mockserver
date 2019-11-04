module.exports = {
  "root": true,
  "extends": [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "vue/singleline-html-element-content-newline": 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-indent': 0,
  }
};