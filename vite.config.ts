import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "MeliaApi",
      formats: ["es", "cjs", "iife"],
      fileName(format, entryName) {
        const extensions: Record<string, string> = {
          es: "mjs",
          cjs: "cjs",
          iife: "iife.js",
        };
        return `${entryName}.${extensions[format]}`;
      },
    },
    rollupOptions: {
      output: {
        extend: false,
        globals: {},
      },
    },
  },
});
