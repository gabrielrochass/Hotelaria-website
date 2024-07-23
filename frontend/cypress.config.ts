const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        cucumber({
          typescript: require.resolve('typescript')
        })
      )
    },
    specPattern: 'cypress/e2e/features/**/*.feature'
  }
})
