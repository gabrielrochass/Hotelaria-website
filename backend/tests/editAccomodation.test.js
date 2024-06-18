const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const feature = loadFeature('./tests/host/features/editAccomodation.feature');

defineFeature(feature, test => {
  let response;
  let acomodacaoOriginal;

  test('Editar uma acomodação com sucesso via GUI', ({ given, when, and, then }) => {
    given(/^que estou na página "Editar Acomodação" para a acomodação com ID "([^"]*)"$/, async (acomodacaoId) => {
      // Simular a busca dos dados originais da acomodação
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoId}`);
      acomodacaoOriginal = res.data;
    });

    when(/^eu altero "Nome da acomodação" para "([^"]*)"$/, (novoNome) => {
      acomodacaoOriginal.nome = novoNome;
    });

    and(/^eu altero "Quantidade de quartos" para "([^"]*)"$/, (novaQuantidadeQuartos) => {
      acomodacaoOriginal.quartos = novaQuantidadeQuartos;
    });

    and(/^eu altero "Lotação maxima" para "([^"]*)"$/, (novaLotacaoMaxima) => {
      acomodacaoOriginal.lotacaoMaxima = novaLotacaoMaxima;
    });

    and(/^eu altero "Preço por noite" para "([^"]*)"$/, (novoPreco) => {
      acomodacaoOriginal.preco = novoPreco;
    });

    and('eu clico no botão "Salvar"', async () => {
      response = await axios.put(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`, acomodacaoOriginal);
    });

    then('eu devo ver uma mensagem de sucesso "Acomodação editada com sucesso"', () => {
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Acomodação editada com sucesso');
    });

    and('a acomodação deve ser atualizada com os novos dados', async () => {
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`);
      expect(res.data.nome).toBe(acomodacaoOriginal.nome);
      expect(res.data.quartos).toBe(acomodacaoOriginal.quartos);
      expect(res.data.lotacaoMaxima).toBe(acomodacaoOriginal.lotacaoMaxima);
      expect(res.data.preco).toBe(acomodacaoOriginal.preco);
    });

    and('eu devo ver as novas informações da acomodação na página de detalhes', async () => {
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`);
      expect(res.data.nome).toBe(acomodacaoOriginal.nome);
      expect(res.data.quartos).toBe(acomodacaoOriginal.quartos);
      expect(res.data.lotacaoMaxima).toBe(acomodacaoOriginal.lotacaoMaxima);
      expect(res.data.preco).toBe(acomodacaoOriginal.preco);
    });
  });

  test('Tentar editar uma acomodação com dados incompletos via GUI', ({ given, when, and, then }) => {
    given(/^que estou na página "Editar Acomodação" para a acomodação com ID "([^"]*)"$/, async (acomodacaoId) => {
      // Simular a busca dos dados originais da acomodação
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoId}`);
      acomodacaoOriginal = res.data;
    });

    when(/^eu altero "Nome da acomodação" para "([^"]*)"$/, (novoNome) => {
      acomodacaoOriginal.nome = novoNome;
    });

    and('eu deixo o campo "Quantidade de quartos" vazio', () => {
      acomodacaoOriginal.quartos = ''; // Deixar o campo vazio
    });

    and(/^eu altero "Lotação maxima" para "([^"]*)"$/, (novaLotacaoMaxima) => {
      acomodacaoOriginal.lotacaoMaxima = novaLotacaoMaxima;
    });

    and(/^eu altero "Preço por noite" para "([^"]*)"$/, (novoPreco) => {
      acomodacaoOriginal.preco = novoPreco;
    });

    and('eu clico no botão "Salvar"', async () => {
      try {
        response = await axios.put(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`, acomodacaoOriginal);
      } catch (error) {
        response = error.response;
      }
    });

    then('eu devo ver uma mensagem de erro "Quantidade de quartos é um campo obrigatório"', () => {
      expect(response.status).toBe(400);
      expect(response.data.error).toBe('Quantidade de quartos é um campo obrigatório');
    });

    and('a acomodação não deve ser atualizada', async () => {
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`);
      expect(res.data.quartos).not.toBe(''); // Verificar que o campo não foi atualizado
    });

    and('os dados antigos devem ser mantidos', async () => {
      const res = await axios.get(`http://localhost:5000/user/host/accommodations/${acomodacaoOriginal.id}`);
      expect(res.data.nome).not.toBe('Chalé do porto reformado'); // Verificar que o nome não foi atualizado
    });
  });
});
