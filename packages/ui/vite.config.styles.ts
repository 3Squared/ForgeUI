/// <reference types="vitest" />
import path, { join } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      },
      {
        find: "node_modules",
        replacement: join(process.cwd(), "../../node_modules")
      }
    ]
  },
  plugins: [],
  build: {
    lib: {
      entry: "./styles.ts",
      name: "Forge.UI"
    },
    outDir: "dist/styles"
  }
}));
