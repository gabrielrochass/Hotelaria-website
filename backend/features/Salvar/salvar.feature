Feature: Salvar

    Scenario: Salvar um hotel
        Given o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de salvos" do usuário "José Maria" está vazia 
        And o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        When envio uma requisição POST para "/saving/save" com os dados UserId: "1" e accommodationId: "1"
        Then a resposta deve ter o status "200"
        And a "lista de salvos" do usuário "José Maria" deve conter "Pousada Maresia"
        And a "lista de salvos" do usuário "José Maria" deve ter tamanho "1"
    
    Scenario: Remover um hotel salvo
        Given o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        And o hotel "Morada do Mar" está cadastrado no sistema com id "2"
        And o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de salvos" do usuário "José Maria" contem "Pousada Maresia" e "Morada do Mar"
        When envio uma requisição DELETE para "/saving/unsave" com os dados UserId: "1" e accommodationId: "1"
        Then a resposta deve ter o status "200"
        And a "lista de salvos" do usuário "José Maria" deve conter "Morada do Mar"
        And a "lista de salvos" do usuário "José Maria" deve ter tamanho "1"

    Scenario: Ver lista de hoteis salvos
        Given o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de salvos" do usuário "José Maria" contem "Pousada Maresia" e "Morada do Mar"
        When envio uma requisição GET para "/saving/getsaves" com os dados UserId: "1" 
        Then a resposta deve ter o status "200"
        And a resposta contem um array com "Pousada Maresia" e "Morada do Mar"
        And a "lista de salvos" do usuário "José Maria" deve conter "Pousada Maresia" 
        And a "lista de salvos" do usuário "José Maria" deve conter "Morada do Mar" 
