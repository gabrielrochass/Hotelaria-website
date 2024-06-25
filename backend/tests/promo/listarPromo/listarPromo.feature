Feature: Listar promoções cadastradas
    As a administrador do sistema 
    I want to ser capaz de listar as promoções cadastradas
    So that o administrador possa ver reservas com valores promocionais

    Scenario: Lista de promoções cadastradas não vazia
        Given existem promoções cadastradas no sistema
        When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
        Then o código de resposta é 200
        And o sistema retorna as "promos"

    Scenario: Lista de promoções cadastradas vazia
        Given não existem promoções cadastradas no sistema
        When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
        And o código de resposta é 200
        Then o sistema retorna a mensagem "No promotions found"