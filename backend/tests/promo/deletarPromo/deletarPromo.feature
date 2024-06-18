Feature: Deletar promoção
    As a administrador do sistema 
    I want to ser capaz de deletar promoções
    So that o usuário não possa mais visualizá-las
    
    Scenario: Excluir promoção com sucesso
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
        When "Iasmin" faz uma requisição DELETE para o endpoint "/promocoes_cadastradas/3" # (ID da promoção)
        Then o sistema retorna o código de resposta "200" # ok
        And o sistema retorna uma mensagem de confirmação de exclusão com corpo:
        """
        {
            "message": "Promo deleted successfully."
        }
        """
        And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas"
        Then a única promoção visível é a de corpo:
        """
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

    Scenario: Excluir promoção sem sucesso por ausência de promoção cadastrada
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
        When "Iasmin" faz uma requisição DELETE para o endpoint "/promocoes_cadastradas/5" # (ID da promoção)
        Then o sistema retorna o código de resposta "404" # ok
        And o sistema retorna uma mensagem de confirmação de exclusão com corpo:
        """
        {
            "error": "Promotion not found."
        }
        """"
        And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas", o corpo que aparece é:
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

