Scenario: Cadastro bem sucedido
    Given eu sou um novo usuário José Maria na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/sign-up"
    When eu preencho os dados Nome : "José Maria", Data de Nascimento : "01/01/1901", Email : "JS2@EMAIL.com", Senha : "JS1234", Confirmar Senha : "JS1234" e confirmo 
    Then eu recebo a mensagem de confirmação do cadastro
    Then eu retorno para a página "http://localhost:3000"

Scenario: Usuário já cadastrado
    Given eu sou um usuário José Maria já cadastrado na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/sign-up"
    When eu preencho os dados Nome : "José Maria", Data de Nascimento : "01/01/1901", Email : "JS2@EMAIL.com", Senha : "JS1234"  e confirmo 
    Then eu recebo uma mensagem de Usuário já cadastrado
    Then eu continuo na página "http://localhost:3000/sign-up"

Scenario: Informações em falta no cadastro
    Given eu sou um novo usuário José Maria na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/sign-up"
    When eu preencho os dados Nome : "", Data de Nascimento : "01/01/1901", Email : "JS2@EMAIL.com", Senha : "JS1234"  e confirmo 
    Then eu recebo uma mensagem que pede para colocar todas as informações necessárias
    Then eu continuo na página "http://localhost:3000/sign-up"

Scenario: Informações incorretas no cadastro
    Given eu sou um novo usuário José Maria na página "http://localhost:3000"
    Then eu sigo para a página "http://localhost:3000/sign-up"
    When eu preencho os dados Nome : "José Maria", Data de Nascimento : "01/01/1901", Email : "JS2", Senha : "JS1234"  e confirmo 
    Then eu recebo uma mensagem que pede para preencher as informações corretamente
    Then eu continuo na página "http://localhost:3000/sign-up"