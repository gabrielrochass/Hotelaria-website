Feature: Cancelar Reserva
  Como um usuário
  Quero cancelar uma reserva em uma de minhas acomodações
  Para que eu possa gerenciar as reservas

    GUI:

        Scenario: Cancelar uma reserva com sucesso via GUI
            Given que estou logado no sistema
            And eu estou na página "Detalhes da Reserva" para a reserva com ID "012"
            When eu clico no botão "Cancelar Reserva"
            Then eu devo ver uma mensagem de confirmação "Você tem certeza que deseja cancelar esta reserva?"
            When eu confirmo o cancelamento
            Then eu devo ver uma mensagem de sucesso "Reserva cancelada com sucesso"
            And a reserva com ID "012" deve ser removida da lista de reservas confirmadas


    SERVICE:

        Scenario: Cancelar uma reserva com sucesso via Serviço
            Given que eu tenha o ID do usuário "123" e o ID da reserva "012"
            When eu envio uma requisição DELETE para "/user/host/minhas_acom/?userId=123&acomId=1&reserveID=012"
            Then a resposta deve ter o status "200 OK"
            And a resposta deve conter uma mensagem de sucesso "Reserva cancelada com sucesso"
            And a reserva com ID "012" deve ser removida da lista de reservas confirmadas
