import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';


// Login bem sucedido
Given('eu sou um usuário Matheus já cadastrado na página {http://localhost:3000}', (page) => {
    cy.visit(page)
})

Then(' eu sigo para a página {http://localhost:3000/login}', (page) => {
    cy.visit(page)
})

When('eu preencho os dados Email : {matheus@email.com}, Senha : {superdificil}  e confirmo', (email, senha) => {
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(senha);
    cy.get('button[type=submit]').click();
})

Then('Then eu estou logado ');

Then('Then eu sigo para a página {http://localhost:3000/search}', (page) => {
    cy.url().should("include", "/search");
})

// Login credenciais inválidas 
Given('eu sou um usuário Matheus já cadastrado na página {http://localhost:3000}', (page) => {
    cy.visit(page)
})

Then(' eu sigo para a página {http://localhost:3000/login}', (page) => {
    cy.visit(page)
})

When(' eu preencho os dados Email : {matheus@email.com}, Senha : {superfacil}  e confirmo', (email, senha) => {
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(senha);
    cy.get('button[type=submit]').click();
})
    
Then('Then eu não estou logado');

Then('Then eu recebo uma mensagem de erro Email ou senha inválidos ');

Then('eu continuo na página {http://localhost:3000/login}', (page) => {
    cy.url().should("include", "/login");
})
