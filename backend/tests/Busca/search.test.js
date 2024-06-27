import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Busca/busca.feature');
const request = supertest(app);


defineFeature(feature, test => {
    test('Busca bem sucedida', ({ given, and, when, then}) => {
        let response;
        given(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "1",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "2",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com os dados CheckIn : "(.*)", CheckOut : "(.*)", Guests : "(.*)" e Location : "(.*)"$/, async (url, CheckIn, CheckOut, Guests, Location) => {
            response = await request.get(url).send({
                checkIn: CheckIn,
                checkOut: CheckOut,
                guests: Guests,
                location: Location
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem "(.*)" e "(.*)"$/, (Name1, Name2) => {
            const { hotels } = response.body;

            expect(hotels[0]).toBe(Name1);
            expect(hotels[1]).toBe(Name2);
        });
    });

    test('Busca errada', ({ given, and, when, then}) => {
        let response;
        given(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "1",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "2",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com os dados CheckIn : "(.*)", CheckOut : "(.*)", Guests : "(.*)" e Location : "(.*)"$/, async (url, CheckIn, CheckOut, Guests, Location) => {
            response = await request.get(url).send({
                checkIn: CheckIn,
                checkOut: CheckOut,
                guests: Guests,
                location: Location
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem a mensagem "(.*)"$/, (Error) => {
            const { error } = response.body;

            expect(error).toBe(Error);
        });
    });

    test('Busca mal sucedida', ({ given, and, when, then}) => {
        let response;
        given(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "1",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas$/, (Name, Location, CheckIn, CheckOut, Guests) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            const newHotel = 
                {
                    "id": "2",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": 800,
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com os dados CheckIn : "(.*)", CheckOut : "(.*)", Guests : "(.*)" e Location : "(.*)"$/, async (url, CheckIn, CheckOut, Guests, Location) => {
            response = await request.get(url).send({
                checkIn: CheckIn,
                checkOut: CheckOut,
                guests: Guests,
                location: Location
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem a mensagem "(.*)"$/, (Error) => {
            const { error } = response.body;

            expect(error).toBe(Error);
        });
    });

    test('Busca filtrada', ({ given, and, when, then}) => {
        let response;
        given(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas por "(.*)" reais e sendo "(.*)"$/, (Name, Location, CheckIn, CheckOut, Guests, Price, PetFriendly) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            let pet = false;
            if (PetFriendly === "Pet Friendly") { pet = true; }

            const newHotel = 
                {
                    "id": "1",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "petFriendly": pet,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": parseInt(Price),
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" em "(.*)" está armazenado no sistema com vagas de "(.*)" a "(.*)" para "(.*)" pessoas por "(.*)" reais e sendo "(.*)"$/, (Name, Location, CheckIn, CheckOut, Guests, Price, PetFriendly) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            data = data.filter(hotel => hotel.name !== Name);

            let pet = false;
            if (PetFriendly === "Pet Friendly") { pet = true; }

            const newHotel = 
                {
                    "id": "2",
                    "name": Name,
                    "location": Location,
                    "availableRooms": 1,
                    "petFriendly": pet,
                    "rooms": [
                        {
                            "beds": parseInt(Guests),
                            "price": parseInt(Price),
                            "freeDates": [CheckIn, CheckOut]
                        }
                    ],
                }
            ;

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com os dados CheckIn : "(.*)", CheckOut : "(.*)", Guests : "(.*)", Location : "(.*)", maxPrice : "(.*)" e petFriendly : "(.*)"$/, async (url, CheckIn, CheckOut, Guests, Location, Price, PetFriendly) => {
            let pet = false;
            if (PetFriendly === "true") { pet = true; }

            response = await request.get(url).send({
                checkIn: CheckIn,
                checkOut: CheckOut,
                guests: Guests,
                location: Location,
                maxPrice: parseInt(Price),
                petFriendly: pet
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem "(.*)"$/, (Name) => {
            const { hotels } = response.body;

            expect(hotels[0]).toBe(Name);
        });
    });

});
