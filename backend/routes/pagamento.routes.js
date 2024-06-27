import express from 'express';
import { add } from '../controllers/pagamentoController.js';


const router = express.Router();

//router.get('/visualize', visualize);
router.post('/add', add);
//router.delete('/remove', remove);
//router.put('/select', select);

export default router;