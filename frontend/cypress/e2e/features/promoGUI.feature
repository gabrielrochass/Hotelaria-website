Feature: Cadastro e Manutenção de promoções (criar, deletar e editar)
  As a usuário do site
  I want to ser capaz de criar, deletar e editar promoções
  So that eu possa disponibilizar promoções para outros usuários

  # Cadastro de promoção
  Scenario: Cadastrar uma promoção com sucesso
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Cadastrar Promoção"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "10"
    And Eu preencho o campo Nome da Promoção com "Promoção de Natal"
    And Eu preencho o campo Data de Início com "01/12/2024"
    And Eu preencho o campo Data de Fim com "25/12/2024"
    When Eu clico no botão "Salvar e Cadastrar"
    And Eu vejo a promoção "Promoção de Natal" na lista de promoções

  Scenario: Cadastrar uma promoção sem sucesso por erro no campo de data
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Cadastrar Promoção"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "10"
    And Eu preencho o campo Nome da Promoção com "Promoção de Ano Novo"
    And Eu preencho o campo Data de Início com "25/12/2024"
    And Eu preencho o campo Data de Fim com "01/12/2024"
    When Eu clico no botão "Salvar e Cadastrar"
    When Eu clico no botão "Voltar"
    And Eu não vejo a promoção "Promoção de Ano Novo" na lista de promoções

  Scenario: Cadastrar uma promoção sem sucesso por erro no campo de desconto
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Cadastrar Promoção"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "150"
    And Eu preencho o campo Nome da Promoção com "Promoção de Ano Novo"
    And Eu preencho o campo Data de Início com "01/12/2024"
    And Eu preencho o campo Data de Fim com "03/01/2025"
    When Eu clico no botão "Salvar e Cadastrar"
    When Eu clico no botão "Voltar"
    And Eu não vejo a promoção "Promoção de Natal" na lista de promoções

  Scenario: Cadastrar uma promoção sem sucesso por erro no campo de ID do Hotel
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Cadastrar Promoção"
    And Eu preencho o campo ID do Hotel com "0"
    And Eu preencho o campo Desconto com "10"
    And Eu preencho o campo Nome da Promoção com "Promoção de Ano Novo"
    And Eu preencho o campo Data de Início com "01/12/2024"
    And Eu preencho o campo Data de Fim com "03/01/2025"
    When Eu clico no botão "Salvar e Cadastrar"
    When Eu clico no botão "Voltar"
    And Eu não vejo a promoção "Promoção de Natal" na lista de promoções

  # Deletar promoção
  Scenario: Deletar uma promoção com sucesso
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Deletar" da promoção "Promoção de Natal"
    Then Eu não vejo a promoção "Promoção de Ano Novo" na lista de promoções

  # Editar promoção
  Scenario: Editar uma promoção com sucesso
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Editar Promoção" da promoção "Dia das mães"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "20"
    And Eu preencho o campo Nome da Promoção com "Promoção de Natal"
    And Eu preencho o campo Data de Início com "01/12/2024"
    And Eu preencho o campo Data de Fim com "25/12/2024"
    When Eu clico no botão "Salvar Edição"
    And Eu vejo a promoção "Promoção de Natal" na página de promoções com ID do Hotel "10", Desconto "20", Data de Início "01/12/2024" e Data de Fim "25/12/2024"

  Scenario: Editar uma promoção sem sucesso por erro no campo de data
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Editar Promoção" da promoção "Promoção de Natal"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "20"
    And Eu preencho o campo Nome da Promoção com "Promoção de Natal"
    And Eu preencho o campo Data de Início com "25/12/2024"
    And Eu preencho o campo Data de Fim com "01/12/2024"
    When Eu clico no botão "Salvar Edição"
    When Eu clico no botão "Voltar"
    And A promoção "Promoção de Natal" não é alterada

  Scenario: Editar uma promoção sem sucesso por erro no campo de desconto
    Given Eu estou na página "http://localhost:3000/my-promos"
    When Eu clico no botão "Editar Promoção" da promoção "Promoção de Natal"
    And Eu preencho o campo ID do Hotel com "10"
    And Eu preencho o campo Desconto com "150"
    And Eu preencho o campo Nome da Promoção com "Promoção de Natal"
    And Eu preencho o campo Data de Início com "01/12/2024"
    And Eu preencho o campo Data de Fim com "25/12/2024"
    When Eu clico no botão "Salvar Edição"
    When Eu clico no botão "Voltar"
    And A promoção "Promoção de Natal" não é alterada
