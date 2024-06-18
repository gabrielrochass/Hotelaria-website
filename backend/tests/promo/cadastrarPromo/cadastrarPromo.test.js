import fs from "fs";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import app from "../../..";

const feature = loadFeature("./tests/promo/cadastrarPromo/cadastrarPromo.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    test('Cadastro com sucesso de nova promoção', ({ given, when, then }) => {
        let response;
        
        given('o administrador João que deseja cadastrar uma nova promoção', () => {
            // Nada a ser implementado aqui para este exemplo
        });

        given('uma acomodação com id: "2" está cadastrada no sistema', () => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            data = data.filter(accommodation => accommodation.id !== "2");
            console.log('Dados atualizados de acomodações:', data);
            fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        });

        when(/^o administrador preenche os dados id: (\d+), desconto: (\d+), promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)" e confirma$/, async (id, desconto, promoName, data_inicio, data_fim) => {
            const url = '/promo/cadastrar_promocao';
            response = await request.post(url).send({
                id: id,
                desconto: desconto,
                promoName: promoName,
                data_inicio: data_inicio,
                data_fim: data_fim
            });
            console.log('Resposta da requisição:', response.status, response.body);
            console.log('Dados da requisição:', id, desconto, promoName, data_inicio, data_fim);
        });

        then('o sistema confirma a requisição', () => {
            console.log('Status da resposta:', response.status);
            expect(response.status).toBe(200);
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (mensagem) => {
            console.log('Mensagem da resposta:', response.body.message);
            expect(response.body.message).toBe(mensagem);
        });

        then('a acomodação "Apartamento Central" possui desconto de 50%, promoName "Promoção metade", data_inicio "2021-10-01", data_fim "2021-10-31"', () => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            const accommodation = data.find(accommodation => accommodation.id === "2");
            console.log('Acomodação encontrada:', accommodation);
            expect(accommodation.desconto).toBe('50');
            expect(accommodation.promoName).toBe('Promoção metade');
            expect(accommodation.data_inicio).toBe('2021-10-01');
            expect(accommodation.data_fim).toBe('2021-10-31');
        });
    });

    test('Cadastro falho de nova promoção devido à ausência de acomodação cadastrada', ({ given, when, then }) => {
        let response;
        
        given('o administrador João que deseja cadastrar uma nova promoção', () => {
            // Nada a ser implementado aqui para este exemplo
        });

        given('uma acomodação com id: "5" está cadastrada no sistema', () => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            data = data.filter(accommodation => accommodation.id !== "5");
            console.log('Dados atualizados de acomodações:', data);
            fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        });

        when(/^o administrador preenche os dados id: (\d+), desconto: (\d+), promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)" e confirma$/, async (id, desconto, promoName, data_inicio, data_fim) => {
            const url = '/promo/cadastrar_promocao';
            response = await request.post(url).send({
                id: id,
                desconto: desconto,
                promoName: promoName,
                data_inicio: data_inicio,
                data_fim: data_fim
            });
            console.log('Resposta da requisição:', response.status, response.body);
            console.log('Dados da requisição:', id, desconto, promoName, data_inicio, data_fim);
        });
        
        then('o sistema dá um código de retorno', () => {
            console.log('Status da resposta:', response.status);
            expect(response.status).toBe(404);
        });
        
        then(/^o sistema retorna a mensagem "(.*)"$/, (mensagem) => {
            console.log('Mensagem da resposta:', mensagem);
            expect(response.body.error).toBe(mensagem);
            
        });
    });
    
    test('Cadastro falho de nova promoção devido à ausência de informações', ({ given, when, then }) => {
        let response;
        
        given('o administrador João que deseja cadastrar uma nova promoção', () => {
            // Nada a ser implementado aqui para este exemplo
        });

        given('uma acomodação com id: "2" está cadastrada no sistema', () => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            data = data.filter(accommodation => accommodation.id !== "2");
            console.log('Dados atualizados de acomodações:', data);
            fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        });

        when(/^o administrador preenche os dados id: (\d+), desconto: (\d+), promoName: "(.*)", data_inicio: "(.*)", data_fim: "(.*)" e confirma$/, async (id, desconto, promoName, data_inicio, data_fim) => {
            const url = '/promo/cadastrar_promocao';
            response = await request.post(url).send({
                id: id,
                desconto: desconto,
                promoName: promoName,
                data_inicio: data_inicio,
                data_fim: data_fim
            });
            console.log('Resposta da requisição:', response.status, response.body);
            console.log('Dados da requisição:', id, desconto, promoName, data_inicio, data_fim);
        });

        then('o sistema dá um código de retorno', () => {
            console.log('Status da resposta:', response.status);
            expect(response.status).toBe(400);
        });

        then(/^o sistema retorna a mensagem "(.*)"$/, (mensagem) => {
            console.log('Mensagem da resposta:', mensagem);
            expect(response.body.error).toBe(mensagem);
        });
    });
});
