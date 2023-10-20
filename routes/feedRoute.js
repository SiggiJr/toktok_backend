import express from 'express'
import { getUserFeed } from '../controller/feedController.js'

export const router = new express.Router()

// router.get('/feed', checkToken, getUserFeed)
router.get('/getfeed', getUserFeed)
