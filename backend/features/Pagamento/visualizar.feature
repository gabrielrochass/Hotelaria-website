Feature: Visualizar métodos de pagamento

Scenario: Visualizar métodos de pagamento quando existem
	Given o usuário com e-mail "iasmin@protonmail.com" está cadastrado no sistema
	And o cartão com cardNumber "5555555555555555" e type "debit" está registrado no seu cadastro
	When uma nova requisição GET é feita com e-mail "iasmin@protonmail.com"
	Then o código de resposta é "200"
	And o sistema retorna o cartão com cardNumber "5555555555555555" e type "debit"

Scenario: Visualizar métodos de pagamento quando não existem
	Given o usuário com e-mail "iasmin@protonmail.com" está cadastrado no sistema
	And não há cartão registrado no seu cadastro
	When uma nova requisição GET é feita com o e-mail "iasmin@protonmail.com"
	Then o código de resposta é "200"
	And o sistema retorna uma lista vazia
