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
  ]
};