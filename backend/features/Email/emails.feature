Feature: Envio de email de confirmação de reserva

    Scenario: Envio de email
        Given um usuário José Maria está logado
        Then o usuário José Maria está na página de confirmação de reserva
        When o usuário José Maria confirma a sua reserva de id "1"
        Then o sistema confirma a requisição      
        Then um Email é enviado com os dados fornecidos pelo sistema para “José Maria”
    
    Scenario: ID da reserva incorreto
        Given um usuário José Maria está logado
        Then o usuário José Maria está na página de confirmação de reserva
        When o usuário José Maria confirma a sua reserva de id "123123" incorreto
        Then o sistema envia uma mensagem de erro      
        Then um Email não é enviado com os dados fornecidos pelo sistema para “José Maria”