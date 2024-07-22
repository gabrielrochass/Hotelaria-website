import fs from "fs";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import app from "../../..";

const feature = loadFeature("./tests/promo/editarPromo/editarPromo.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    let response;
    let data;

    beforeAll(() => {
        const filePath = path.resolve('./samples/accommodations.json');
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });

    test('Editar promoção com sucesso', ({ given, when, then }) => {
        given(/^existe uma promoção cadastrada no sistema para o hotel com id: "(.*)"$/, (id) => {
            const hotelComPromo = data.find(hotel => hotel.id === id);
            console.log('Hotel com promoção:', hotelComPromo);
            expect(hotelComPromo).toBeTruthy();
        });

        when(/^o administrador faz uma requisição PUT para o endpoint "(.*)" com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, async (endpoint, desconto, promoName, data_inicio, data_fim) => {
            // pegar o id do hotel com promoção a partir do endpoint -> promo/editar_promocao/:id
            const id = endpoint.split('/').pop();
            response = await request.put(endpoint).send({ id, desconto, promoName, data_inicio, data_fim });
        });

        then(/^o sistema retorna o código de resposta "(.*)"$/, (status) => {
            expect(response.status).toBe(parseInt(status));
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (message) => {
            expect(response.body.message).toBe(message);
        });

        then(/^a promoção de id: "(.*)" é atualizada no sistema com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, (id, desconto, promoName, data_inicio, data_fim) => {
            const hotel = data.find(hotel => hotel.id === id);
            expect(hotel.desconto).toBe(parseInt(desconto));
            expect(hotel.promoName).toBe(promoName);
            expect(hotel.data_inicio).toBe(data_inicio);
            expect(hotel.data_fim).toBe(data_fim);
        });
    });

    test('Editar promoção com erro de ausência de promoção', ({ given, when, then }) => {
        given(/^não existe uma promoção cadastrada no sistema para o hotel com id: "(.*)"$/, (id) => {
            const hotelSemPromo = data.find(hotel => hotel.id === id);
            console.log('Hotel sem promoção:', hotelSemPromo);
        });

        when(/^o administrador faz uma requisição PUT para o endpoint "(.*)" com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, async (endpoint, desconto, promoName, data_inicio, data_fim) => {
            // pegar o id do hotel sem promoção a partir do endpoint -> promo/editar_promocao/:id
            const id = endpoint.split('/').pop();
            response = await request.put(endpoint).send({ id, desconto, promoName, data_inicio, data_fim });
        });

        then(/^o sistema retorna o código de resposta "(.*)"$/, (status) => {
            expect(response.status).toBe(parseInt(status));
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (message) => {
            expect(response.body.error).toBe(message);
        });
        then(/^a promoção de id: "(.*)" não é atualizada no sistema com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, (id, desconto, promoName, data_inicio, data_fim) => {
            const hotel = data.find(hotel => hotel.id === id);
            expect(hotel.desconto).not.toBe(parseInt(desconto));
            expect(hotel.promoName).not.toBe(promoName);
            expect(hotel.data_inicio).not.toBe(data_inicio);
            expect(hotel.data_fim).not.toBe(data_fim);
        });
    });

    test('Editar promoção com erro de desconto inválido', ({ given, when, then }) => {
        given(/^existe uma promoção cadastrada no sistema para o hotel com id: "(.*)"$/, (id) => {
            const hotelComPromo = data.find(hotel => hotel.id === id);
            console.log('Hotel com promoção:', hotelComPromo);
            expect(hotelComPromo).toBeTruthy();
        });

        when(/^o administrador faz uma requisição PUT para o endpoint "(.*)" com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, async (endpoint, desconto, promoName, data_inicio, data_fim) => {
            // pegar o id do hotel com promoção a partir do endpoint -> promo/editar_promocao/:id
            const id = endpoint.split('/').pop();
            response = await request.put(endpoint).send({ id, desconto, promoName, data_inicio, data_fim });
        });

        then(/^o sistema retorna o código de resposta "(.*)"$/, (status) => {
            expect(response.status).toBe(parseInt(status));
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (message) => {
            expect(response.body.error).toBe(message);
        });

        then(/^a promoção de id: "(.*)" não é atualizada no sistema com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, (id, desconto, promoName, data_inicio, data_fim) => {
            const hotel = data.find(hotel => hotel.id === id);
            expect(hotel.desconto).not.toBe(parseInt(desconto));
            expect(hotel.promoName).not.toBe(promoName);
            expect(hotel.data_inicio).not.toBe(data_inicio);
            expect(hotel.data_fim).not.toBe(data_fim);
        });
    });

    test('Editar promoção com erro de data inválida', ({ given, when, then }) => {
        given(/^existe uma promoção cadastrada no sistema para o hotel com id: "(.*)"$/, (id) => {
            const hotelComPromo = data.find(hotel => hotel.id === id);
            console.log('Hotel com promoção:', hotelComPromo);
            expect(hotelComPromo).toBeTruthy();
        });

        when(/^o administrador faz uma requisição PUT para o endpoint "(.*)" com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, async (endpoint, desconto, promoName, data_inicio, data_fim) => {
            // pegar o id do hotel com promoção a partir do endpoint -> promo/editar_promocao/:id
            const id = endpoint.split('/').pop();
            response = await request.put(endpoint).send({ id, desconto, promoName, data_inicio, data_fim });
        });

        then(/^o sistema retorna o código de resposta "(.*)"$/, (status) => {
            expect(response.status).toBe(parseInt(status));
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (message) => {
            expect(response.body.error).toBe(message);
        });

        then(/a promoção de id: "(.*)" não é atualizada no sistema com desconto: "(.*)", promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)"$/, (id, desconto, promoName, data_inicio, data_fim) => {
            const hotel = data.find(hotel => hotel.id === id);
            expect(hotel.desconto).not.toBe(parseInt(desconto));
            expect(hotel.promoName).not.toBe(promoName);
            expect(hotel.data_inicio).not.toBe(data_inicio);
            expect(hotel.data_fim).not.toBe(data_fim);
        });
    });
});
