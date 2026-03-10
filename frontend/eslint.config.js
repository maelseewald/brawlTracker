import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";

import js from "@eslint/js"
import teslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks"

export default defineConfig([
  js.configs.recommended,
  teslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      "react-refresh": reactRefresh,
    },

    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  }, globalIgnores(["**/dist", "**/eslint.config.cjs", "**/generated"])
]);
