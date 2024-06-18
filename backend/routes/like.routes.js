import express from "express"
import { like, removeLike, getLikes } from '../controllers/likeController.js'

const router = express.Router()

router.post('/like', like)
router.delete('/removelike', removeLike)
router.get('/getlikes', getLikes)

export default router