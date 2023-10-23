import express from 'express'
import { updateFollower } from '../controller/followerController.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = express.Router()

router.get('/updatefollower/:nickname', checkToken, updateFollower)
