Feature: Listar Acomodações
    Como um usuário
    Quero ver uma lista de acomodações que publiquei
    Para que eu possa gerenciar minhas acomodações

    GUI:

    Scenario: Ver lista de acomodações publicadas via GUI
        Given que estou logado no sistema com o ID do usuário "1"
        And eu estou na página "Minhas Acomodações"
        When eu clico no botão "Listar Acomodações"
        Then eu devo ver uma lista de acomodações que publiquei
        And cada acomodação deve exibir os seguintes detalhes:
        | Nome da acomodação |
        | ID da acomodação   |

    SERVICE:


    Scenario: Ver lista de acomodações publicadas via Serviço
        Given que eu tenha o ID do usuário "1"
        When eu envio uma requisição GET para "/user/host/minhas_acom/"
        Then a resposta deve ter o status "200 OK"
        And a resposta deve conter uma lista de acomodações publicadas pelo usuário com ID "123"
        And cada acomodação deve conter os seguintes detalhes:
        | Nome da acomodação |
        | ID da acomodação   |
