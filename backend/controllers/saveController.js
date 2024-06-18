import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const save =  async (req, res) => {
    try {
        const { userId, accommodationId } = req.body;
        var user_data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));

        if (!userId || !accommodationId) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        var user = user_data.find(user => user.id === userId);

        if (!user.saved.includes(accommodationId)){
            console.log("Saved Hotel");
            user.saved.push(accommodationId)
        }

        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(user_data, null, 2));
    }
    catch (error) {
        console.log("Error in Save controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    }
}

export const unsave =  async (req, res) => {
    try {
        const { userId, accommodationId } = req.body;
        var user_data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));

        if (!userId || !accommodationId) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        var user = user_data.find(user => user.id === userId);

        if (user.saved.includes(accommodationId)){
            user.saved.pop(accommodationId);
        }

        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(user_data, null, 2));
    }
    catch (error) {
        console.log("Error in Save controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    }
}
export const getSaves =  async (req, res) => {
    try {
        const { userId } = req.body;
        var user_data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        var hotel_data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));

        if (!userId) {
            console.log("Log in to view your saves")
            return res.status(400).json({
                error: "Log in to view your saves"
            });
        }

        var user = user_data.find(user => user.id === userId);

        for (let i = 0; i < user.saved.length; i++){
            var hotel = hotel_data.find(hotel => hotel.id === user.saved[i]);
            console.log(hotel.name);
        }

    }
    
    catch (error) {
        console.log("Error in Save controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    } 
}