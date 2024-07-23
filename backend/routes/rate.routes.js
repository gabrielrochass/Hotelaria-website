import express from 'express';
import { createRating, listRating } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/guest/minhas_reservas/avaliacao/:resId', createRating);
router.get('/guest/minhas_reservas/avaliacao/:acomId', listRating);

export default router