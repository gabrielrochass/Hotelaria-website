Feature: Remover método de pagamento

Scenario: Remover método de pagamento
	Given o usuário com id "24" está cadastrado no sistema
	And o cartão com cardNumber "5555555555555555" e type "debit" está registrado no seu cadastro
	When uma nova requisição DELETE é feita com id: "24", cardNumber: "5555555555555555" e type: "debit"
	Then o cartão é removido do seu cadastro
	And o código de resposta é "204"
