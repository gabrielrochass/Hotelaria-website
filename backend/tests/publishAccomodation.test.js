import { defineFeature, loadFeature } from  'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path'

const feature = loadFeature('./tests/features/host/publishAccomodation.feature');
const request = supertest(app);

defineFeature(feature, test => {
  let response;
  let acomodacaoId;
  let nome;
  let quartos;
  let lotacaoMax;
  let preco;

  test('Publicar uma nova acomodação com sucesso', ({ given, when, and, then }) => {
    given(/^que estou na página "(.*)"$/, async (arg0) => {
      // Simular acesso à página de publicação de acomodação
    });

    when(/^preencho "Nome da acomodação" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo nome
      nome = arg0;
    });

    and(/^preencho "Quantidade de quartos" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo quantidade de quartos
      quartos = arg0;
    });

    and(/^preencho "Lotação maxima" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo lotação máxima
      lotacaoMax = arg0;
    });

    and(/^preencho "Preço por noite" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo preço por noite
      preco = arg0;
    });

    and('clico no botão "Publicar"', async () => {
      // Simular requisição POST para publicar acomodação
      const novaAcomodacao = {
        nome: nome,
        quantidadeQuartos: quartos,
        lotacaoMaxima: lotacaoMax,
        precoPorNoite : preco
      };

      response = await request.post('http://localhost:5000/host/accommodations').send(novaAcomodacao);
      acomodacaoId = response.data.id;
    });

    then('a acomodação deve ser publicada com sucesso', () => {
      // Verificar se a acomodação foi publicada com sucesso
      expect(response.status).toBe(201);
    });

    and('devo ver o ID da nova acomodação', () => {
      // Verificar se o ID da nova acomodação foi retornado
      expect(acomodacaoId).toBeDefined();
    });
  });

  test('Tentar publicar uma acomodação com dados incompletos', ({ given, when, and, then }) => {
    given(/^que estou na página "(.*)"$/, async (arg0) => {
      // Simular acesso à página de publicação de acomodação
    });

    when(/^preencho "Nome da acomodação" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo nome
      nome = arg0;
    });

    and(/^preencho "Quantidade de quartos" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo quantidade de quartos
      quartos = arg0;
    });

    and(/^preencho "Lotação maxima" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo lotação máxima
      lotacaoMax = arg0;
    });

    and(/^preencho "Preço por noite" com "(.*)"$/, (arg0) => {
      // Simular preenchimento do campo preço por noite
      preco = arg0;
    });

    and('clico no botão "Publicar"', async () => {
      // Simular requisição POST para tentar publicar acomodação
      const novaAcomodacao = {
        nome: nome,
        quartos: quartos,
        lotacaoMaxima: lotacaoMax,
        preco: preco
      };

      try {
        response = await request.post('http://localhost:5000/host/accommodations').send(novaAcomodacao);
      } catch (error) {
        response = error.response;
      }
    });

    then(/^devo ver uma mensagem de erro "(.*)"$/, (mensagemErro) => {
      // Verificar se a mensagem de erro foi retornada
      expect(response.status).toBe(400);
      expect(response.data.error).toBe(mensagemErro);
    });
  });
});