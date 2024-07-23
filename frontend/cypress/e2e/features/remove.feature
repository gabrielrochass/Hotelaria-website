Feature: Remover método de pagamento


Scenario: Remover método de pagamento com sucesso
	Given eu estou na página de "Métodos de Pagamento"
	And eu vejo o cartão com cardNumber "5555555555555555" e type "debit" na lista de métodos de pagamento registrados
	When eu seleciono a opção "Remover"
	Then eu estou na página de "Métodos de Pagamento"
	And eu não vejo o cartão com cardNumber "5555555555555555” e type "debit" na lista de métodos de pagamento