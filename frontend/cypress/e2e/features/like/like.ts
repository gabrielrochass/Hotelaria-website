import { Given, When, Then} from '@cucumber/cucumber';
import { expect } from 'chai';

// Mapeamento dos cenários para a lógica de teste
let currentLikes: number = 0;
let buttonText: string = 'Curtir';

Given('o usuário está na página {string} de {string}', function (page: string, place: string) {
    cy.visit('/detalhes-da-acomodacao');
});

Given('{string} possui {int} likes', function (place: string, likes: number) {
    cy.get('[data-cy=Likes]').should('contain', likes);
});

When('o usuário clica no botão {string}', function (button: string) {
    cy.get('[data-cy="Curtir"]').click();
});

Then('{string} possui {int} likes', function (place: string, likes: number) {
    cy.get('[data-cy=Likes]').should('contain', likes);
});

Then('o botão virou {string}', function (expectedButtonText: string) {
    cy.get('[data-cy="Curtir"]').should('contain', expectedButtonText);
});
