import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  component: {
    specPattern: "**/**.cy.ts",
    devServer: {
      framework: "vue",
      bundler: "vite", 
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false,
    reporter: "junit",
    reporterOptions: {
      testsuitesTitle: true,
      mochaFile: "./test-results/cypress.[hash].xml"
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);

      on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
      if (config.isTextTerminal) {
        config.excludeSpecPattern = ["**/all.cy.ts"];
      }
      return config;
    }
  }
});
