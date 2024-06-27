Feature: Compartilhar

    Scenario: Compartilhar hotel
        Given o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        When envio uma requisição GET para "/share/link" com o dado accommodationId: "1"
        Then a resposta deve ter o status "200"
        And a resposta contem uma mensagem com "localhost:5001/accommodation/1"