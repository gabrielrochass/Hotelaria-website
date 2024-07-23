import { Given, Then, When, And } from '@badeball/cypress-cucumber-preprocessor';


Given('eu estou na página de "Métodos de Pagamento"', () => {
    cy.visit('http://localhost:3000/payment-methods');
})

And('eu não vejo o cartão com cardNumber "5555555555555555" e type "debit" na lista de métodos de pagamento registrados', () = {

})

When('eu seleciono a opção "Adicionar"', () => {
    cy.get('button').contains('Adicionar').click();
})

Then('eu estou na página de "Adicionar Método de Pagamento"', () => {

})

When('eu preencho os campos: cardNumber: {string}, name: {string}, expireDate: {string}, type: {string} e cvv: {string}', (cardNumber: string, name: string, expireDate: string, type: string, cvv: string) => {
    cy.get('[data-cy="cardNumber"]').type(cardNumber);
    cy.get('[data-cy="name"]').type(name);
    cy.get('[data-cy="expireDate"]').type(expireDate);
    cy.get('[data-cy="type"]').type(type);
    cy.get('[data-cy="cvv"]').type(cvv);
})

And('eu seleciono a opção "Salvar"', () => {
    cy.get('button').contains('Salvar').click();
    // mudar para botão do popup
})

Then('eu vejo uma mensagem de sucesso: "Card successfully registered"', () => {
    cy.get('success-message') 
        .should('be.visible');
})