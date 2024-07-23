import React from 'react'
import SearchPage from './search'

describe('<SearchPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchPage />)
  })
})
