import express from 'express';
import { createRating, listRating } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/guest/reservations/avaliacao/:acomId', createRating);
router.get('/guest/reservations/avaliacao/:acomId', listRating);

export default router