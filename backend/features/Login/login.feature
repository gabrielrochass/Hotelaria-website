Feature: Login de Usuário
    
    Scenario: Login bem sucedido
        Given um usuário José Maria que está cadastrado no sistema 
        When o usuario preenche os dados Email : "JS@EMAIL.com", password : "JS1234" e confirma
        Then o sistema confirma a requisição
        Then o usuário José Maria está logado 
    
    Scenario: Informações erradas no login
        Given um usuário José Maria que está cadastrado no sistema 
        When o usuario preenche os dados Email : "JS@EMAIL.com", Senha : "JS12"  e confirma
        Then o sistema manda uma mensagem de erro
        Then o usuário José Maria não está logado 

    Scenario: Usuario nao cadastrado
        Given um usuário José Maria que não está cadastrado no sistema 
        When o usuario preenche os dados Email : "JS@EMAIL.com", Senha : "JS1234"  e confirma
        Then o sistema manda uma mensagem de erro
        Then o usuário José Maria não está logado
    
    

