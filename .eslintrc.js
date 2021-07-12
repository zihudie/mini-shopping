module.exports = {
  "extends": ["taro"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    'no-console': 'off',
    'no-alert': 0, //禁止使用alert confirm prompt
    'no-var': 0, //禁用var，用let和const代替
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "@typescript-eslint/no-unused-vars": [2, { "varsIgnorePattern": "Taro" }],

    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-function": [1]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true
  }
}
