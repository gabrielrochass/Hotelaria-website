import express from "express"
import { save, unsave, getSaves } from '../controllers/saveController.js'

const router = express.Router()

router.post('/save', save)
router.delete('/unsave', unsave)
router.get('/getsaves', getSaves)

export default router