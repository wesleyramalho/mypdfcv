import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Disable alt-text rule for PDF renderer files (Image component doesn't support alt)
  {
    files: ["src/components/pdf/**"],
    rules: {
      "jsx-a11y/alt-text": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore Claude Code worktrees and test artifacts:
    ".claude/**",
    "playwright-report/**",
    "test-results/**",
    "e2e/**",
  ]),
  // Downgrade new react-hooks rule to warning (pre-existing patterns use setState in effects)
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Disable formatting rules that conflict with Prettier
  prettierConfig,
]);

export default eslintConfig;
