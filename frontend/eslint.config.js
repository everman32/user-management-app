import globals from "globals";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintReactPlugin from "eslint-plugin-react";
import eslintImportPlugin from "eslint-plugin-import";
import eslintJsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default [
  {
    ignores: ["**/build/", "*.config.js"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    ...eslintReactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ...eslintReactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    ...eslintJsxA11yPlugin.flatConfigs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  eslintImportPlugin.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
    languageOptions: {
      ecmaVersion: "latest",
    },
  },
  eslintPluginPrettierRecommended,
];
