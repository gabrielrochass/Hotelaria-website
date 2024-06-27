Feature: Cadastro de Usuário

    Scenario: Cadastro bem sucedido
        Given um usuário José Maria que não está cadastrado no sistema 
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS1234", confirmPassword : "JS1234" e confirma 
        Then o sistema confirma a requisição
        Then o usuário “José Maria” é registrado no sistema

    
    Scenario: Usuário já registrado
        Given um usuário “José Maria” que está cadastrado no sistema
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS1234", confirmPassword : "JS1234" e confirma   
        Then o sistema manda uma mensagem de erro
        Then o usuário "José Maria" permanece cadastrado no sistema
    
    Scenario: Senhas não coincidem
        Given um usuário José Maria que não está cadastrado no sistema
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS14", confirmPassword : "JS1234" e confirma  
        Then o sistema manda uma mensagem de erro
        Then o usuário José Maria não está registrado no sistema

    Scenario: Número de celular inválido
        Given um usuário João Pereira que não está cadastrado no sistema
        When o usuario preenche os dados fullName: "João Pereira", birthday: "03/03/1985", email: "joao@EMAIL.com", cellphone: "123", password: "JP1234", confirmPassword: "JP1234" e confirma
        Then o sistema manda uma mensagem de erro de celular inválido
        Then o usuário João Pereira não está registrado no sistema
    
    Scenario: Email inválido
        Given um usuário João Pereira que não está cadastrado no sistema
        When o usuario preenche os dados fullName: "João Pereira", birthday: "03/03/1985", email: "joao.com", cellphone: "81912345678", password: "JP1234", confirmPassword: "JP1234" e confirma
        Then o sistema manda uma mensagem de erro de celular inválido
        Then o usuário João Pereira não está registrado no sistema
    
    Scenario: Data inválida
        Given um usuário João Pereira que não está cadastrado no sistema
        When o usuario preenche os dados fullName: "João Pereira", birthday: "03/03", email: "joao@EMAIL.com", cellphone: "81912345678", password: "JP1234", confirmPassword: "JP1234" e confirma
        Then o sistema manda uma mensagem de erro de celular inválido
        Then o usuário João Pereira não está registrado no sistema