// variáveis de promoção: desconto, promoName, data_inicio, data_fim

import fs from 'fs';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

function withDiscount(originalValue, discountPercentage) {
    return originalValue * ((100 - discountPercentage) / 100);
}

function noDiscount(hotel) {
    // se o desconto era de 10%, e o precoPorNoite q tá lá eh 90, o precoPorNoite original era 100 -> retorna 100
    return (hotel.precoPorNoite * 100) / (100 - hotel.desconto); // retorna o precoPorNoite original com base no desconto
}

function validateDate(data_inicio, data_fim) {
    return data_inicio < data_fim; // retorna true se a data de início for menor que a data de fim
}

function validateDiscount(desconto) {
    return desconto > 0 && desconto <= 100; // retorna true se o desconto for entre 1 e 100%
}

var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'))


// criar promoção
export const createPromo = (req, res) => {
    try {
        const { id, desconto, promoName, data_inicio, data_fim } = req.body; // pega os dados da requisição
        const hotelIndex = data.findIndex(hotel => String(hotel.id) === String(id)); // encontra o hotel pelo id
        
        if (hotelIndex === -1) { // verifica se o hotel existe
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        const hotel = data[hotelIndex]; // obtém o hotel encontrado
        if (!validateDiscount(desconto)) { // verifica se o desconto é válido
            return res.status(400).json({ error: 'Invalid discount. It should be between 1 and 100' });
        }

        const newDiscountValue = withDiscount(hotel.precoPorNoite, desconto); // calcula o novo precoPorNoite com base no desconto
        hotel.precoPorNoite = newDiscountValue; // atualiza o precoPorNoite com o novo precoPorNoite calculado

        hotel.desconto = desconto;
        hotel.promoName = promoName;
        hotel.promoId = uuidv4(); 
        
        if (!validateDate(data_inicio, data_fim)) { // verifica se a data de início é menor que a data de fim
            return res.status(400).json({ error: 'Invalid date.' });
        }
        hotel.data_inicio = data_inicio;
        hotel.data_fim = data_fim;

        data[hotelIndex] = hotel; // atualiza o hotel no banco de dados
        res.status(201).json(hotel); // retorna o hotel atualizado
    
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// listar promoções
export const listPromos = (req, res) => {
    try {
        const promos = data.filter(hotel => hotel.promoName); // filtra os hotéis que possuem promoção
        res.status(200).json(promos); // retorna todas as promoções
    
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// deletar promoção
export const deletePromo = (req, res) => {
    try {
        const { id } = req.params; // pega o id do hotel
        console.log(`Deleting promo for hotel with id: ${id}`); // log the id for debugging
        const hotelIndex = data.findIndex(hotel => String(hotel.id) === String(id));

        if (hotelIndex === -1) { // verifica se o hotel existe
            console.log(`Hotel with id: ${id} not found`); // log the error for debugging
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        const hotel = data[hotelIndex]; // obtém o hotel encontrado
        delete hotel.desconto;
        delete hotel.promoName;
        delete hotel.data_inicio;
        delete hotel.data_fim;
        hotel.precoPorNoite = noDiscount(hotel); 
        data[hotelIndex] = hotel; // atualiza o hotel no banco de dados
        console.log(`Promo deleted for hotel with id: ${id}`); // log the success for debugging
        res.status(200).json({ message: 'Promo deleted successfully.' });
    
    } catch (error) {
        console.log(`Error deleting promo for hotel with id: ${id}: ${error.message}`); // log the error for debugging
        return res.status(400).send({ message: error.message });
    }
};

// editar promoção
export const editPromo = (req, res) => { 
    try {
        const { id, desconto, promoName, data_inicio, data_fim } = req.body; // pega os dados da requisição
        const hotelIndex = data.findIndex(hotel => hotel.id === id);

        if (hotelIndex === -1) { // verifica se o hotel existe
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        const hotel = data[hotelIndex]; // obtém o hotel encontrado

        if (!validateDiscount(desconto)) { 
            return res.status(400).json({ error: 'Invalid discount. It should be between 1 and 100.' });
        }

        const newDiscountValue = withDiscount(hotel, desconto); 

        // atualiza os dados do hotel
        hotel.desconto = desconto;
        hotel.promoName = promoName;

        if (!validateDate(data_inicio, data_fim)) { 
            return res.status(400).json({ error: 'Invalid date. Final date should be after the beginning promotion date.' });
        }

        hotel.data_inicio = data_inicio;
        hotel.data_fim = data_fim;
        hotel.precoPorNoite = newDiscountValue; 
        
        data[hotelIndex] = hotel; // atualiza o hotel no banco de dados
        res.status(200).json(hotel); // retorna o hotel atualizado
    
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// input post:
// {
//     "id": 3,
//     "desconto": 10,
//     "promoName": "Promoção metade",
//     "data_inicio": "2021-10-01",
//     "data_fim": "2021-10-31"
// }



// input edit:
// {
//     "id": 1,
//     "desconto": 20,
//     "promoName": "Nova Promoção",
//     "data_inicio": "2022-01-01",
//     "data_fim": "2022-01-31"
// }

// substituir hotels.json por amodacoes.json