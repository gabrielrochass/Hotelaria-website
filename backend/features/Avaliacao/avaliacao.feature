Feature: Avaliação
    Scenario: Acesso a página de Avaliações de uma Acomodação
        Given usuário de id "1111" está na página Meu Perfil
        And dentro da Seção Avaliações Pendentes está a avaliação da acomodação de id_acom "2211"
        And número da sua reserva na estadia foi "444444"
        When usuário seleciona a opção Realizar Avaliação
        And fornece o número de reserva "444444", validando operação
        Then usuário segue para a página Avaliação de Acomodação

# Scenario: Acesso a página de Avaliações de uma Acomodação negado
#     Given usuário de id "1111" está na página "Meu Perfil"
#     And dentro da Seção "Avaliações Pendentes" está a avaliação da acomodação de id_acom "2211"
#     And número da sua reserva na estadia foi "444444"
#     When usuário seleciona a opção "Realizar Avaliação"
#     And fornece o número de reserva "333333", invalidando operação
#     Then código de erro "400"
#     And usuário continua na mesma página

# Scenario: Confirmar avaliação
#     Given usuário de id "1111" está na página de escrever avaliação sobre a acomodação de id_acom "2211"
#     When usuário insere "5" em Limpeza
#     And insere "4" em Exatidão do Anúncio
#     And insere "5" em Check-in
#     And insere "3" em Comunicação
#     And insere "5" em Localização
#     And insere "4" em Custo-benefício
#     And insere "estou muito feliz com a minha estadia, aproveitei bastante" em Comentário
#     And seleciona para concluir o comentário
#     Then Nota geral é calculada a parte da média de todas as notas, resultando em "4,33"
#     And sistema confere se nenhum campo da avaliação é "Null"
#     And Código de resposta "200"

# Scenario: Avaliação incompleta
#     Given usuário de id "1111" está na página de escrever avaliação sobre a acomodação de id_acom "2211"
#     When usuário insere "5" em Limpeza
#     And insere "4" em Exatidão do Anúncio
#     And insere "5" em Check-in
#     And insere "4" em Custo-benefício
#     And seleciona para concluir o comentário
#     And Sistema detecta campos "Null" dentro da avaliação e os sinaliza
#     And Código de resposta "400"

