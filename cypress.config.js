const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
    specPattern: 'frontend/cypress/e2e/features/*.feature',
    supportFile: 'frontend/cypress/e2e/features/visualize/index.js', 
  },
});