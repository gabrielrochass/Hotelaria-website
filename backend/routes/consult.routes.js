import express from "express"
import { GetHotels } from '../controllers/consultController.js'

const router = express.Router()

router.get('/getHotels', GetHotels)

export default router