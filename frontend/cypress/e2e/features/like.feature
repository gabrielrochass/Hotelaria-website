Feature: Like

    Scenario: Adicionar um like
        Given o usuário está na página "detalhes-da-acomodacao" de "Pousada Maresia"
        Given "Pousada Maresia" possui "200" likes
        When o usuário clica no botão "Curtir"
        Then "Pousada Maresia" possui "201" likes
        Then o botão virou "Descurtir"

    Scenario: Remover um like
        Given o usuário está na página "detalhes-da-acomodacao" de "Pousada Maresia"
        Given "Pousada Maresia" possui "201" likes
        When o usuário clica no botão "Descurtir"
        Then "Pousada Maresia" possui "200" likes
        Then o botão virou "Curtir"