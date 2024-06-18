Feature: Listar Reservas na Acomodação
  Como um usuário
  Quero ver uma lista de reservas confirmadas em uma acomodação que publiquei
  Para que eu possa gerenciar as reservas

    GUI:

        Scenario: Ver lista de reservas confirmadas na acomodação via GUI
            Given que estou logado no sistema com ID de usuário "1"
            And eu estou na página "Minhas Acomodações"
            When eu clico no botão "Listar Reservas" para a acomodação com ID "012"
            Then eu devo ver uma lista de reservas confirmadas para a acomodação com ID "012"
            And cada reserva deve exibir os seguintes detalhes:
            | Data Reserva |
            | ID Reserva   |

    SERVICE:
        Scenario: Ver lista de reservas confirmadas na acomodação via Serviço
            Given que eu tenha o ID do usuário "123" e o ID da acomodação "012"
            When eu envio uma requisição GET para "/user/host/minhas_acom/?userId=123&acomId=012"
            Then a resposta deve ter o status "200 OK"
            And a resposta deve conter uma lista de reservas confirmadas para a acomodação com ID "012"
            And cada reserva deve conter os seguintes detalhes:
            | Data Reserva |
            | ID Reserva   |        

