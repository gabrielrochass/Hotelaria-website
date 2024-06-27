import fs from 'fs';
import { defineFeature, loadFeature } from "jest-cucumber";
import path from 'path';
import supertest from "supertest";
import app from "../../..";

const feature = loadFeature("./tests/promo/deletarPromo/deletarPromo.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    test('Excluir promoção com sucesso', ({ given, when, then }) => {
        let response;

        given('existem promoções cadastradas no endpoint "/promocoes_cadastradas"', () => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            console.log('Dados de promoções:', data);
        });
        when(/^Iasmin faz uma requisição DELETE para o endpoint "(.*)"$/, async (url) => {
            const id = url.split("/").pop();
            console.log('ID da promoção:', id);
            response = await request.delete(`/promo/deletar_promocao/${id}`);
            // as informações de promoção, ou seja, promoName, desconto, dataInicio e dataFim, são apagadas do arquivo JSON para a acomodação com id fornecido    
        });

        then('o sistema retorna o código de resposta', () => {
            expect(response.status).toBe(200);
        });

        then(/^o sistema retorna a mensagem (.*)$/, () => {
            expect(response.body.message).toBe('Promo deleted successfully.');
        });
    });

    test('Excluir promoção inexistente', ({ given, when, then }) => {
        let response;

        given(/^não existe uma promoção associada ao id: (.*) cadastrada no endpoint "\/promocoes_cadastradas"$/, (id) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));
            data = data.filter(accommodation => accommodation.id !== id);
            console.log('Dados atualizados de acomodações:', data);
            fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        });

        when(/^Iasmin faz uma requisição DELETE para o endpoint "(.*)"$/, async (url) => {
            const id = url.split("/").pop();
            console.log('ID da promoção:', id);
            response = await request.delete(`/promo/deletar_promocao/${id}`);
        });

        then('o sistema retorna o código de resposta', () => {
            // se o id tá lá, mas n tem promoName, retorna 200, else 404
            expect(response.status).toBe(404);
        
        });

        then(/^o sistema retorna a mensagem (.*)$/, () => {
            expect(response.body.error).toBe('Hotel not found.');
        });
    });
});