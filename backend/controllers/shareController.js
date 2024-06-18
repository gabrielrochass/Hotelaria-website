import fs from 'fs';
import path from 'path';

export const generateLink =  async (req, res) => {
    const { accommodationId } = req.body;
    var hotel_data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
    var hotel = hotel_data.find(hotel => hotel.id === accommodationId);

    if (!hotel) {
        console.log("Hotel not found")
        return res.status(404).json({
            error: "Hotel not found"
        });
    } else {
        console.log("Link generated")
        return res.status(200).json({
            link: `localhost:3000/accommodation/${hotel.id}`
        });
    }
}