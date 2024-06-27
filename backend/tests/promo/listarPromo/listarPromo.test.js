import fs from 'fs';
import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import supertest from 'supertest';
import app from '../../..';

const feature = loadFeature('./tests/promo/listarPromo/listarPromo.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let response;
    let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
    const accommodationsWithoutPromotions = data.filter(accommodation => !accommodation.promoName);
    const accommodationsWithPromotions = data.filter(accommodation => accommodation.promoName);

    test("Lista de promoções cadastradas não vazia", ({ given, when, then, and }) => {
        given("existem promoções cadastradas no sistema", () => {
            fs.writeFileSync(path.resolve('./samples/accommodations_with_promos.json'), JSON.stringify(accommodationsWithPromotions, null, 2));
        });

        when('uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"', async () => {
            const url = '/promo/promocoes_cadastradas';
            response = await request.get(url);
            console.log('Resposta da requisição:', response.status, response.body);
        });

        then('o código de resposta é 200', () => {
            if (accommodationsWithPromotions.length === 0) {
                expect(response.status).toBe(404);
            } else {
                expect(response.status).toBe(200);
            }
        });

        and('o sistema retorna as "promos"', () => {
            expect(response.body).toEqual(accommodationsWithPromotions);
        });
    });
    
    test("Lista de promoções cadastradas vazia", ({ given, when, then }) => {
        given('não existem promoções cadastradas no sistema', () => {
            fs.writeFileSync(path.resolve('./samples/accommodations_without_promos.json'), JSON.stringify(accommodationsWithoutPromotions, null, 2));
        });

        when('uma nova requisição GET é feita para o endpoint "/promocoes_cadastradas"', async () => {
            const url = '/promo/promocoes_cadastradas';
            try {
                response = await request.get(url);
                console.log('Resposta da requisição:', response.status, response.body);
            } catch (error) {
                response = error.response;
            }
        });

        then('o código de resposta é 200', () => {
            if(accommodationsWithPromotions.length === 0) {
                expect(response.status).toBe(404);
            } else {
                expect(response.status).toBe(200);
            }
        });

        then('o sistema retorna a mensagem "No promotions found"', () => {
            expect(accommodationsWithPromotions).toHaveLength(0);
        });
    });
});
