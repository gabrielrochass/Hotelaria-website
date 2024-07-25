Feature: Adicionar novo método de pagamento


Scenario: Adicionar novo método de pagamento com sucesso
	Given eu estou na página de "Métodos de Pagamento"
	And eu não vejo o cartão com cardNumber "5555555555555555" e type "debit" na lista de métodos de pagamento registrados
	When eu seleciono a opção "Adicionar"
	Then eu estou na página de "Adicionar Método de Pagamento" 
    When eu preencho os campos: cardNumber: "5555555555555555", name: "Iasmin Gomes", expireDate: "06/05/2100", type: "debit" e cvv: "123"
	And eu seleciono a opção "Salvar"
	Then eu vejo uma mensagem de sucesso: "Card successfully registered"

Scenario: Adicionar novo método de pagamento sem sucesso
	Given eu estou na página de “Métodos de Pagamento”
	And eu não vejo o cartão com cardNumber "5555555555555555" e type "debit" na lista de métodos de pagamento registrados
	When eu seleciono a opção Adicionar
    Then eu estou na página de "Adicionar Método de Pagamento" 
    When eu preencho os campos: cardNumber: "5555555555555555", name: "Iasmin Gomes", expireDate: "06/05/2100", type: "debit" e cvv: ""
	And eu seleciono a opção "Salvar"
	Then eu vejo a mensagem de erro "All fields are required"