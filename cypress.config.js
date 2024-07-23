const { defineConfig } = require("cypress");

module.exports = defineConfig({
  cucumber: {
    features: "./features",
    stepDefinitions: "./stepDefinitions",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
