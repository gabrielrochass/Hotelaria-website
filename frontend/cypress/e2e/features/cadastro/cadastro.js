import { Given, When, Then } from "cypress-cucumber-preprocessor/steps/index";

Given('Given eu sou um novo usuário José Maria na página {http://localhost:3000}', (page) => {
    cy.visit(page)
})

Then('Then eu sigo para a página {http://localhost:3000/sign-up}', (page) => {
    cy.visit(page)
})

When('eu preencho os dados Nome : {José Maria}, Data de Nascimento : {01/01/1901}, Email : {JS2@EMAIL.com}, Senha : {JS1234}, Confirmar Senha: {JS1234} e confirmo ', (nome, dataNascimento, email, senha, confirmSenha) => {
    cy.get('input[type=name]').type(nome);
    cy.get('input[type=date]').type(dataNascimento);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(senha);
    cy.get('input[type=password]').type(confirmSenha);
    cy.get('button[type=submit]').click();
}    
)

Then('eu recebo a mensagem de confirmação do cadastro');

Then('eu retorno para a página {http://localhost:3000}', (page) => {
    cy.url().should("include", "/");
})

