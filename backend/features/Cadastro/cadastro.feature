Feature: Cadastro de Usuário

    Scenario: Cadastro bem sucedido
        Given um usuário José Maria que não está cadastrado no sistema 
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS1234", confirmPassword : "JS1234" e confirma 
        Then o sistema confirma a requisição
        Then o usuário “José Maria” é registrado no sistema

    
    Scenario: Already Registered User
        Given um usuário “José Maria” que está cadastrado no sistema
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS1234", confirmPassword : "JS1234" e confirma   
        Then o sistema manda uma mensagem de erro
        Then o usuário "José Maria" permanece cadastrado no sistema
    
    Scenario: Informações faltantes/erradas no cadastro 
        Given um usuário José Maria que não está cadastrado no sistema
        When o usuario preenche os dados fullName : "José Maria", birthday : "01/01/1901", email : "JS@EMAIL.com", cellphone : "81912345678", password : "JS14", confirmPassword : "JS1234" e confirma  
        Then o sistema manda uma mensagem de erro
        Then o usuário José Maria não está registrado no sistema
