module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    "commonjs": true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-var-requires": "off",
    "no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": false,
        "variables": false
      }
    ],

    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "react/no-unknown-property": 0,
    "no-console": 0,
    "no-undef": 0,
    "no-plusplus": 0,
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        printWidth: 150,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
      },
    ],
  },
};
