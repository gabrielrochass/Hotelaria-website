import fs from 'fs';
import path from 'path';

export const GetHotels =  async (req, res) => { 
    try {
        var hotel_data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
        return res.status(200).json({
            hotels: hotel_data
        });
    }
    catch (error) {
        console.log("Error in Like controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    }
}