Feature: Busca

    Scenario: Busca bem sucedida
        Given o hotel "Pousada Maresia" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        And o hotel "Morada do Mar" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        When envio uma requisição GET para "/searching/search" com os dados CheckIn : "21/05", CheckOut : "24/05", Guests : "2" e Location : "Fernando de Noronha"
        Then a resposta deve ter o status "200"
        And a resposta contem "Pousada Maresia" e "Morada do Mar"

    Scenario: Busca errada
        Given o hotel "Pousada Maresia" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        And o hotel "Morada do Mar" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        When envio uma requisição GET para "/searching/search" com os dados CheckIn : "21/05", CheckOut : "24/05", Guests : "3" e Location : ""
        Then a resposta deve ter o status "400"
        And a resposta contem a mensagem "All fields are required"

    Scenario: Busca mal sucedida
        Given o hotel "Pousada Maresia" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        And o hotel "Morada do Mar" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas 
        When envio uma requisição GET para "/searching/search" com os dados CheckIn : "21/05", CheckOut : "24/05", Guests : "4" e Location : "Fernando de Noronha"
        Then a resposta deve ter o status "404"
        And a resposta contem a mensagem "No hotels found"
    
    Scenario: Busca filtrada
        Given o hotel "Pousada Maresia" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas por "1500" reais e sendo "Pet Friendly" 
        And o hotel "Morada do Mar" em "Fernando de Noronha" está armazenado no sistema com vagas de "21/05" a "24/05" para "2" pessoas por "1000" reais e sendo "Não Pet Friendly"
        When envio uma requisição GET para "/searching/search" com os dados CheckIn : "21/05", CheckOut : "24/05", Guests : "2", Location : "Fernando de Noronha", maxPrice : "2000" e petFriendly : "true"
        Then a resposta deve ter o status "200"
        And a resposta contem "Pousada Maresia"