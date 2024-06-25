import fs from "fs";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import app from "../../..";

const feature = loadFeature("./tests/promo/editarPromo/editarPromo.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    let response; 
    test('Editar promoção com sucesso', ({ given, when, then }) => {
        given(/^existe uma promoção cadastrada no sistema com id: "(.*)"$/, (id) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            data = data.filter(accommodation => accommodation.id !== id);
            console.log('Dados atualizados de acomodações:', data);
            fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        });
        when(/^Maria faz uma requisição PUT para o endpoint "(.*)" com id: "(.*)", "(.*)": (\d+), "(.*)": "(.*)", "(.*)": "(.*)", "(.*)": "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) => {
            const id = arg1;
            const url = '/promo/editar_promocao/' + id;
            response = await request.put(url).send({
                id: arg1,
                desconto: arg3,
                promoName: arg5,
                data_inicio: arg7,
                data_fim: arg9
            });
            console.log('Resposta da requisição:', response.status, response.body);
            console.log('Dados da requisição:', id, arg3, arg5, arg7, arg9);
        });
        then(/^o sistema retorna o código de resposta "(.*)"$/, (status) => {
            console.log('Status da resposta:', response.status);
            expect(String(response.status)).toBe(String(status));
        });
        then(/^o sistema retorna a mensagem "(.*)"$/, (mensagem) => {
            console.log('Mensagem da resposta:', response.body.message);
            expect(response.body.message).toBe(mensagem);
        });
        then(/^a promoção com id: "(.*)" possui desconto de (\d+), promoName "(.*)", data_inicio "(.*)" e data_fim "(.*)"$/, (id, desconto, promoName, dataInicio, dataFim) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            const accommodation = data.find(accommodation => accommodation.id === id);
            expect(accommodation.desconto).toBe(desconto);
            expect(accommodation.promoName).toBe(promoName);
            expect(accommodation.data_inicio).toBe(dataInicio);
            expect(accommodation.data_fim).toBe(dataFim);
        });
    });
});