import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';


const feature = loadFeature('./features/payment/add.feature');
const request = supertest(app);

let originalUsersData;


beforeAll(() => {
    originalUsersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
});


afterAll(() => {
    fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(originalUsersData, null, 2));
});


defineFeature(feature, test => {
    test('Adicionar novo método de pagamento com sucesso', ({ given, and, when, then }) => {
        let response, usersData;

        beforeEach(() => {
            usersData = JSON.parse(fs.readFileSync('./samples/users.json', 'utf8'));
        });
        
        given(/^o usuário com id "(.*)" está cadastrado no sistema$/, (id) => {
            let usersExist = usersData.some(user => user.id === id);
            
            if (!usersExist) {
                const empty = [];
                const cards = empty;

                const newUser = {
                    id: id,
                    cards: cards
                };

                usersData.push(newUser);
                fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
            }
        });

        and(/^não há o cartão com cardNumber "(.*)" e type "(.*)" registrado no seu cadastro$/, (cardNumber, type) => {
            const user = usersData.find(element => element.id === '24');

            if (user.cards.length > 0) {
                user.cards = user.cards.filter(card => card.cardNumber !== cardNumber && card.type !== type);
                fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
            }
        });

        when(/^uma nova requisição POST é feita com id: "(.*)", cardNumber: "(.*)", name: "(.*)", expireDate: "(.*)", type: "(.*)" e cvv: "(.*)"$/, async (id, cardNumber, name, expireDate, type, cvv) => {
            const url = '/payment-methods/add';

            response = await request.post(url).send({
                id, 
                cardNumber, 
                name, 
                expireDate, 
                type, 
                cvv
            });
        });

        then(/^o código de resposta é "(.*)"$/, (anscode) => {
            expect(response.status).toBe(parseInt(anscode));
        });

        and(/^o cartão com cardNumber "(.*)" e type "(.*)" é registrado no seu cadastro$/, (card_number, card_type) => {
            const { cardNumber, type } = response.body;

            expect(cardNumber).toBe(card_number);
            expect(type).toBe(card_type);
        });
    });

    test('Adicionar novo método de pagamento sem sucesso', ({ given, and, when, then }) => {
        let response, usersData;

        beforeEach(() => {
            usersData = JSON.parse(fs.readFileSync('./samples/users.json', 'utf8'));
        });        

        given(/^o usuário com id "(.*)" está cadastrado no sistema$/, (id) => {
            let usersExist = usersData.some(user => user.id === id);
            
            if (!usersExist) {
                const empty = [];
                const cards = empty;

                const newUser = {
                    id: id,
                    cards: cards
                };

                usersData.push(newUser);
                fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
            }
        });

        and(/^não há o cartão com cardNumber "(.*)" e type "(.*)" registrado no seu cadastro$/, (cardNumber, type) => {
            const user = usersData.find(element => element.id === '24');

            if (user.cards.length > 0) {
                user.cards = user.cards.filter(card => card.cardNumber !== cardNumber && card.type !== type);
                fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
            }
        });

        when(/^uma nova requisição POST é feita com id: "(.*)", cardNumber: "(.*)", name: "(.*)", expireDate: "(.*)", type: "(.*)" e cvv: "(.*)"$/, async (id, cardNumber, name, expireDate, type, cvv) => {
            const url = '/payment-methods/add';

            response = await request.post(url).send({
                id, 
                cardNumber, 
                name, 
                expireDate, 
                type, 
                cvv
            });
        });

        then(/^o cartão com cardNumber "(.*)" e type "(.*)" não é registrado no seu cadastro$/, (cardNumber, type) => {

        });

        and(/^o código de resposta é "(.*)"$/, (anscode) => {
            expect(response.status).toBe(parseInt(anscode));
        });
    });
});