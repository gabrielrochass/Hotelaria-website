Feature: Login
    As a usuário 
    I want to logar no site
    So that eu possa ter acesso as funcionalidades 

Scenario: Login bem sucedido
    Given eu sou um usuário Matheus já cadastrado na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/login"
    When eu preencho os dados Email : "matheus@email.com", Senha : "superdificil"  e confirmo  
    Then eu estou logado 
    Then eu sigo para a página "http://localhost:3000/search"
    
Scenario: Informações erradas ao tentar entrar
    Given eu sou um usuário Matheus na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/login"
    When eu preencho os dados Email : "matheus@email.com", Senha : "superfacil"  e confirmo
    Then eu recebo uma mensagem que alega Senha ou Email incorretos
    Then eu não estou logado  
    Then eu continuo na página "http://localhost:3000/login"