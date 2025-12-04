import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "MeliaApi",
      formats: ["iife"],
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
    },
    rollupOptions: {
      output: {
        extend: true,
        globals: {},
      },
    },
  },
});
