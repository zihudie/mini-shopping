module.exports = {
  "extends": ["taro", 
  "plugin:@typescript-eslint/recommended",
  'standard',
  'taro/react',
  'prettier',],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "@typescript-eslint/member-delimiter-style": {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "none",
        "requireLast": false
      }
    },
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-function": ["warn"]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true
  }
}