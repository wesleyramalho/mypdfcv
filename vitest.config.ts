import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "packages/*/src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/**/*.d.ts", "src/**/types/**"],
    },
  },
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});
