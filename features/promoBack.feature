Feature: Cadastro e manutenção de promoções - inserir, remover, atualizar
    As a administrador do sistema 
    I want to ser capaz de criar, remover e atualizar promoções
    So that o usuário possa fazer reservas com valores promocionais


    Scenario: Lista de promoções cadastradas não vazia
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são:
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
        And o código de resposta é "200"
        Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas com o corpo:
        """
        {
            "error": "No promotions found."
        }
        """

    Scenario: Cadastro com sucesso de nova promoção
        Given o administrador "João" deseja cadastrar uma nova promoção
        And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
        """
        {
            "id": "2",
            "nome": "Apartamento Central",
            "quantidadeQuartos": 2,
            "lotacaoMaxima": 4,
            "precoPorNoite": 200,
            "userId": "123"
        }
        """
        When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        """
            {
                "id": 2,
                "desconto": 50,
                "promoName": "Promoção metade",
                "data_inicio": "2021-10-01",
                "data_fim": "2021-10-31"
            }
        """
        Then o sistema retorna o código de resposta "200" # created
        And o sistema retorna a mensagem com o corpo:
        """
        {
            "message": "Promo created successfully."
        }
        """
        And o endpoint "/accommodation.json" possui o corpo:
        """
            {
                "id": "2",
                "nome": "Apartamento Central",
                "quantidadeQuartos": 2,
                "lotacaoMaxima": 4,
                "precoPorNoite": 100,
                "userId": "123",
                "desconto": 50,
                "promoName": "Promoção metade",
                "promoId": "29274b23-eb99-4410-b82e-3b141d986133",
                "data_inicio": "2021-10-01",
                "data_fim": "2021-10-31"
            }
        """

    Scenario: Cadastro falho de nova promoção devido à ausência de acomodação cadastrada
        Given o administrador "João" deseja cadastrar uma nova promoção
        And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
        """
        {
            "id": "3",
            "nome": "Apartamento Central",
            "quantidadeQuartos": 2,
            "lotacaoMaxima": 4,
            "precoPorNoite": 200,
            "userId": "123"
        } 
        """
        When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        """
        {
            "id": 5,
            "desconto": 50,
            "promoName": "Promoção metade",
            "data_inicio": "2021-10-01",
            "data_fim": "2021-10-31"
        }
        """
        Then o sistema retorna o código de resposta "404" # not found
        And o sistema retorna uma mensagem de erro indicando o a ausência da acomodação com id == "5":
        """
        {
            "error": "Hotel not found."
        }
        """

    Scenario: Cadastro falho de nova promoção devido à ausência de informações
        Given o administrador "João" deseja cadastrar uma nova promoção
        And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
        """
        {
            "id": "3",
            "nome": "Apartamento Central",
            "quantidadeQuartos": 2,
            "lotacaoMaxima": 4,
            "precoPorNoite": 200,
            "userId": "123"
        }
        """
        When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        """
        {
            "id": 3,
            "desconto": 50,
            "promoName": "",
            "data_inicio": "2021-10-01",
            "data_fim": "2021-10-31"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
        """
        {
            "error": "All fields are required."
        }
        """

    Scenario: Cadastro falho de nova promoção devido ao preenchimento inadequado do campo "desconto"
        Given o administrador "João" deseja cadastrar uma nova promoção
        And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
        """
        {
            "id": "2",
            "nome": "Apartamento Central",
            "quantidadeQuartos": 2,
            "lotacaoMaxima": 4,
            "precoPorNoite": 200,
            "userId": "123"
        } 
        """
        When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        """
        {
            "id": 2,
            "desconto": 150,
            "promoName": "Black Friday",
            "data_inicio": "2021-10-01",
            "data_fim": "2021-10-31"
        } 
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
        """
        {
            "error": "Invalid discount. It should be between 1 and 100"
        }
        """

    Scenario: Cadastro falho de nova promoção devido ao preenchimento inadequado do campo "data_inicio" e "data_fim"
        Given o administrador "João" deseja cadastrar uma nova promoção
        And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
        """
        {
            "id": "2",
            "nome": "Apartamento Central",
            "quantidadeQuartos": 2,
            "lotacaoMaxima": 4,
            "precoPorNoite": 200,
            "userId": "123"
        }
        """
        When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        """
        {
            "id": 2,
            "desconto": 50,
            "promoName": "Black Friday",
            "data_inicio": "2021-11-01",
            "data_fim": "2021-10-31"
        }
        """
        Then o sistema retorna o código de resposta "400" # bad request
        And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
        """
        {
            "error": "Invalid date. Final date should be after the beginning promotion date."
        }
        """

    Scenario: Excluir promoção com sucesso
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        "
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

    Scenario: Editar promoção com sucesso
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são:
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        
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
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
        
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
  
    Scenario: Há promoções ativas
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
       "
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
        And "Matheus" está no endpoint "/home"
        When "Matheus" faz uma requisição GET para o endpoint "/promocoes_ativas"
        Then o sistema retorna a lista de promoções cadastradas, que tem o corpo:
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

    Scenario: Não há promoções ativas
        Given a lista de promoções cadastradas é vazia
        And "Matheus" está no endpoint "/home"
        When "Matheus" faz uma requisição GET para o endpoint "/promocoes_ativas"
        Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas com o corpo:
        """
        {
            "error": "No promotions found."
        }
        """


    Scenario: Usuário reserva propriedade em promoção
        Given as promoções cadastradas no endpoint "/promocoes_cadastradas" são: []
       "
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
        And "Duda" está no endpoint "/promocoes_ativas"
        When "Duda" faz uma requisição POST para o endpoint "/realizar_reserva/3"
        Then o sistema o código de resposta "200"




