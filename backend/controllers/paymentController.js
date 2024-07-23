import fs from 'fs';
import path from 'path';


export const visualize = async (req, res) => {
    try {
        const { id } = req.query;

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        const user = data.find(element => element.id === id);
        
        if (user) {
            res.status(200).json(user.cards);
        } 
        else {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }        
    }
    catch (error) {
        console.log("Error in visualize controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }; 
};


export const add =  async (req, res) => {
    try {
        const { id, cardNumber, name, expireDate, type, cvv } = req.body;

        // Validation
        // Empty field
        if (!cardNumber || !name || !expireDate || !type || !cvv) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Size and isDigit
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(cardNumber)) {
            console.log("Card number must have sixteen digits and contain only numbers");
            return res.status(400).json({
                error: "Card number must have sixteen digits and contain only numbers"
            }); 
        }

        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(cvv)) {
            console.log("CVV must have three digits and contain only numbers");
            return res.status(400).json({
                error: "CVV must have three digits and contain only numbers"
            });
        }

        // mm/dd/yyyy format and isDigit
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        const currentDate = new Date();
        const inputDate = new Date(expireDate);
        if (!dateRegex.test(expireDate) || inputDate < currentDate) {
            console.log("Expire date is not valid");
            return res.status(400).json({
                error: "Expire date is not valid"
            });
        }

        // Debit or credit
        if (type != "debit" && type != "credit") {
            console.log("Card must be of type debit or credit");
            return res.status(400).json({
                error: "Card must be of type debit or credit"
            });
        }

        // isUnique
        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        const user = data.find(element => element.id === id);

        if (user && user.cards) {
            const existingCard = user.cards.find(card => card.cardNumber === cardNumber && card.type === type);
            
            if (existingCard) {
                console.log("Card already registered");
                return res.status(400).json({
                    error: "Card already registered"
                });
            };
        }

        // Add new payment method
        user.cards.push({ cardNumber, type });
        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        res.status(201).json({
            cardNumber,
            type
        });
    }
    catch (error) {
        console.log("Error in add controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    };
};


export const remove = async (req, res) => {
    try {
        const { id, cardNumber, type } = req.query;
        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        const userIndex = data.findIndex(element => element.id === id);
        const user = data[userIndex];

        // Validation
        // Existing card
        const existingCard = user.cards.find(element => element.cardNumber === cardNumber && element.type === type);
        if (!existingCard) {
            console.log("Card not found");
            return res.status(404).json({
                error: "Card not found"
            });
        }

        // Remove card
        user.cards = user.cards.filter(element => !(element.cardNumber === cardNumber && element.type === type));
        data[userIndex] = user;
        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2));
        return res.status(204).json();
    }
    catch (error) {
        console.log("Error in remove controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    };
};