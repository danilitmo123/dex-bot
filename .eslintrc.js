module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["./src"],
      },
    },
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    // "plugin:prettier/recommended",
  ],
  ignorePatterns: ["**/node_modules/**"],
  rules: {
    "no-debugger": "off",
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "no-plusplus": "off",
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "no-underscore-dangle": "off",
    // Start temporary rules
    // These rules are here just to keep the lint error to "off" during the migration to the new rule set
    // They need to be removed and fixed as soon as possible
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    radix: "off",
    "import/no-extraneous-dependencies": "off",
    "react/require-default-props": "off",
    "react/no-unused-prop-types": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react-hooks/exhaustive-deps": "off",
    "import/no-cycle": "off",
    "no-void": "off",
    "consistent-return": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    // End temporary rules
  },
};
