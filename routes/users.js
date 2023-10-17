import express from 'express'
import { createProfile, register } from '../controller/register.js'
import { checkToken } from '../middleware/authMiddleware.js'
import { encrypt } from '../middleware/encrypt.js'
import { login } from '../controller/login.js'

export const router = new express.Router()

router.post('/register', encrypt, register)

router.put('/createprofile', checkToken, createProfile)

router.post('/login', encrypt, login)
