import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('./features/Like/like.feature');
const request = supertest(app);


defineFeature(feature, test => {
    test('Adicionar um like', ({ given, and, when, then }) => {
        let response;
        given(/^o usuário "(.*)" está cadastrado no sistema com id "(.*)"$/, (Name, Id) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            data = data.filter(user => user.fullName !== Name);

            const newUser = 
                {
                    "id": Id,
                    "fullName": Name,
                    "birthday": "05/15/2000",
                    "email": "mfp2@cin.ufpe.br",
                    "cellphone": "81998138209",
                    "password": "$2a$10$C0zPbFvhQTGIUjYIMIKp3O/gNa.CQUwPAYRm4zKId9xqrrQAmPp.a",
                    "reservationsId": [ "1" ],
                    "accommodationsId": [],
                    "liked": [],
                    "saved": []
                }
            ;

            data.push(newUser)

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^a "(.*)" do usuário "(.*)" está vazia$/, (List, Name) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);

            if (user) {
                if (List === "lista de curtidas"){
                    user.liked = [];
                } else if (List === "lista de salvos") {
                    user.saved = [];
                }
            } else {
                console.log("User not found");
            }

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));

        });

        and(/^o hotel "(.*)" está cadastrado no sistema com id "(.*)"$/, (HotelName, HotelId) => {
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

        and(/^o hotel "(.*)" possui "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            hotel.likes = parseInt(Likes);

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição POST para "(.*)" com os dados UserId: "(.*)" e accommodationId: "(.*)"$/, async (url, Id, HotelId) => {
            response = await request.post(url).send({
                userId: Id,
                accommodationId: HotelId
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);


            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });

        and(/^a "(.*)" do usuário "(.*)" deve ter tamanho "(.*)"$/, (List, Name, Size) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);

            if (List === "lista de curtidas"){
                expect(user.liked.length).toBe(parseInt(Size));
            } else if (List === "lista de salvos") {
                expect(user.saved.length).toBe(parseInt(Size));
            }
        });

        and(/^o hotel "(.*)" deve ter "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            expect(hotel.likes).toBe(parseInt(Likes));
        });
    });

    test('Remover um like', ({ given, and, when, then }) => {
        let response;
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

        and(/^o hotel "(.*)" está cadastrado no sistema com id "(.*)"$/, (HotelName,HotelId) => {      
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
                };

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o usuário "(.*)" está cadastrado no sistema com id "(.*)"$/, (Name,Id) => {    
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            data = data.filter(user => user.fullName !== Name);

            const newUser = 
                {
                    "id": Id,
                    "fullName": Name,
                    "birthday": "05/15/2000",
                    "email": "mfp2@cin.ufpe.br",
                    "cellphone": "81998138209",
                    "password": "$2a$10$C0zPbFvhQTGIUjYIMIKp3O/gNa.CQUwPAYRm4zKId9xqrrQAmPp.a",
                    "reservationsId": [ "1" ],
                    "accommodationsId": [],
                    "liked": [],
                    "saved": []
                }
            ;

            data.push(newUser)

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^a "(.*)" do usuário "(.*)" contem "(.*)" e "(.*)"$/, (List, Name, Hotel1, Hotel2) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel1 = hotelData.find(hotel => hotel.name === Hotel1);
            let hotel2 = hotelData.find(hotel => hotel.name === Hotel2);

            if (user) {
                if (List === "lista de curtidas"){
                    user.liked = [hotel1.id, hotel2.id];
                } else if (List === "lista de salvos") {
                    user.saved = [hotel1.id, hotel2.id];
                }
            } else {
                console.log("User not found");
            }

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" possui "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            hotel.likes = parseInt(Likes);

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" possui "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            hotel.likes = parseInt(Likes);

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição DELETE para "(.*)" com os dados UserId: "(.*)" e accommodationId: "(.*)"$/, async (url, UserId, HotelId) => {
            response = await request.delete(url).send({
                userId: UserId,
                accommodationId: HotelId
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);

            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });

        and(/^a "(.*)" do usuário "(.*)" deve ter tamanho "(.*)"$/, (List, Name, Size) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);

            if (List === "lista de curtidas"){
                expect(user.liked.length).toBe(parseInt(Size));
            } else if (List === "lista de salvos") {
                expect(user.saved.length).toBe(parseInt(Size));
            }
        });

        and(/^o hotel "(.*)" deve ter "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            expect(hotel.likes).toBe(parseInt(Likes));
        });

        and(/^o hotel "(.*)" deve ter "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            expect(hotel.likes).toBe(parseInt(Likes));
        });
    });

    test('Ver lista de likes', ({ given, and, when, then }) => {
        let response;
        given(/^o usuário "(.*)" está cadastrado no sistema com id "(.*)"$/, (Name,Id) => {    
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            data = data.filter(user => user.fullName !== Name);

            const newUser = 
                {
                    "id": Id,
                    "fullName": Name,
                    "birthday": "05/15/2000",
                    "email": "mfp2@cin.ufpe.br",
                    "cellphone": "81998138209",
                    "password": "$2a$10$C0zPbFvhQTGIUjYIMIKp3O/gNa.CQUwPAYRm4zKId9xqrrQAmPp.a",
                    "reservationsId": [ "1" ],
                    "accommodationsId": [],
                    "liked": [],
                    "saved": []
                }
            ;

            data.push(newUser)

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^a "(.*)" do usuário "(.*)" contem "(.*)" e "(.*)"$/, (List, Name, Hotel1, Hotel2) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel1 = hotelData.find(hotel => hotel.name === Hotel1);
            let hotel2 = hotelData.find(hotel => hotel.name === Hotel2);

            if (user) {
                if (List === "lista de curtidas"){
                    user.liked = [hotel1.id, hotel2.id];
                } else if (List === "lista de salvos") {
                    user.saved = [hotel1.id, hotel2.id];
                }
            } else {
                console.log("User not found");
            }

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição GET para "(.*)" com os dados UserId: "(.*)"$/, async (url, Id) => {
            response = await request.get(url).send({
                userId: Id,
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem um array com "(.*)" e "(.*)"$/, (Hotel1,Hotel2) => {
            const { liked } = response.body;

            expect(liked[0]).toBe(Hotel1);
            expect(liked[1]).toBe(Hotel2);
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);

            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);

            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });
    });

    test('Adicionar um like repetido', ({ given, and, when, then }) => {
        let response;
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

        and(/^o hotel "(.*)" está cadastrado no sistema com id "(.*)"$/, (HotelName,HotelId) => {      
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
                };

            data.push(newHotel)

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o usuário "(.*)" está cadastrado no sistema com id "(.*)"$/, (Name,Id) => {    
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            data = data.filter(user => user.fullName !== Name);

            const newUser = 
                {
                    "id": Id,
                    "fullName": Name,
                    "birthday": "05/15/2000",
                    "email": "mfp2@cin.ufpe.br",
                    "cellphone": "81998138209",
                    "password": "$2a$10$C0zPbFvhQTGIUjYIMIKp3O/gNa.CQUwPAYRm4zKId9xqrrQAmPp.a",
                    "reservationsId": [ "1" ],
                    "accommodationsId": [],
                    "liked": [],
                    "saved": []
                }
            ;

            data.push(newUser)

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^a "(.*)" do usuário "(.*)" contem "(.*)" e "(.*)"$/, (List, Name, Hotel1, Hotel2) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel1 = hotelData.find(hotel => hotel.name === Hotel1);
            let hotel2 = hotelData.find(hotel => hotel.name === Hotel2);

            if (user) {
                if (List === "lista de curtidas"){
                    user.liked = [hotel1.id, hotel2.id];
                } else if (List === "lista de salvos") {
                    user.saved = [hotel1.id, hotel2.id];
                }
            } else {
                console.log("User not found");
            }

            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" possui "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            hotel.likes = parseInt(Likes);

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        and(/^o hotel "(.*)" possui "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            hotel.likes = parseInt(Likes);

            fs.writeFileSync(path.resolve('./samples/hotels.json'), JSON.stringify(data, null, 2));
        });

        when(/^envio uma requisição POST para "(.*)" com os dados UserId: "(.*)" e accommodationId: "(.*)"$/, async (url, UserId, HotelId) => {
            response = await request.post(url).send({
                userId: UserId,
                accommodationId: HotelId
            });
        });

        then(/^a resposta deve ter o status "(.*)"$/, (Status) => {
            expect(response.status).toBe(parseInt(Status));
        });

        and(/^a resposta contem a mensagem "(.*)"$/, (Error) => {
            expect(response.body.error).toBe(Error);
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);

            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });

        and(/^a "(.*)" do usuário "(.*)" deve conter "(.*)"$/, (List, Name, HotelName) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let hotelData = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);
            let hotel = hotelData.find(hotel => hotel.name === HotelName);

            if (List === "lista de curtidas"){
                expect(user.liked).toContain(hotel.id);
            } else if (List === "lista de salvos") {
                expect(user.saved).toContain(hotel.id);
            }
        });

        and(/^a "(.*)" do usuário "(.*)" deve ter tamanho "(.*)"$/, (List, Name, Size) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
            let user = data.find(user => user.fullName === Name);

            if (List === "lista de curtidas"){
                expect(user.liked.length).toBe(parseInt(Size));
            } else if (List === "lista de salvos") {
                expect(user.saved.length).toBe(parseInt(Size));
            }
        });

        and(/^o hotel "(.*)" deve ter "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            expect(hotel.likes).toBe(parseInt(Likes));
        });

        and(/^o hotel "(.*)" deve ter "(.*)" likes$/, (HotelName, Likes) => {
            let data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
            let hotel = data.find(hotel => hotel.name === HotelName);

            expect(hotel.likes).toBe(parseInt(Likes));
        });
    });
});
