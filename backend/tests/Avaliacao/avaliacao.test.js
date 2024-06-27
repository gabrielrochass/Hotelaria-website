import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Avaliacao/avaliacao.feature');
const request = supertest(app);


defineFeature(feature, test => {

    test('Acesso a página de Avaliações de uma Acomodação', ({ given, and, when, then }) => {
        given(/^usuário de id "(.*)" está na página Meu Perfil$/, (arg0) => {

        });

        and(/^dentro da Seção Avaliações Pendentes está a avaliação da acomodação de id_acom "(.*)"$/, (arg0) => {

        });

        and(/^número da sua reserva na estadia foi "(.*)"$/, (arg0) => {

        });

        when('usuário seleciona a opção Realizar Avaliação', () => {

        });

        and(/^fornece o número de reserva "(.*)", validando operação$/, (arg0) => {

        });

        then('usuário segue para a página Avaliação de Acomodação', () => {

        });
    });



})
