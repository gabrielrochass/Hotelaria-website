import fs from 'fs';
import path from 'path';

export const search = async(req, res) => {
    try { 
        const { checkIn, checkOut, guests, location, maxPrice, petFriendly, accessible, minRating, rooms } = req.body;

        if (!checkIn || !checkOut || !guests || !location) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/hotels.json'), 'utf8'));
        let foundHotels = [];

        const filteredData = data.filter(element => element.location === location && element.availableRooms > 0);

        if (filteredData.length === 0) {
            console.log("No hotels found")
            return res.status(404).json({
                error: "No hotels found"
            });
        }

        else {
            for (let i = 0; i < filteredData.length; i++) {
                for(let j = 0; j < filteredData[i].rooms.length; j++){
                    if (filteredData[i].rooms[j].beds === parseInt(guests)) {
                        if (filteredData[i].rooms[j].freeDates.includes(checkIn) && filteredData[i].rooms[j].freeDates.includes(checkOut)) {
                            console.log("Found: ", filteredData[i].name)
                            foundHotels.push(filteredData[i]);
                        }
                    }
                }
            }
            if (foundHotels.length === 0) {
                console.log("No hotels found")
                return res.status(404).json({
                    error: "No hotels found"
                });
            }
        }

        // Filtre por preço máximo, se fornecido
        if (maxPrice !== undefined) {
            foundHotels = foundHotels.filter(hotel => hotel.rooms.some(room => room.price <= maxPrice && room.beds === parseInt(guests)));
        }

        // Filtre por petFriendly, se fornecido
        if (petFriendly !== undefined) {
            foundHotels = foundHotels.filter(hotel => hotel.petFriendly === petFriendly);
        }

        // Filtre por accessible, se fornecido
        if (accessible !== undefined) {
            foundHotels = foundHotels.filter(hotel => hotel.accessibility === accessible);
        }

        // Filtre por minRating, se fornecido
        if (minRating !== undefined) {
            foundHotels = foundHotels.filter(hotel => hotel.rating >= minRating);
        }

        // Filtre por rooms, se fornecido
        if (rooms !== undefined) {
            foundHotels = foundHotels.filter(hotel => hotel.availableRooms >= rooms);
        }

        if (foundHotels.length === 0) {
            console.log("No hotels found")
            return res.status(404).json({
                error: "No hotels found"
            });
        } else {
            console.log("Found: ", foundHotels.map(hotel => hotel.name));
            
            const response = foundHotels.flatMap(hotel =>
                hotel.rooms
                    .filter(room => room.beds === parseInt(guests) && room.freeDates.includes(checkIn) && room.freeDates.includes(checkOut))
                    .map(room => ({
                        name: hotel.name,
                        price: room.price
                    }))
            );

            return res.status(200).json({ hotels: response });
        }



    }
    catch (error) {
        console.log("Error in Search controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    
    }
}

export const filterSearch = (req, res) => {

}
