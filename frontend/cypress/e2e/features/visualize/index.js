import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor/steps';

Given('eu estou na página de "Home"', () => {
    cy.visit('http://localhost:3000/');
});

When('eu seleciono a opção "Métodos de pagamento"', () => {
    cy.get('navbar-links').contains('Métodos de pagamento').click();
});

Then('eu visualizo a lista de métodos de pagamento registrados', () => {
    cy.get('.payment-list') 
        .should('be.visible');
});
