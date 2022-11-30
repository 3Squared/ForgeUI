/// <reference types="vitest" />
import { resolve, join } from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue2";
import istanbul from "vite-plugin-istanbul";
import dts from "vite-plugin-dts";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment"
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src")
      },
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1")
      }
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  plugins: [
    vue(),
    checker({vueTsc : true}),
    dts(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "test/"],
      extension: [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx", ".vue"],
      cypress: mode == "test",
      forceBuildInstrument: mode == "test"
    })
  ],
  build: {
    lib: {
      entry: "./index.ts",
      name: "Forge.UI",
      formats: ["es"]
    },

    rollupOptions: {
      external: [
        "@azure/storage-blob",
        "@azure/abort-controller",
        "bootstrap-vue",
        "bootstrap-vue/src/icons/helpers/make-icon",
        "chart.js",
        "dayjs",
        "flatpickr",
        "lodash/cloneDeep",
        "ts-simple-nameof",
        "vee-validate",
        "vee-validate/dist/rules",
        "vee-validate/dist/types/types",
        "vue",
        "vuedraggable",
        "v-click-outside",
        "vue-multiselect",
        "lodash"
      ],
      output: {
        dir: "dist/esm",
        format: "esm",
        /* exports: 'named',

        preserveModules: true,
        preserveModulesRoot: 'src',*/
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  test: {
    alias: [{ find: /^vue$/, replacement: "vue/dist/vue.runtime.common.js" }],

    reporters: ["default", "junit"],
    outputFile: "test-results/vitest.xml",
    coverage: {
      all: true,
      include: ["src"],
      exclude: ["**/*.cy.ts", "scripts", "**/*.test.ts"],
      reportsDirectory: "./coverage/vitest",
      reporter: ["cobertura", "html", "json"]
    }
  }
}));
