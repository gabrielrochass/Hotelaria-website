import express from 'express';
import { createReservation, getReservation, listAccommodationReservations } from '../controllers/reservationController.js';
import { cancelReservation } from '../controllers/reservationController.js';

const router = express.Router();

//@TODO double-check router routes
router.get('host/accommodations/reservations', listAccommodationReservations);
router.delete('host/accommodations/reservations/:userId/:reservationId', cancelReservation);
router.post('/guest/minhas_reservas/:acomId', createReservation);
router.get('/guest/minhas_reservas/:reservationId', getReservation);

export default router;
