import express from 'express'
import { getOwnFeed, getUserFeed } from '../controller/feedController.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = new express.Router()

router.get('/getfeed', checkToken, getUserFeed)
router.get('/ownfeed', checkToken, getOwnFeed)
