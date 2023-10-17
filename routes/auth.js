import express from 'express'
import { checkToken } from '../middleware/authMiddleware.js'
import { check } from '../controller/authController.js'

export const router = new express.Router()

router.get('/auth/check', checkToken, check)
