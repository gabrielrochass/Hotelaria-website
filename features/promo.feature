CAMINHOS:
/promocoes_cadastradas: tela de promoções -> listPromos
/cadastrar_promocao: tela de cadastro de promoções -> createPromo
/promocoes_ativas: tela de hoteis com promocoes (usuario)
/deletar_promocao/:id: "lixeira" -> deletePromo
/editar_promocao/:id: tela de edição de promoções

VARIÁVEIS:
- id: identificação do hotel -> deletar e editar promoção ativa
- desconto: valor percentual de desconto na promoção -> cadastrar promoção
- promoName: identificação da promoção (cada hotel só pode ter uma promoção ativa)
- data_inicio: data de início da promoção -> pode ser mostrada no front
- data_fim: data final da promoção -> pode ser mostrada no front
--------------------

Feature: Cadastro e manutenção de promoções (inserir, remover, atualizar)
As a administrador do sistema 
I want to ser capaz de criar, remover e atualizar promoções
So that o usuário possa fazer reservas com valores promocionais

GUI:

Scenario: Lista de Promoções Cadastradas não vazia 
    Given o administrador "Gabriel" já cadastrou uma promoção para a prorpriedade de nomeProp "Casa em Porto"
    Then "Gabriel" visualiza a promoção associada à propriedade de nomeProp "Casa em Porto"
    And todas as promoções cadastradas são exibidas na lista
    
Scenario: Lista de Promoções Cadastradas vazia OK
    Given nenhuma promoção foi cadastrada pelo administrador "Gabriel"
    When "Gabriel" abre a tela "Promoções Cadastradas"
    Then uma mensagem indicando que nenhuma promoção foi cadastrada é exibida
    And a lista de promoções está vazia
    
Scenario: Seleção da opção "Cadastrar Nova Promoção"
    Given "Beatriz" está na página "Promoções Cadastradas"
    When "Beatriz" seleciona a opção "Cadastrar Nova Promoção"
    Then ela é direcionada para a tela "Cadastrar Promoção"
    And os campos para preenchimento das informações da nova promoção são exibidos


Scenario: Cadastro com sucesso de nova promoção
    Given o administrador "João" está na tela "Cadastrar Promoção"
    When "João" preenche os campos:
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    And "João" seleciona a opção "Salvar e Enviar"
    Then uma mensagem de sucesso é exibida para "João"
    And "João" é redirecionado para a tela "Promoções Cadastradas"
    And a nova promoção cadastrada é exibida na lista de promoções com os dados:
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |


Scenario: Cadastro falho de nova promoção
    Given o administrador "João" está na tela "Cadastrar Promoção"
    When "João" preenche os campos:
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 20       | "          "    | 12/05/2024  | 20/05/2024  |
    And "João" seleciona a opção "Salvar e Enviar"
    Then uma mensagem de erro indicando o preenchimento inadequado das informações é exibida para "João"
    And "João" permanece na tela "Cadastrar Promoção"
    And os campos preenchidos previamente são mantidos com seus valores
    And a promoção não é adicionada à lista de promoções cadastradas

Scenario: Excluir promoções na tela "Promoções Cadastradas"
    Given "Iasmin" está na tela "Promoções Cadastradas"
    And a lista de promoções cadastradas contém as promoções:
    | id  | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    |  1  | Casa em Porto  | 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    |  2  | Apartamento SP | 15       | Black Friday    | 24/11/2024  | 28/11/2024  |
    When "Iasmin" seleciona a opção para excluir a promoção associada à propriedade "Casa em Porto"
    Then uma mensagem de confirmação de exclusão é exibida para "Iasmin"
    And a promoção "Casa em Porto" é removida da lista de promoções cadastradas
    And somente a promoção "Apartamento SP" permanece visível na lista


Scenario: Administrador é redirecionado para a tela "Editar promoções"
    Given "Marcos" está na tela "Promoções Cadastradas"
    And "Marcos" visualiza a lista de promoções cadastradas com as promoções:
    | id  | nomeProp        | desconto | promoName       | data_inicio | data_fim    |
    |  1  | Quarto em Olinda| 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    |  2  | Apartamento SP  | 15       | Black Friday    | 24/11/2024  | 28/11/2024  |
    When "Marcos" seleciona a opção para editar a promoção associada à propriedade "Quarto em Olinda"
    Then "Marcos" é redirecionado para a tela "Editar Promoções"
    And os campos da promoção "Quarto em Olinda" são exibidos para edição


Scenario: Editar com sucesso na tela "Editar promoções"
    Given o administrador "Maria" está na tela "Editar promoções"
    And "Maria" visualiza os campos preenchidos da promoção associada à propriedade "Casa em Porto":
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    When "Maria" edita os campos:
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 25       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    And "Maria" seleciona a opção "Salvar e Enviar"
    Then uma mensagem de sucesso é exibida para "Maria"
    And "Maria" é redirecionada para a tela "Promoções Cadastradas"
    And a promoção "Casa em Porto" é atualizada com o desconto de 25  na lista de promoções cadastradas


Scenario: Editar sem sucesso na tela "Editar promoções"
    Given o administrador "Maria" está na tela "Editar promoções"
    And "Maria" visualiza os campos preenchidos da promoção associada à propriedade "Casa em Porto":
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 10       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    When "Maria" edita os campos:
    | nomeProp       | desconto | promoName       | data_inicio | data_fim    |
    | Casa em Porto  | 20       | Dia das mães    | 12/05/2024  | 20/05/2024  |
    And "Maria" seleciona a opção "Salvar e Enviar"
    Then uma mensagem de erro indicando o preenchimento inadequado das informações é exibida para "Maria"
    And "Maria" permanece na tela "Editar Promoções"
    And os campos preenchidos previamente são mantidos com seus valores
    
------------
SOBRE O HOME:

Scenario: Há promoções ativas
    Given o administrador "Gabriel" cadastrou uma nova promoção com sucesso para a propriedade com corpo:
        { 
            "nomeProp": "Casa em Porto",
            "desconto": 20,
            "promoName": "Dia das mães",
            "data_inicio": "12/05/2024",
            "data_fim": "20/05/2024"
        }
    And "Matheus" está na tela "Home"
    When "Matheus" seleciona a opção para ver as promoções ativas
    Then ele vê a promoção cadastrada por "Gabriel" com corpo:
        { 
            "nomeProp": "Casa em Porto",
            "desconto": 20,
            "promoName": "Dia das mães",
            "data_inicio": "12/05/2024",
            "data_fim": "20/05/2024"
        }


Scenario: Não há promoções ativas
    Given a lista de promoções cadastradas é vazia
    And "Matheus" está na tela "Home"
    When "Matheus" seleciona as opções para ver as promoções ativas
    Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas


Scenario: Usuário reserva propriedade em promoção
    Given as seguintes promoções estão ativas no sistema:
      | nomeProp            | desconto | promoName      | data_inicio | data_fim   |
      | "Park Hotel Caruaru"| 20    | "Dia das mães" | "12/05/2024"| "20/05/2024" |
      | "Casa em Gravatá"   | 15    | "Black Friday" | "24/11/2024"| "28/11/2024" |
      | "Chalé MG"          | 30    | "Natal"        | "20/12/2024"| "26/12/2024" |

    And "Duda" está na tela "Promoções Ativas"
    When "Duda" seleciona a opção de realizar reserva para a propriedade "Chalé MG"
    Then "Duda" é direcionada a tela "Realizar Reserva"

    
---------------------------------
SERVICE:
Scenario: Lista de promoções cadastradas não vazia
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
    And o código de resposta é "200" # 200 ok
    Then o sistema retorna as promoções com corpo:
    [
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
    ]

Scenario: Lista de promoções cadastradas vazia
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    []
    When uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"
    And o código de resposta é "200"
    Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas com o corpo:
    {
        "error": "No promotions found."
    }

Scenario: Cadastro com sucesso de nova promoção
    Given o administrador "João" deseja cadastrar uma nova promoção
    And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
    {
        "id": "2",
        "nome": "Apartamento Central",
        "quantidadeQuartos": 2,
        "lotacaoMaxima": 4,
        "precoPorNoite": 200,
        "userId": "123"
    }
    When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
        {
            "id": 2,
            "desconto": 50,
            "promoName": "Promoção metade",
            "data_inicio": "2021-10-01",
            "data_fim": "2021-10-31"
        }
    Then o sistema retorna o código de resposta "200" # created
    And o sistema retorna a mensagem com o corpo:
    {
        "message": "Promo created successfully."
    }
    And o endpoint "/accommodation.json" possui o corpo:
    [
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
    ]

Scenario: Cadastro falho de nova promoção devido à ausência de acomodação cadastrada
    Given o administrador "João" deseja cadastrar uma nova promoção
    And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
    {
        "id": "3",
        "nome": "Apartamento Central",
        "quantidadeQuartos": 2,
        "lotacaoMaxima": 4,
        "precoPorNoite": 200,
        "userId": "123"
    }
    When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
    {
        "id": 5,
        "desconto": 50,
        "promoName": "Promoção metade",
        "data_inicio": "2021-10-01",
        "data_fim": "2021-10-31"
    }
    Then o sistema retorna o código de resposta "404" # not found
    And o sistema retorna uma mensagem de erro indicando o a ausência da acomodação com id == "5":
    {
        "error": "Hotel not found."
    }

Scenario: Cadastro falho de nova promoção devido à ausência de informações
    Given o administrador "João" deseja cadastrar uma nova promoção
    And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
    {
        "id": "3",
        "nome": "Apartamento Central",
        "quantidadeQuartos": 2,
        "lotacaoMaxima": 4,
        "precoPorNoite": 200,
        "userId": "123"
    }
    When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
    {
        "id": 3,
        "desconto": 50,
        "promoName": "",
        "data_inicio": "2021-10-01",
        "data_fim": "2021-10-31"
    }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
    {
        "error": "All fields are required."
    }

Scenario: Cadastro falho de nova promoção devido ao preenchimento inadequado do campo "desconto"
    Given o administrador "João" deseja cadastrar uma nova promoção
    And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
    {
        "id": "2",
        "nome": "Apartamento Central",
        "quantidadeQuartos": 2,
        "lotacaoMaxima": 4,
        "precoPorNoite": 200,
        "userId": "123"
    }
    When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
    {
        "id": 2,
        "desconto": 150,
        "promoName": "Black Friday",
        "data_inicio": "2021-10-01",
        "data_fim": "2021-10-31"
    }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
    {
        "error": "Invalid discount. It should be between 1 and 100"
    }

Scenario: Cadastro falho de nova promoção devido ao preenchimento inadequado do campo "data_inicio" e "data_fim"
    Given o administrador "João" deseja cadastrar uma nova promoção
    And somente a acomodação "Apartamento Central" está cadastrada no endpoint "/accommodation.json" com o corpo:
    {
        "id": "2",
        "nome": "Apartamento Central",
        "quantidadeQuartos": 2,
        "lotacaoMaxima": 4,
        "precoPorNoite": 200,
        "userId": "123"
    }
    When "João" faz uma requisição POST para o endpoint "/cadastrar_promocao" com o corpo:
    {
        "id": 2,
        "desconto": 50,
        "promoName": "Black Friday",
        "data_inicio": "2021-11-01",
        "data_fim": "2021-10-31"
    }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o mal preenchimento dos campos:
    {
        "error": "Invalid date. Final date should be after the beginning promotion date."
    }

Scenario: Excluir promoção com sucesso
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Iasmin" faz uma requisição DELETE para o endpoint "/promocoes_cadastradas/3" # (ID da promoção)
    Then o sistema retorna o código de resposta "200" # ok
    And o sistema retorna uma mensagem de confirmação de exclusão com corpo:
    {
        "message": "Promo deleted successfully."
    }
    And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas"
    Then a única promoção visível é a de corpo:
    [
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
    ]   

Scenario: Excluir promoção sem sucesso por ausência de promoção cadastrada
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Iasmin" faz uma requisição DELETE para o endpoint "/promocoes_cadastradas/5" # (ID da promoção)
    Then o sistema retorna o código de resposta "404" # ok
    And o sistema retorna uma mensagem de confirmação de exclusão com corpo:
    {
        "error": "Promotion not found."
    }
    And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas", o corpo que aparece é:
    [
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
    ]  

Scenario: Editar promoção com sucesso
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
    {
        "id": 3,
        "desconto": 50,
        "promoName": "Nova Promoção",
        "data_inicio": "2022-01-01",
        "data_fim": "2022-01-31"
    }
    Then o sistema retorna o código de resposta "200" # ok
    And uma mensagem é mostrada com o corpo:
    {
        "message": "Promo edited successfully."
    }
    And ao fazer uma requisição GET para o endpoint "/promocoes_cadastradas", o corpo que aparece é:
    [
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
    ] 

Scenario: Editar promoção sem sucesso devido à ausência de informações
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
      {
        "id": 3
        "desconto": 20,
        "promoName": "",
        "data_inicio": "2021-10-05",
        "data_fim": "2021-10-25"
      }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
    {
        "error": "All fields are required."
    }

Scenario: Editar promoção sem sucesso devido à ausência de promoção cadastrada
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/5" (ID da promoção) com o corpo:
    {
        "id": 5,
        "desconto": 50,
        "promoName": "Nova Promoção",
        "data_inicio": "2021-10-05",
        "data_fim": "2021-10-25"
    }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
    {
        "error": "Promotion not found."
    }

Scenario: Editar promoção sem sucesso devido à preenchimento inadequado do campo "desconto"
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
      {
        "id": 3,
        "desconto": 0,
        "promoName": "Natal",
        "data_inicio": "12/05/2024",
        "data_fim": "20/05/2024"
      }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
    {
        "error": "Invalid discount. It should be between 1 and 100."
    }

Scenario: Editar promoção sem sucesso devido à preenchimento inadequado do campo "data_inicio" e "data_fim"
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    When "Maria" faz uma requisição PUT para o endpoint "/promocoes_cadastradas/3" (ID da promoção) com o corpo:
      {
        "id": 3,
        "desconto": 1,
        "promoName": "Natal",
        "data_inicio": "2021-11-05",
        "data_fim": "2021-10-25"
      }
    Then o sistema retorna o código de resposta "400" # bad request
    And o sistema retorna uma mensagem de erro indicando o preenchimento inadequado das informações com o corpo:
    {
        "error": "Invalid date. Final date should be after the beginning promotion date."
    }
--------------------
SOBRE O HOME: usuário

Scenario: Há promoções ativas
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    And "Matheus" está no endpoint "/home"
    When "Matheus" faz uma requisição GET para o endpoint "/promocoes_ativas"
    Then o sistema retorna a lista de promoções cadastradas, que tem o corpo:
    [
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
    ]


Scenario: Não há promoções ativas
    Given a lista de promoções cadastradas é vazia
    And "Matheus" está no endpoint "/home"
    When "Matheus" faz uma requisição GET para o endpoint "/promocoes_ativas"
    Then o sistema retorna uma mensagem indicando a ausência de promoções cadastradas com o corpo:
    {
        "error": "No promotions found."
    }


Scenario: Usuário reserva propriedade em promoção
    Given há as seguintes promoções cadastradas no endpoint "/promocoes_cadastradas":
    [
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
    ]
    And "Duda" está no endpoint "/promocoes_ativas"
    When "Duda" faz uma requisição POST para o endpoint "/realizar_reserva/3"
    Then o sistema o código de resposta "200"




