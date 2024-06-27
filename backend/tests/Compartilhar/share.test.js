import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Compartilhar/compartilhar.feature');
const request = supertest(app);


defineFeature(feature, test => {
    let response;
    test('Compartilhar hotel', ({ given, when, then, and }) => {

        given(/^o hotel "(.*)" está cadastrado no sistema com id "(.*)"$/, (HotelName, HotelId) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== HotelName);

            const newHotel = 
                {
                    "id": HotelId,
                    "name": HotelName,
                    "location": "Fernando de Noronha",
                    "availableRooms": 1,
                    "petFriendly": true,
                    "rooms": [
                        {
                            "beds": 2,
                            "price": 1500,
                            "freeDates": [
                            "21/05",
                            "24/05"
                            ]
                        }
                    ]
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com o dado accommodationId: "(.*)"$/, async (url, HotelId) => {
            response = await request.get(url).send({
                accommodationId: HotelId
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem uma mensagem com "(.*)"$/, (Link) => {
            expect(response.body.link).toBe(Link);
        });
    });
});
