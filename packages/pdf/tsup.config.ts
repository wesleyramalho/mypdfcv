import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/server.ts", "src/client.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "@react-pdf/renderer", "@mypdfcv/i18n", "@mypdfcv/i18n/server"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
