// vite.config.js
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import Markdown from "vite-plugin-md";
import checker from "vite-plugin-checker";
//import {VitePWA} from 'vite-plugin-pwa'
import markdownItPrism from "markdown-it-prism";
import shell from "shelljs";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server : { 
      port : 1234
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment"
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
        {
          find: /~(.+)/,
          replacement: path.join(process.cwd(), "../../node_modules/$1"),
        },
        {
          find: "node_modules",
          replacement: path.join(process.cwd(), "../../node_modules"),
        },
      ], 
      dedupe: ["bootstrap-vue", "vue"],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    plugins: [
      /*      DocGenerator(),*/
      Pages({
        extensions: ["vue", "js", "md"],
        exclude: ["**/examples/*.vue"],
      }),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      Markdown({
        exposeFrontmatter: false,
        markdownItSetup(x) {
          x.use(markdownItPrism);
          x.renderer.rules.table_open = function () {
            return `<div class="forge-table"><table class="table"> `;
          };
          x.renderer.rules.table_close = function () {
            return `</table> </div>`;
          };
        }
      }),
      checker({ vueTsc: mode !== "test" }),
      // This doesnt work as of 26/7, uncommenting requires some weird jsx error which causes the build to hang.
      // VitePWA({
      //   includeAssets: ['robots.txt', 'img/icons/favicon.ico'],
      //   workbox: {
      //     sourcemap: true
      //   },
      //   manifest: {
      //     "theme_color": "#40175e",
      //     "background_color": "#40175e",
      //     "display": "standalone",
      //     "scope": "/",
      //     "start_url": "/",
      //     "name": "ForgeUI",
      //     "short_name": "Style-Guide",
      //     "description": "A style-guide for ForgeUI, implementing the Forge v5 tree-shaking patterns.",
      //     "icons": [
      //       {
      //         "src": "img/icons/android-chrome-192x192.png",
      //         "sizes": "192x192",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/android-chrome-512x512.png",
      //         "sizes": "512x512",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/android-chrome-maskable-192x192.png",
      //         "sizes": "512x512",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/android-chrome-maskable-512x512.png",
      //         "sizes": "512x512",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/msapplication-icon-144x144.png",
      //         "sizes": "144x144",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/mstile-150x150.png",
      //         "sizes": "150x150",
      //         "type": "image/png"
      //       },
      //       {
      //         "src": "img/icons/apple-touch-icon.png",
      //         "sizes": "180x180",
      //         "type": "image/png"
      //       }
      //     ]
      //   }
      // })
    ],

  };
});


function DocGenerator() {
  return {
    name: "docgen",
    async buildStart() {
      try {
        shell.exec("cd .. && npx vue-docgen");
      } catch (e) {
        console.error(e);
      }
    }
  };
}