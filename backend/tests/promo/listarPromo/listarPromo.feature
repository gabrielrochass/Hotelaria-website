Feature: Listar promoções cadastradas
    As a administrador do sistema 
    I want to ser capaz de listar as promoções cadastradas
    So that o administrador possa ver reservas com valores promocionais


    Scenario: Lista de promoções cadastradas não vazia
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
       """ 
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 100,
                "userId": "123",
                "desconto": 10,
                "promoName": "Promoção 3",
                "promoId": "3",
                "data_inicio": "2021-10-01",
                "data_fim": "2021-10-31"
            },
            {
                "id": "4",
                "nome": "Propriedade 4",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 10,
                "precoPorNoite": 200,
                "userId": "123",
                "desconto": 20,
                "promoName": "Promoção 4",
                "promoId": "4",
                "data_inicio": "2021-10-05",
                "data_fim": "2021-10-25"
            }
        """
        When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
        And o código de resposta é "200" # 200 ok
        Then o sistema retorna as promoções com corpo:
        """ 
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 100,
                "userId": "123",
                "desconto": 10,
                "promoName": "Promoção 3",
                "promoId": "3",
                "data_inicio": "2021-10-01",
                "data_fim": "2021-10-31"
            },
            {
                "id": "4",
                "nome": "Propriedade 4",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 10,
                "precoPorNoite": 200,
                "userId": "123",
                "desconto": 20,
                "promoName": "Promoção 4",
                "promoId": "4",
                "data_inicio": "2021-10-05",
                "data_fim": "2021-10-25"
            }
        """

    Scenario: Lista de promoções cadastradas vazia
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        
        When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
        And o código de resposta é "200"
        Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas com o corpo:
        """
        {
            "error": "No promotions found."
        }
        """
