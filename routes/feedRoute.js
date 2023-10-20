import express from 'express'
import { getUserFeed } from '../controller/feedController.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = new express.Router()

// router.get('/feed', checkToken, getUserFeed)
router.get('/getfeed', checkToken, getUserFeed)
