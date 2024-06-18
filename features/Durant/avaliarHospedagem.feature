Feature: Avaliação de Hospedagem

    Como um hóspede
    Quero poder verificar avaliações da hospedagem de interesse
    Também quero poder avaliar uma hospedagem após estadia
    Para que eu possa ver e compartilhar experiências nessa estadia com outros usuários

    GUI:

    Scenario: Acesso a página de Avaliações de uma Acomodação
        Given usuário "felipe" está na página "Meu Perfil"
        And dentro da Seção "Avaliações Pendentes" está a avaliação da acomodação "KM Hostel"
        When usuário seleciona a opção "Realizar Avaliação"
        And fornece o número válido do seu número de reserva
        Then usuário segue para a página "Avaliação de Acomodação"

    Scenario: Acesso a página de Avaliações de uma Acomodação negado
        Given usuário "felipe" está na página "Meu Perfil"
        And dentro da Seção "Avaliações Pendentes" está a avaliação da acomodação "KM Hostel"
        When usuário seleciona a opção "Realizar Avaliação"
        And fornece o número inválido do seu número de reserva
        Then usuário permanece na página "Meu Perfil"
        And Aviso de erro no número de reserva aparece

    Scenario: Confirmar avaliação
        Given usuário "felipe" está na página de escrever avaliação sobre a hospedagem "KM Hostel"
        When usuário "felipe" insere "5" em Limpeza
        And insere "4" em Exatidão do Anúncio
        And insere "5" em Check-in
        And insere "3" em Comunicação
        And insere "5" em Localização
        And insere "4" em Custo-benefício
        And insere "estou muito feliz com a minha estadia, aproveitei bastante" em Comentário
        And seleciona para concluir o comentário
        Then usuário "felipe" pré-visualiza como seu comentário será mostrado na página de avaliações
        And Comentário mostra nota "4,33" e comentário "estou muito feliz com a minha estadia, aproveitei bastante"
        And usuário "felipe" confirma comentário
        And usuário é avisado que comentário foi realizado
        Then Retorna para a página "Meu Perfil"
        And Seção de avaliações pendentes desapareceu

    Scenario: Avaliação incompleta
        Given usuário "felipe" está na página de escrever avaliação sobre a hospedagem "KM Hostel"
        When usuário "felipe" insere "5" em Limpeza
        And insere "4" em Exatidão do Anúncio
        And insere "5" em Check-in
        And insere "4" em Custo-benefício
        And seleciona para concluir a Avaliação
        Then usuário é avisado que existem campos incompletos sinalizados na página
        And Permanece na página "Avaliação"

    Serviço:
    Scenario: Acesso a página de Avaliações de uma Acomodação
        Given usuário de id "1111" está na página "Meu Perfil"
        And dentro da Seção "Avaliações Pendentes" está a avaliação da acomodação de id_acom "2211"
        And número da sua reserva na estadia foi "444444"
        When usuário seleciona a opção "Realizar Avaliação"
        And fornece o número de reserva "444444", validando operação
        Then usuário segue para a página "Avaliação de Acomodação"

    Scenario: Acesso a página de Avaliações de uma Acomodação negado
        Given usuário de id "1111" está na página "Meu Perfil"
        And dentro da Seção "Avaliações Pendentes" está a avaliação da acomodação de id_acom "2211"
        And número da sua reserva na estadia foi "444444"
        When usuário seleciona a opção "Realizar Avaliação"
        And fornece o número de reserva "333333", invalidando operação
        Then código de erro "400"
        And usuário continua na mesma página

    Scenario: Confirmar avaliação
        Given usuário de id "1111" está na página de escrever avaliação sobre a acomodação de id_acom "2211"
        When usuário insere "5" em Limpeza
        And insere "4" em Exatidão do Anúncio
        And insere "5" em Check-in
        And insere "3" em Comunicação
        And insere "5" em Localização
        And insere "4" em Custo-benefício
        And insere "estou muito feliz com a minha estadia, aproveitei bastante" em Comentário
        And seleciona para concluir o comentário
        Then Nota geral é calculada a parte da média de todas as notas, resultando em "4,33"
        And sistema confere se nenhum campo da avaliação é "Null"
        And Código de resposta "200"

    Scenario: Avaliação incompleta
        Given usuário de id "1111" está na página de escrever avaliação sobre a acomodação de id_acom "2211"
        When usuário insere "5" em Limpeza
        And insere "4" em Exatidão do Anúncio
        And insere "5" em Check-in
        And insere "4" em Custo-benefício
        And seleciona para concluir o comentário
        And Sistema detecta campos "Null" dentro da avaliação e os sinaliza
        And Código de resposta "400"

