Feature: Editar promoção
    As a administrador do sistema 
    I want to ser capaz de editar promoções
    So that o usuário possa ter acesso a promoções atualizadas   
    
    Scenario: Editar promoção com sucesso
        Given existe uma promoção cadastrada no sistema para o hotel com id: "10"
        When o administrador faz uma requisição PUT para o endpoint "/promo/editar_promocao/10" com desconto: "50", promoName: "Nova Promoção", data_inicio: "2022-01-01", data_fim: "2022-01-31"
        Then o sistema retorna o código de resposta "200"
        Then o sistema retorna a mensagem "Promo edited successfully."
        Then a promoção de id: "10" é atualizada no sistema com desconto: "50", promoName: "Nova Promoção", data_inicio: "2022-01-01", data_fim: "2022-01-31"
    
    
    Scenario: Editar promoção com erro de ausência de promoção
        Given não existe uma promoção cadastrada no sistema para o hotel com id: "12"
        When o administrador faz uma requisição PUT para o endpoint "/promo/editar_promocao/12" com desconto: "50", promoName: "Nova Promoção", data_inicio: "2022-01-01", data_fim: "2022-01-31"
        Then o sistema retorna o código de resposta "200"
        Then o sistema retorna a mensagem "Promo not found."
        Then a promoção de id: "12" não é atualizada no sistema com desconto: "50", promoName: "Nova Promoção", data_inicio: "2022-01-01", data_fim: "2022-01-31"

    Scenario: Editar promoção com erro de desconto inválido
        Given existe uma promoção cadastrada no sistema para o hotel com id: "10"
        When o administrador faz uma requisição PUT para o endpoint "/promo/editar_promocao/10" com desconto: "-50", promoName: "Nova Promoção", data_inicio: "2022-01-01", data_fim: "2022-01-31"
        Then o sistema retorna o código de resposta "400"
        Then o sistema retorna a mensagem "Invalid discount. It should be between 1 and 100."
        Then a promoção de id: "10" não é atualizada no sistema com desconto: "-50", promoName: "Nova Promoção 2", data_inicio: "2022-01-02", data_fim: "2022-01-30"

    Scenario: Editar promoção com erro de data inválida
        Given existe uma promoção cadastrada no sistema para o hotel com id: "10"
        When o administrador faz uma requisição PUT para o endpoint "/promo/editar_promocao/10" com desconto: "60", promoName: "Nova Promoção 3", data_inicio: "2022-02-05", data_fim: "2021-01-31"
        Then o sistema retorna o código de resposta "400"
        Then o sistema retorna a mensagem "Invalid date. Final date should be after the beginning promotion date."
        Then a promoção de id: "10" não é atualizada no sistema com desconto: "60", promoName: "Nova Promoção 3", data_inicio: "2022-02-05", data_fim: "2021-01-31"