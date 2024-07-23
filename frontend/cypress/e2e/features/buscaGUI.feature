Feature: Busca

    Scenario: Busca bem sucedida
        Given o usuário está na página "search"
        When o usuário preenche os campos da seguinte maneira: CheckIn : "21/05", CheckOut : "24/05", Número de Hospédes : "2" e Localização : "Fernando de Noronha"
        When o usuário clica no botão "Buscar"
        Then o usuário deve ver na tela o card de "Pousada Maresia", "Morada do Mar", "Hotel Paraíso", "Lar Doce Lar", "Recanto dos Corais" e "Pousada Naiepe"

    Scenario: Busca erada
        Given o usuário está na página "search"
        When o usuário preenche os campos da seguinte maneira: CheckIn : "21/05", CheckOut : "24/05", Número de Hospédes : "2" e Localização : ""
        Then o usuário deve ver a mensagem "Preencha este campo."
    
    Scenario: Busca mal sucedida
        Given o usuário está na página "search"
        When o usuário preenche os campos da seguinte maneira: CheckIn : "21/05", CheckOut : "24/05", Número de Hospédes : "4" e Localização : "Fernando de Noronha" 
        Then o usuário deve ver a mensagem "Sem acomodações disponíveis no momento"
    
    Scenario: Busca filtrada
        Given o usuário está na página "search"
        When o usuário preenche os campos da seguinte maneira: CheckIn : "21/05", CheckOut : "24/05", Número de Hospédes : "4", Localização : "Fernando de Noronha" e sendo "Pet Friendly"
        Then o usuário deve ver na tela o card de "Pousada Maresia", "Hotel Paraíso", e "Recanto dos Corais" 