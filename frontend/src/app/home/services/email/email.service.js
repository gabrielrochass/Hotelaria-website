import api from "../api.js";

export default async function sendEmail(reservationId) {
    try {
        const data = {
            reservationId: reservationId
        }

        const response = await api.get('/email', data);
    } catch (error) {
        console.error(error);
        return [];
    }
}