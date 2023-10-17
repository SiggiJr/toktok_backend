import express from 'express'
import { createProfile, register } from '../controller/register.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = new express.Router()

router.post('/register', register)

router.put('/createprofile', checkToken, createProfile)
