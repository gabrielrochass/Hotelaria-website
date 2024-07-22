import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const publishAccommodation = async (req, res) => {
    try {
        const { nome, quantidadeQuartos, lotacaoMaxima, precoPorNoite, userId } = req.body;

        // validações 
        if (!nome || !quantidadeQuartos || !lotacaoMaxima || !precoPorNoite || !userId) {
            console.log("All fields are required");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        if (isNaN(quantidadeQuartos) || quantidadeQuartos <= 0) {
            console.log("Quantity of rooms must be a positive number");
            return res.status(400).json({
                error: "Quantity of rooms must be a positive number"
            });
        }

        if (isNaN(lotacaoMaxima) || lotacaoMaxima <= 0) {
            console.log("Maximum occupancy must be a positive number");
            return res.status(400).json({
                error: "Maximum occupancy must be a positive number"
            });
        }

        if (isNaN(precoPorNoite) || precoPorNoite <= 0) {
            console.log("Price per night must be a positive number");
            return res.status(400).json({
                error: "Price per night must be a positive number"
            });
        }

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));

        const accommodationId = data.length+1;
        const newAccommodation = {
            id: accommodationId,
            nome,
            quantidadeQuartos,
            lotacaoMaxima,
            precoPorNoite,
            userId,
            ratingsId: [],
            finalGrade: null,
        };

        data.push(newAccommodation);

        fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));

        res.status(201).json({
            message: "Accommodation published successfully",
            id: accommodationId
        });

    } catch (error) {
        console.log("Error in publishAccommodation controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

// Função para editar uma acomodação
export const editAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidadeQuartos, lotacaoMaxima, precoPorNoite } = req.query;

        // validações
        if (!nome || !quantidadeQuartos || !lotacaoMaxima || !precoPorNoite) {
            console.log("All fields are required");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        if (isNaN(quantidadeQuartos) || quantidadeQuartos <= 0) {
            console.log("Quantity of rooms must be a positive number");
            return res.status(400).json({
                error: "Quantity of rooms must be a positive number"
            });
        }

        if (isNaN(lotacaoMaxima) || lotacaoMaxima <= 0) {
            console.log("Maximum occupancy must be a positive number");
            return res.status(400).json({
                error: "Maximum occupancy must be a positive number"
            });
        }

        if (isNaN(precoPorNoite) || precoPorNoite <= 0) {
            console.log("Price per night must be a positive number");
            return res.status(400).json({
                error: "Price per night must be a positive number"
            });
        }

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));

        const accommodationIndex = data.findIndex(accommodation => accommodation.id === id);
        if (accommodationIndex === -1) {
            console.log("Accommodation not found");
            return res.status(404).json({
                error: "Accommodation not found"
            });
        }

        data[accommodationIndex] = {
            ...data[accommodationIndex],
            nome,
            quantidadeQuartos,
            lotacaoMaxima,
            precoPorNoite
        };

        fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));

        res.status(200).json({
            message: "Accommodation edited successfully",
            accommodation: data[accommodationIndex]
        });

    } catch (error) {
        console.log("Error in editAccommodation controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

// Função para listar acomodações publicadas por um usuário
export const listPublishedAccommodations = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            console.log("User ID is required");
            return res.status(400).json({
                error: "User ID is required"
            });
        }

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));

        const userAccommodations = data.filter(accommodation => accommodation.userId === userId);

        res.status(200).json(userAccommodations);

    } catch (error) {
        console.log("Error in listPublishedAccommodations controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const deleteAccommodation =  async (req, res) => {
    try{ 
    const { id } = req.params;

    var data = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));


    const index = data.findIndex(acc => acc.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Accommodation not found' });
    }

    data.splice(index, 1);

    fs.writeFileSync(path.resolve('./samples/accommodations.json'), JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
        console.log("Error in deleteAccommodations controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
