// aqui é onde vão os testes de verdades, lidos pelo cypress
// não diferenciar por scenarios, mas cada linha deve ser uma função livre
// associada ao arquivo promoGUI.feature (?)
// verificar lixeira

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

// Scenario: Cadastrar uma promoção com sucesso
Given('Eu estou na página {string}', (page) => {
  cy.visit(page)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

Then('O modal de cadastro de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('Eu vejo a promoção {string} na lista de promoções', (promoName) => {
  cy.contains(promoName).should('be.visible')
})

// Scenario: Cadastrar uma promoção sem sucesso por erro no campo data
When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('Eu não vejo a promoção {string} na lista de promoções', (promoName) => {
  cy.contains(promoName).should('not.be.visible')
})

// Scenario: Cadastrar uma promoção sem sucesso por erro no campo desconto
When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('Eu não vejo a promoção {string} na lista de promoções', (promoName) => {
  cy.contains(promoName).should('not.be.visible')
})

// Scenario: Cadastrar uma promoção sem sucesso por erro no campo ID do Hotel
When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de cadastro de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('Eu não vejo a promoção {string} na lista de promoções', (promoName) => {
  cy.contains(promoName).should('not.be.visible')
})

//  Scenario: Deletar uma promoção com sucesso
When('Eu clico no botão {string} da promoção {string}', (buttonName, promoName) => {
  const className = promoName.replace(/\s+/g, '-').toLowerCase()
  cy.get('button.${className}').contains(buttonName).click()
})

Then('Eu não vejo a promoção {string} na lista de promoções', (promoName) => {
  cy.contains(promoName).should('not.be.visible')
})

// Scenario: Editar uma promoção com sucesso
When('Eu clico no botão {string} da promoção {string}', (buttonName, promoName) => {
  const className = promoName.replace(/\s+/g, '-').toLowerCase()
  cy.get('button.${className}').contains(buttonName).click()
})

Then('O modal de edição de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

Then('O modal de edição de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then(
  'Eu vejo a promoção {string} na página de promoções com ID do Hotel {string}, Desconto {string}, Data de Início {string}, Data de Fim {string}',
  (promoName, id, desconto, data_inicio, data_fim) => {
    cy.contains(promoName).should('be.visible').should('have.text', promoName)
    cy.contains(id).should('be.visible').should('have.text', id)
    cy.contains(desconto).should('be.visible').should('have.text', desconto)
    cy.contains(data_inicio).should('be.visible').should('have.text', data_inicio)
    cy.contains(data_fim).should('be.visible').should('have.text', data_fim)
  }
)

// Scenario: Editar uma promoção com erro de data
When('Eu clico no botão {string} da promoção {string}', (buttonName, promoName) => {
  const className = promoName.replace(/\s+/g, '-').toLowerCase()
  cy.get('button.${className}').contains(buttonName).click()
})

Then('O modal de edição de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de edição de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('A promoção {string} não é alterada', (promoName) => {
  cy.contains(promoName).should('be.visible')
})

// Scenario: Editar uma promoção com erro de desconto
When('Eu clico no botão {string} da promoção {string}', (buttonName, promoName) => {
  const className = promoName.replace(/\s+/g, '-').toLowerCase()
  cy.get('button.${className}').contains(buttonName).click()
})

Then('O modal de edição de promoção é aberto', () => {
  cy.get('[data-testid=modal]').should('be.visible')
})

And('Eu preencho o campo ID do Hotel com {string}', (id) => {
  cy.get('input[name=id]').type(id)
})

And('Eu preencho o campo Desconto com {string}', (desconto) => {
  cy.get('input[name=desconto]').type(desconto)
})

And('Eu preencho o campo Nome da Promoção com {string}', (promoName) => {
  cy.get('input[name=promoName]').type(promoName)
})

And('Eu preencho o campo Data de Início com {string}', (data_inicio) => {
  cy.get('input[name=data_inicio]').type(data_inicio)
})

And('Eu preencho o campo Data de Fim com {string}', (data_fim) => {
  cy.get('input[name=data_fim]').type(data_fim)
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('Eu vejo a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible')
})

When('Eu clico no botão {string}', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Then('O modal de edição de promoção é fechado', () => {
  cy.get('[data-testid=modal]').should('not.be.visible')
})

Then('A promoção {string} não é alterada', (promoName) => {
  cy.contains(promoName).should('be.visible')
})
