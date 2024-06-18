Scenario: Editar promoção com sucesso
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 90,
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
        
        When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
        """
        {
            "id": 3,
            "desconto": 50,
            "promoName": "Nova Promoção",
            "data_inicio": "2022-01-01",
            "data_fim": "2022-01-31"
        }
        """
        Then o sistema retorna o código de resposta "200" # ok
        And uma mensagem é mostrada com o corpo:
        """
        {
            "message": "Promo edited successfully."
        }
        """
        And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas", o corpo que aparece é:
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 50,
                "userId": "123",
                "desconto": 50,
                "promoName": "Nova Promoção",
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
         

    Scenario: Editar promoção sem sucesso devido à ausência de informações
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 90,
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
        
        When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
        """
        {
            "id": 3
            "desconto": 20,
            "promoName": "",
            "data_inicio": "2021-10-05",
            "data_fim": "2021-10-25"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
        """
        {
            "error": "All fields are required."
        }
        """

    Scenario: Editar promoção sem sucesso devido à ausência de promoção cadastrada
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 90,
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
        
        When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/5" (ID da promoção) com o corpo:
        """
        {
            "id": 5,
            "desconto": 50,
            "promoName": "Nova Promoção",
            "data_inicio": "2021-10-05",
            "data_fim": "2021-10-25"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
        """
        {
            "error": "Promotion not found."
        }
        """

    Scenario: Editar promoção sem sucesso devido à preenchimento inadequado do campo "desconto"
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 90,
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
        
        When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
        """
        {
            "id": 3,
            "desconto": 0,
            "promoName": "Natal",
            "data_inicio": "12/05/2024",
            "data_fim": "20/05/2024"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
        """
        {
            "error": "Invalid discount. It should be between 1 and 100."
        }
        """

    Scenario: Editar promoção sem sucesso devido à preenchimento inadequado do campo "data_inicio" e "data_fim"
        Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
        """
            {
                "id": "3",
                "nome": "Propriedade 3",
                "quantidadeQuartos": 4,
                "lotacaoMaxima": 8,
                "precoPorNoite": 90,
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
        
        When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
        """
        {
            "id": 3,
            "desconto": 1,
            "promoName": "Natal",
            "data_inicio": "2021-11-05",
            "data_fim": "2021-10-25"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
        """
        {
            "error": "Invalid date. Final date should be after the beginning promotion date."
        }
        """
