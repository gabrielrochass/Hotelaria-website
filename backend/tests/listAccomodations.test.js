const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const feature = loadFeature('./tests/host/features/listAccomodations.feature');

defineFeature(feature, test => {
  let response;

  test('Ver lista de acomodações publicadas via GUI', ({ given, and, when, then }) => {
    given(/^Given que estou logado no sistema com o ID do usuário "(\d+)"$/, async (userId) => {
      // Simular autenticação do usuário
      this.userId = userId;
    });

    and('eu estou na página "Minhas Acomodações"', () => {
      // Simular acesso à página "Minhas Acomodações"
      // Aqui podemos apenas declarar a navegação para a página
    });

    when('eu clico no botão "Listar Acomodações"', async () => {
      // Simular clique no botão "Listar Acomodações" e fazer requisição GET
      response = await axios.get(`http://localhost:5000/user/host/accommodations?userId=${this.userId}`);
    });

    then('eu devo ver uma lista de acomodações que publiquei', () => {
      // Verificar se a resposta contém uma lista de acomodações
      expect(response.status).toBe(200);
      expect(response.data.accommodations).toBeDefined();
      expect(Array.isArray(response.data.accommodations)).toBe(true);
    });

    then('cada acomodação deve exibir os seguintes detalhes:', dataTable => {
      // Verificar se cada acomodação inclui os campos "Nome da acomodação" e "ID da acomodação"
      const expectedDetails = dataTable.rowsHash();

      response.data.accommodations.forEach(accommodation => {
        expect(accommodation).toHaveProperty('id');
        expect(accommodation).toHaveProperty('nome');
        expect(accommodation.nome).toBeDefined();
        expect(accommodation.id).toBeDefined();
      });
    });
  });
});
