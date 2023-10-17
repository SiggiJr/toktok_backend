import express from 'express'
import { createProfile, register } from '../controller/register.js'

export const router = new express.Router()

router.post('/register', register)

router.put('/createprofile', createProfile)
