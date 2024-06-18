Feature: Publicar Acomodação
  Como um usuário comum
  Eu quero publicar uma acomodação
  Para que outras pessoas possam reservar meu espaço

  GUI:

  Scenario: Publicar uma acomodação com sucesso
    Given que estou na página "Publicar Acomodação"
    When eu preencho "Nome da acomodação" com "Chalé do porto"
    And eu preencho "Quantidade de quartos" com "3"
    And eu preencho "Lotação maxima" com "6"
    And eu preencho "Preço por noite" com "150"
    And eu clico no botão "Publicar"
    Then eu devo ver uma mensagem de sucesso "Acomodação publicada com sucesso"
    And o sistema deve gerar um ID único para a acomodação
    And eu devo ver o ID da acomodação na tela de confirmação

  Scenario: Tentar publicar acomodação com dados incompletos
    Given que estou na página "Publicar Acomodação"
    When eu preencho "Nome da acomodação" com "Chalé do porto"
    And eu preencho "Quantidade de quartos" com ""
    And eu preencho "Lotação maxima" com "6"
    And eu preencho "Preço por noite" com "150"
    And eu clico no botão "Publicar"
    Then eu devo ver uma mensagem de erro "Quantidade de quartos é um campo obrigatório"
    And a acomodação não deve ser publicada
    And o sistema não deve gerar um ID para a acomodação

SERVICE:

  Scenario: Publicar uma acomodação com sucesso via Serviço
    Given que eu tenha os seguintes dados da acomodação:
      | Nome da acomodação | Chalé do porto |
      | Quantidade de quartos | 3 |
      | Lotação maxima | 6 |
      | Preço por noite | 150 |
    When eu envio uma requisição POST para "/host/minhas_acom/publicar" com os dados da acomodação
    Then a resposta deve ter o status "201 Created"
    And a resposta deve conter um ID único para a acomodação
    And a resposta deve conter os dados enviados:
      | Nome da acomodação | Chalé do porto |
      | Quantidade de quartos | 3 |
      | Lotação maxima | 6 |
      | Preço por noite | 150 |

   Scenario: Tentar publicar acomodação com dados incompletos via Serviço
    Given que eu tenha os seguintes dados da acomodação:
      | Nome da acomodação | Chalé do porto |
      | Quantidade de quartos | |
      | Lotação maxima | 6 |
      | Preço por noite | 150 |
    When eu envio uma requisição POST para "/host/minhas_acom/publicar" com os dados da acomodação
    Then a resposta deve ter o status "400 Bad Request"
    And a resposta deve conter uma mensagem de erro "Quantidade de quartos é um campo obrigatório"
    And a acomodação não deve ser publicada
    And o sistema não deve gerar um ID para a acomodação
