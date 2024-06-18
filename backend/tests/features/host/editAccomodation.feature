Feature: Editar Acomodação
  Como um usuário
  Quero editar uma acomodação que publiquei
  Para que eu possa atualizar as informações da acomodação

  GUI:

    Scenario: Editar uma acomodação com sucesso via GUI
      Given que estou na página "Editar Acomodação" para a acomodação com ID "012"
      When eu altero "Nome da acomodação" para "Chalé do porto reformado"
      And eu altero "Quantidade de quartos" para "4"
      And eu altero "Lotação maxima" para "8"
      And eu altero "Preço por noite" para "200"
      And eu clico no botão "Salvar"
      Then eu devo ver uma mensagem de sucesso "Acomodação editada com sucesso"
      And a acomodação deve ser atualizada com os novos dados
      And eu devo ver as novas informações da acomodação na página de detalhes
    
    Scenario: Tentar editar uma acomodação com dados incompletos via GUI
      Given que estou na página "Editar Acomodação" para a acomodação com ID "012"
      When eu altero "Nome da acomodação" para "Chalé do porto reformado"
      And eu deixo o campo "Quantidade de quartos" vazio
      And eu altero "Lotação maxima" para "8"
      And eu altero "Preço por noite" para "200"
      And eu clico no botão "Salvar"
      Then eu devo ver uma mensagem de erro "Quantidade de quartos é um campo obrigatório"
      And a acomodação não deve ser atualizada
      And os dados antigos devem ser mantidos

  SERVICE:

    Scenario: Editar uma acomodação com sucesso via Serviço
      Given que eu tenha os seguintes dados atualizados da acomodação:
        | Nome da acomodação | Chalé do porto reformado |
        | Quantidade de quartos | 4 |
        | Lotação maxima | 8 |
        | Preço por noite | 200 |
      When eu envio uma requisição PUT para "/user/host/minhas_acom/012" com os dados atualizados
      Then a resposta deve ter o status "200 OK"
      And a resposta deve conter uma mensagem de sucesso "Acomodação editada com sucesso"
      And a resposta deve conter os dados atualizados:
        | Nome da acomodação | Chalé do porto reformado |
        | Quantidade de quartos | 4 |
        | Lotação maxima | 8 |
        | Preço por noite | 200 |

    Scenario: Tentar editar uma acomodação com dados incompletos via Serviço
      Given que eu tenha os seguintes dados atualizados da acomodação:
        | Nome da acomodação | Chalé do porto reformado |
        | Quantidade de quartos | |
        | Lotação maxima | 8 |
        | Preço por noite | 200 |
      When eu envio uma requisição PUT para "/user/host/minhas_acom/012" com os dados atualizados
      Then a resposta deve ter o status "400 Bad Request"
      And a resposta deve conter uma mensagem de erro "Quantidade de quartos é um campo obrigatório"
      And a acomodação não deve ser atualizada
      And os dados antigos devem ser mantidos    

    
