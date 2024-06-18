import express from "express"
import { generateLink } from '../controllers/shareController.js'

const router = express.Router()

router.get('/link', generateLink)

export default router