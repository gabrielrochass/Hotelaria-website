const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const feature = loadFeature('./tests/features/listarReservasAcomodacao.feature');

defineFeature(feature, test => {
  let response;

  test('Ver lista de reservas confirmadas na acomodação via GUI', ({ given, when, then }) => {
    given(/^que estou logado no sistema com ID de usuário "([^"]*)"$/, async (userId) => {
    this.userId = userId;
    });

    given('eu estou na página "Minhas Acomodações"', async () => {
      // Simular o acesso à página "Minhas Acomodações"
    });

    when(/^eu clico no botão "Listar Reservas" para a acomodação com ID "([^"]*)"$/, async (acomodacaoId) => {
      response = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoId}/reservations`);
    });

    then(/^eu devo ver uma lista de reservas confirmadas para a acomodação com ID "([^"]*)"$/, (acomodacaoId) => {
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      response.data.forEach(reserva => {
        expect(reserva.acomodacaoId).toBe(acomodacaoId);
      });
    });

    then('cada reserva deve exibir os seguintes detalhes:', (detailsTable) => {
      const expectedDetails = detailsTable.rawTable.flat();
      response.data.forEach(reserva => {
        expectedDetails.forEach(detail => {
          expect(reserva).toHaveProperty(detail);
        });
      });
    });
  });
});
