import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';


const feature = loadFeature('./features/Pagamento/remover.feature');
const request = supertest(app);

let originalUsersData;


beforeAll(() => {
    originalUsersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
});


afterAll(() => {
    fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(originalUsersData, null, 2));
});


defineFeature(feature, test => {
    test('Remover método de pagamento', ({ given, and, when, then }) => {
        let response, usersData;

        beforeEach(() => {
            usersData = JSON.parse(fs.readFileSync('./samples/users.json', 'utf8'));
        });

        given(/^o usuário com e-mail "(.*)" está cadastrado no sistema$/, (email) => {
            let usersExist = usersData.some(user => user.email === email);
            
            if (!usersExist) {
                const empty = [];
                const cards = empty;

                const newUser = {
                email: email,
                cards: cards
                };

                usersData.push(newUser);
                fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
            }
        });

        and(/^o cartão com cardNumber "(.*)" e type "(.*)" está registrado no seu cadastro$/, (cardNumber, type) => {
            const user = usersData.find(element => element.email === 'iasmin@protonmail.com');

            if (user) {
                const existingCard = user.cards.some(card => card.cardNumber === cardNumber && card.type === type);

                if (!existingCard) {
                    const card = {
                        cardNumber: cardNumber,
                        type: type
                    };

                    user.cards.push(card);
                    fs.writeFileSync('./samples/users.json', JSON.stringify(usersData, null, 2));
                }
            }
        });

        when(/^uma nova requisição DELETE é feita com email: "(.*)", cardNumber: "(.*)" e type: "(.*)"$/, async (email, cardNumber, type) => {
            const url = '/pagamento/remove';

            response = await request.delete(url).send({
                email,
                cardNumber,
                type
            })
        });

        then('o cartão é removido do seu cadastro', () => {

        });

        and(/^o código de resposta é "(.*)"$/, (anscode) => {
            expect(response.status).toBe(parseInt(anscode));
        });
    });
});