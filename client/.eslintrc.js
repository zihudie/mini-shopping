module.exports = {
  "extends": ["taro"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
   
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-function": [2]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true
  }
}
