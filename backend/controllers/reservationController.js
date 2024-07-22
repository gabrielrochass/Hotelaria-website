import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// Função para listar reservas na acomodação
var userData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'))
var acomData = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'))
var reserveData = JSON.parse(fs.readFileSync(path.resolve('./samples/reservation.json'), 'utf8'))

export const listAccommodationReservations = async (req, res) => {
    try {
        const { userId, accommodationId } = req.query;

        if (!userId || !accommodationId) {
            console.log("User ID and Accommodation ID are required");
            return res.status(400).json({
                error: "User ID and Accommodation ID are required"
            });
        }

        var reservationsData = JSON.parse(fs.readFileSync(path.resolve('./samples/reservations.json'), 'utf8'));
        var accommodationsData = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'));

        const accommodation = accommodationsData.find(accommodation => accommodation.id === accommodationId && accommodation.userId === userId);
        if (!accommodation) {
            console.log("Accommodation not found or does not belong to the user");
            return res.status(404).json({
                error: "Accommodation not found or does not belong to the user"
            });
        }

        const accommodationReservations = reservationsData.filter(reservation => reservation.accommodationId === accommodationId);

        res.status(200).json({
            reservations: accommodationReservations.map(({ id, dataReserva }) => ({ id, dataReserva }))
        });

    } catch (error) {
        console.log("Error in listAccommodationReservations controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

// Função para cancelar uma reserva
export const cancelReservation = async (req, res) => {
    try {
        const { userId, reservationId } = req.params;

        if (!userId || !reservationId) {
            console.log("User ID and Reservation ID are required");
            return res.status(400).json({
                error: "User ID and Reservation ID are required"
            });
        }

        var reservationsData = JSON.parse(fs.readFileSync(path.resolve('./samples/reservations.json'), 'utf8'));

        const reservationIndex = reservationsData.findIndex(reservation => reservation.id === reservationId && reservation.userId === userId);
        if (reservationIndex === -1) {
            console.log("Reservation not found or does not belong to the user");
            return res.status(404).json({
                error: "Reservation not found or does not belong to the user"
            });
        }

        reservationsData.splice(reservationIndex, 1);

        fs.writeFileSync(path.resolve('./samples/reservations.json'), JSON.stringify(reservationsData, null, 2));

        res.status(200).json({
            message: "Reservation cancelled successfully"
        });

    } catch (error) {
        console.log("Error in cancelReservation controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const createReservation = async (req, res) => {
    try {
        const { acomId } = req.params
        // reservation.json variáveis puxadas da acommodation => accommodationName,numRooms,capacity, 
        const { userId, checkin, rates, numRooms, capacity } = req.body;
        if (!checkin || !userId || !rates || !numRooms || !capacity) {
            console.log("All fields are required");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Verificação de validade das notas será realizada no front a partir de categorização das respostas

        let acomIndex = acomData.findIndex(acom => String(acom.id) === String(acomId))
        let userIndex = userData.findIndex(user => String(user.id) === String(userId))
        let acomName = acomData[acomIndex].nome
        let totalPaid = acomData[acomIndex].precoPorNoite * rates


        const newReservation = {
            id: uuidv4(),
            acomName,
            numRooms,
            capacity,
            totalPaid,
            checkin,
            rates,
            acomId,
            userId,
        }

        //push em reservationsId [] em users.json
        userData[userIndex].reservationsId.push(newReservation.id)

        reserveData.push(newReservation)

        fs.writeFileSync(path.resolve('./samples/reservation.json'), JSON.stringify(reserveData, null, 2));
        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(userData, null, 2));

        console.log(userData[userIndex])
        res.status(201).json(newReservation)


    } catch (error) {
        console.log("Error in reservationController:", error.message);
        res.status(500).json({
            error: "Internal Server Error (Create Reservation)"
        });
    }
}
export const getReservation = async (req, res) => { //puxa as reservas da pessoa daquele id
    try {
        const { id } = req.body

        const lista_reservas = userData.find(user => (user.id) === (id))

        if (lista_reservas === undefined) {
            return res.status(400).json({
                error: "User doesn't exist"
            });
        }
        let output = []

        lista_reservas.reservationsId.forEach(acomm => { //
            output.push(
                reserveData.find(idAcom => String(idAcom.id) === String(acomm))
            )
        });



        return res.status(200).json(output);



    } catch (error) {

        console.log("Error in reservationController:", error.message);
        res.status(500).json({
            error: "Internal Server Error (Get Reservation)"
        });

    }
}

export const guestCancelReservation = async (req, res) => {
    try {
        const { reservaId } = req.query

        const index = reserveData.findIndex(elemento => String(elemento.id) === String(reservaId))

        if (index === -1) {
            return res.status(200).json({
                error: "Reserve doesn't exist"
            });
        } else {
            reserveData.splice(index, 1);
            fs.writeFileSync(path.resolve('./samples/reservation.json'), JSON.stringify(reserveData, null, 2));
        }

        return res.status(200).json(reserveData)


    } catch (error) {

        console.log("Error in guestCancelReservation:", error.message);
        res.status(500).json({
            error: "Internal Server Error (Cancel Reservation)"
        });

    }
}

// export const editReservation = async (req, res) => {
//     try {

//     }
//     catch (error) {

//     }
// }
