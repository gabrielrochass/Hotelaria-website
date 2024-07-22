Feature: Remover método de pagamento

Scenario: Remover método de pagamento
	Given o usuário com e-mail "iasmin@protonmail.com" está cadastrado no sistema
	And o cartão com cardNumber "5555555555555555" e type "debit" está registrado no seu cadastro
	When uma nova requisição DELETE é feita com email: "iasmin@protonmail.com", cardNumber: "5555555555555555" e type: "debit"
	Then o cartão é removido do seu cadastro
	And o código de resposta é "204"
