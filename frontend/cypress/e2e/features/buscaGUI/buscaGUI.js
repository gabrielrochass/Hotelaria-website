import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('o usuário está na página "search"', () => {
  cy.visit('http://localhost:3000/search')
})

When(
  'o usuário preenche os campos da seguinte maneira: CheckIn : {string}, CheckOut : {string}, Número de Hospédes : {string} e Localização : {string}',
  (checkin: string, checkout: string, guests: string, location: string) => {
    cy.get('[data-cy="checkin"]').type(checkin)
    cy.get('[data-cy="checkout"]').type(checkout)
    cy.get('[data-cy="guests"]').type(guests)
    cy.get('[data-cy="location"]').type(location)
  }
)

When(
  'o usuário preenche os campos da seguinte maneira: CheckIn : {string}, CheckOut : {string}, Número de Hospédes : {string}, Localização : {string} e sendo "Pet Friendly"',
  (checkin: string, checkout: string, guests: string, location: string) => {
    cy.get('[data-cy="checkin"]').type(checkin)
    cy.get('[data-cy="checkout"]').type(checkout)
    cy.get('[data-cy="guests"]').type(guests)
    cy.get('[data-cy="location"]').type(location)
    cy.get('[data-cy="petFriendly"]').check()
  }
)

When('o usuário clica no botão "Buscar"', () => {
  cy.get('[data-cy="searchButton"]').click()
})

Then(
  'o usuário deve ver na tela o card de {string}, {string}, {string}, {string}, {string} e {string}',
  (hotel1, hotel2, hotel3, hotel4, hotel5, hotel6) => {
    cy.get(`[data-cy="${hotel1}"]`).should('exist')
    cy.get(`[data-cy="${hotel2}"]`).should('exist')
    cy.get(`[data-cy="${hotel3}"]`).should('exist')
    cy.get(`[data-cy="${hotel4}"]`).should('exist')
    cy.get(`[data-cy="${hotel5}"]`).should('exist')
    cy.get(`[data-cy="${hotel6}"]`).should('exist')
  }
)

Then('o usuário deve ver a mensagem {string}', (message: string) => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(message)
  })
})

Then('o usuário deve ver na tela o card de {string}, {string}, e {string}', (hotel1, hotel2, hotel3) => {
  cy.get(`[data-cy="${hotel1}"]`).should('exist')
  cy.get(`[data-cy="${hotel2}"]`).should('exist')
  cy.get(`[data-cy="${hotel3}"]`).should('exist')
})
