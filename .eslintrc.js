module.exports = {
  extends: ['airbnb-typescript'],
  ignorePatterns: [
    '*.js',
    'serviceWorker.ts'
  ],
  rules: {
    "import/no-extraneous-dependencies": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/prop-types": ["off"]
  },
  parserOptions: {
    project: './tsconfig.json'
  }
};

