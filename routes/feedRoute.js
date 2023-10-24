import express from 'express'
import { getOtherFeed, getOwnFeed, getUserFeed } from '../controller/feedController.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = new express.Router()

router.get('/getfeed', checkToken, getUserFeed)
router.get('/ownfeed', checkToken, getOwnFeed)
router.get('/otherfeed/:id', getOtherFeed)
