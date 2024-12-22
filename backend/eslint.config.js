import globals from "globals";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintImportPlugin from "eslint-plugin-import";
import eslintSonarjsPlugin from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    ignores: ["**/build/", "*.config.js"],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  eslintImportPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "import/no-named-as-default": "off",
    },
  },
  eslintSonarjsPlugin.configs.recommended,
  {
    rules: {
      "sonarjs/cors": "off",
      "sonarjs/x-powered-by": "off",
      "sonarjs/public-static-readonly": "off",
    },
  },
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/prevent-abbreviations": "off",
    },
  },
  eslintPluginPrettierRecommended,
];
