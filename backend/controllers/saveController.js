import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const save =  async (req, res) => {
    try {
        const { userId, accommodationId } = req.body;
        var user_data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        var hotel_data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));

        if (!userId || !accommodationId) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let user = user_data.find(user => user.id === userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        let hotel = hotel_data.find(hotel => hotel.id === accommodationId);

        if (!user.saved.includes(accommodationId)){
            console.log("Saved Hotel");
            user.saved.push(accommodationId)
            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(user_data, null, 2));
            return res.status(200).json({
                "Saved": hotel.name
            });
        } else {
            return res.status(400).json({ error: "Hotel already saved" });
        }
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
        var hotel_data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));

        if (!userId || !accommodationId) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        var user = user_data.find(user => user.id === userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        let hotel = hotel_data.find(hotel => hotel.id === accommodationId);

        if (user.saved.includes(accommodationId)){
            user.saved = user.saved.filter(item => item !== accommodationId);
            console.log("Unsaved Hotel");
            fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(user_data, null, 2));
            return res.status(200).json({
                "unsaved": hotel.name
            });
        }
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

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        } else {

            let savedHotels = [];

            for(let i = 0; i < user.saved.length; i++){
                let hotel = hotel_data.find(hotel => hotel.id === user.saved[i]);
                savedHotels.push(hotel.name);
            }

            console.log("Saved: ", savedHotels);
            return res.status(200).json({
                saved: savedHotels
            });
        }

    }
    
    catch (error) {
        console.log("Error in Save controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    } 
}