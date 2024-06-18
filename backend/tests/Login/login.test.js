import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Login/login.feature');
const request = supertest(app);


defineFeature(feature, test => {
    test('Login bem sucedido', ({ given, when, then }) => {
        let response;
        given('um usuário José Maria que está cadastrado no sistema', async () => {
            const url_secure = '/auth/signup';

            const post_secure = await request.post(url_secure).send({
                fullName: "José Maria",
                birthday: "01/01/1901",
                email: "JS@EMAIL.com",
                cellphone: "81912345678",
                password: "JS1234",
                confirmPassword: "JS1234"
            });
        });

        when(/^o usuario preenche os dados Email : "(.*)", password : "(.*)" e confirma$/, async (email, password) => {
            const url = '/auth/login';

            response = await request.post(url).send({
                email: email,
                password: password
            });
        });

        then('o sistema confirma a requisição', () => {
            expect(response.status).toBe(200);
        });

        then('o usuário José Maria está logado', () => {
            const { email, fullName } = response.body;

            expect(fullName).toBe("José Maria");
            expect(email).toBe("JS@EMAIL.com");
        });
    });

    test('Informações erradas no login', ({ given, when, then }) => {
        let response;
        given('um usuário José Maria que está cadastrado no sistema', () => {

        });

        when(/^o usuario preenche os dados Email : "(.*)", Senha : "(.*)"  e confirma$/, async (email, password) => {
            const url = '/auth/login';

            response = await request.post(url).send({
                email: email,
                password: password
            });
        });

        then('o sistema manda uma mensagem de erro', () => {
            expect(response.status).toBe(400);
        });

        then('o usuário José Maria não está logado', () => {
            const { error } = response.body;

            expect(error).toBe("Invalid credentials");
            
        });
    });

    test('Usuario nao cadastrado', ({ given, when, then }) => {
        let response;
        given('um usuário José Maria que não está cadastrado no sistema', () => {
            let usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            usersData = usersData.filter(user => user.email !== 'JS@EMAIL.com');
            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(usersData, null, 2));
        });

        when(/^o usuario preenche os dados Email : "(.*)", Senha : "(.*)"  e confirma$/, async (email, password) => {
            const url = '/auth/login';

            response = await request.post(url).send({
                email: email,
                password: password
            });
        });

        then('o sistema manda uma mensagem de erro', () => {
            expect(response.status).toBe(400);
        });

        then('o usuário José Maria não está logado', () => {
            const { error } = response.body;

            expect(error).toBe("Invalid credentials");
        });
    });
});
