import express from 'express';
import { add, remove, visualize } from '../controllers/paymentController.js';


const router = express.Router();

router.get('/visualize', visualize);
router.post('/add', add);
router.delete('/remove', remove);
//router.put('/select', select);

export default router;