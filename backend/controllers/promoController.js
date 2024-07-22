// variáveis de promoção: desconto, promoName, promoId, data_inicio, data_fim

import fs from 'fs';
import path from 'path';


function withDiscount(original, desconto) {
    return original * (1 - (desconto/100)); // retorna o valor com desconto
}

function noDiscount(original, desconto) {
    // se o desconto era de 10%, e o precoPorNoite q tá lá eh 90, o precoPorNoite original era 100 -> retorna 100
    return (original / (1 - (desconto/100))); // retorna o precoPorNoite original com base no desconto
}

function validateDate(data_inicio, data_fim) {
    return data_inicio < data_fim; // retorna true se a data de início for menor que a data de fim
}

function validateDiscount(desconto) {
    return desconto > 0 && desconto <= 100; // retorna true se o desconto for entre 1 e 100%
}

function temPromo(hotel) {
    return hotel.promoName; // retorna true se o hotel tiver promoção
}

var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));


// criar promoção
export const createPromo = (req, res) => {
    try {
        const { id, desconto, promoName, data_inicio, data_fim } = req.body; // pega os dados da requisição
        
        if (!id || !desconto || !promoName || !data_inicio || !data_fim) { // verifica se todos os campos foram preenchidos
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const hotel = data.find(hotel => String(hotel.id) === String(id)); // encontra o hotel pelo id

        if (!hotel) { // verifica se o hotel existe
            return res.status(404).json({ error: 'Erro: Hotel não encontrado.' });
        }

        if (!validateDiscount(desconto)) { 
            return res.status(400).json({ error: 'Desconto Inválido: O percentual de desconto deve ser um número entre 1 e 100.' });
        } 

        if (!validateDate(data_inicio, data_fim)) { 
            return res.status(400).json({ error: 'Datas Inválidas: A data de fim deve ser posterior a data de início.' });
        }

        const newDiscountValue = withDiscount(hotel.precoPorNoite, desconto); // calcula o novo precoPorNoite com base no desconto
        hotel.precoPorNoite = newDiscountValue; // atualiza o precoPorNoite com o novo precoPorNoite calculado

        hotel.desconto = desconto;
        hotel.promoName = promoName;
        hotel.promoId = id;
        hotel.data_inicio = data_inicio;
        hotel.data_fim = data_fim;

        fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));
        return res.status(200).json({ message: 'Promo created successfully.' }); // retorna o hotel atualizado
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};


// listar promoções
export const listPromos = (req, res) => {
    try {
        const promos = data.filter(hotel => hotel.promoName); // filtra os hotéis que possuem promoção

        if (promos.length === 0) { // verifica se há promoções
            return res.status(404).json({ error: 'No promotions found.' });
        } else {
            res.status(200).json(promos); // retorna todas as promoções
        }
        // console.log(promos.length)

    
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// deletar promoção
export const deletePromo = (req, res) => {
    try {
        const { id } = req.params; // pega o id do hotel
        console.log(`Deleting promo for hotel with id: ${id}`); 
        const hotelIndex = data.findIndex(hotel => String(hotel.id) === String(id));

        if (hotelIndex === -1) { // verifica se o hotel existe
            console.log(`Hotel with id: ${id} not found`); 
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        // remove as chaves relacionadas à promoção
        delete data[hotelIndex].promoName;
        delete data[hotelIndex].desconto;
        delete data[hotelIndex].data_inicio;
        delete data[hotelIndex].data_fim;
        delete data[hotelIndex].promoId;

        // escreve no arquivo
        fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));

        console.log(`Promo deleted for hotel with id: ${id}`);
        res.status(200).json({ message: 'Promo deleted successfully.' });
    
    } catch (error) {
        console.log(`Error deleting promo for hotel with id: ${id}: ${error.message}`); 
        return res.status(400).send({ message: error.message });
    }
};

// editar promoção
export const editPromo = (req, res) => { 
    try {
        const { id, desconto, promoName, data_inicio, data_fim } = req.body; // pega os dados da requisição

        if (!id || !desconto || !promoName || !data_inicio || !data_fim) { // verifica se todos os campos foram preenchidos
            // retorna qual campo está faltando
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const hotel = data.find(hotel => String(hotel.id) === String(id)); // encontra o hotel pelo id

        if (!hotel) { // verifica se o hotel existe
            return res.status(404).json({ error: 'Erro: Hotel não encontrado.' });
        }

        // se o hotel n tiver promo, retorna promo not found
        if (!temPromo(hotel)) {
            return res.status(200).json({ error: 'Erro: Promoção não encontrada.' });
        } 

        if (!validateDiscount(desconto)) { 
            return res.status(400).json({ error: 'Desconto Inválido: O percentual de desconto deve ser um número entre 1 e 100.' });
        }
        
        
        if (!validateDate(data_inicio, data_fim)) { 
            return res.status(400).json({ error: 'Datas Inválidas: A data de fim deve ser posterior a data de início.' });
        }
        
        // atualiza os dados
        hotel.desconto = parseInt(desconto);
        hotel.promoName = promoName;
        hotel.data_inicio = data_inicio;
        hotel.data_fim = data_fim;
        
        // escreve no arquivo
        fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2))
        res.status(200).json({ message: 'Promo edited successfully.' }); // retorna o hotel atualizado
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