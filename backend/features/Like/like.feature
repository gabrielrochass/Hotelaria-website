Feature: Like

    Scenario: Adicionar um like
        Given o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de curtidas" do usuário "José Maria" está vazia 
        And o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        And o hotel "Pousada Maresia" possui "2" likes
        When envio uma requisição POST para "/liking/like" com os dados UserId: "1" e accommodationId: "1"
        Then a resposta deve ter o status "200"
        And a "lista de curtidas" do usuário "José Maria" deve conter "Pousada Maresia"
        And a "lista de curtidas" do usuário "José Maria" deve ter tamanho "1"
        And o hotel "Pousada Maresia" deve ter "3" likes
    
    Scenario: Remover um like
        Given o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        And o hotel "Morada do Mar" está cadastrado no sistema com id "2"
        And o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de curtidas" do usuário "José Maria" contem "Pousada Maresia" e "Morada do Mar"
        And o hotel "Pousada Maresia" possui "3" likes
        And o hotel "Morada do Mar" possui "1" likes
        When envio uma requisição DELETE para "/liking/removelike" com os dados UserId: "1" e accommodationId: "1"
        Then a resposta deve ter o status "200"
        And a "lista de curtidas" do usuário "José Maria" deve conter "Morada do Mar"
        And a "lista de curtidas" do usuário "José Maria" deve ter tamanho "1"
        And o hotel "Pousada Maresia" deve ter "2" likes
        And o hotel "Morada do Mar" deve ter "1" likes
    
    Scenario: Ver lista de likes
        Given o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de curtidas" do usuário "José Maria" contem "Pousada Maresia" e "Morada do Mar"
        When envio uma requisição GET para "/liking/getlikes" com os dados UserId: "1" 
        Then a resposta deve ter o status "200"
        And a resposta contem um array com "Pousada Maresia" e "Morada do Mar"
        And a "lista de curtidas" do usuário "José Maria" deve conter "Pousada Maresia" 
        And a "lista de curtidas" do usuário "José Maria" deve conter "Morada do Mar" 

    Scenario: Adicionar um like repetido
        Given o hotel "Pousada Maresia" está cadastrado no sistema com id "1"
        And o hotel "Morada do Mar" está cadastrado no sistema com id "2"
        And o usuário "José Maria" está cadastrado no sistema com id "1"
        And a "lista de curtidas" do usuário "José Maria" contem "Pousada Maresia" e "Morada do Mar"
        And o hotel "Pousada Maresia" possui "3" likes
        And o hotel "Morada do Mar" possui "1" likes
        When envio uma requisição POST para "/liking/like" com os dados UserId: "1" e accommodationId: "1"
        Then a resposta deve ter o status "400"
        And a resposta contem a mensagem "Hotel already liked"
        And a "lista de curtidas" do usuário "José Maria" deve conter "Pousada Maresia"
        And a "lista de curtidas" do usuário "José Maria" deve conter "Morada do Mar"
        And a "lista de curtidas" do usuário "José Maria" deve ter tamanho "2"
        And o hotel "Pousada Maresia" deve ter "3" likes
        And o hotel "Morada do Mar" deve ter "1" likes
