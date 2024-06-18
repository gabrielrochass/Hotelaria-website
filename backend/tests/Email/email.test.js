import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Email/emails.feature');
const request = supertest(app);


defineFeature(feature, test => {
    test('Envio de email', ({ given, then, when }) => {
        let response;
        given('um usuário José Maria está logado', () => {

        });

        then('o usuário José Maria está na página de confirmação de reserva', () => {

        });

        when(/^o usuário José Maria confirma a sua reserva de id "(.*)"$/, async (reservationId) => {
            const url = '/email';

            response = await request.get(url).send({
                reservationId: reservationId
            });
        });

        then('o sistema confirma a requisição', () => {
            expect(response.status).toBe(200);
        });

        then('um Email é enviado com os dados fornecidos pelo sistema para “José Maria”', () => {
            const { id } = response.body;

            expect(id).toBe("1");
        });
    });

    test('ID da reserva incorreto', ({ given, then, when }) => {
        let response;
        given('um usuário José Maria está logado', () => {

        });

        then('o usuário José Maria está na página de confirmação de reserva', () => {
            
        });

        when(/^o usuário José Maria confirma a sua reserva de id "(.*)" incorreto$/, async (reservationId) => {
            const url = '/email';

            response = await request.get(url).send({
                reservationId: reservationId
            });
        });

        then('o sistema envia uma mensagem de erro', () => {
            expect(response.status).toBe(400);
        });

        then('um Email não é enviado com os dados fornecidos pelo sistema para “José Maria”', () => {
            const { error } = response.body;

            expect(error).toBe("Reservation not found");
        });
    });
});
