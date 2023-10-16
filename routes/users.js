import express from 'express'
import { register } from '../controller/register.js'

export const router = new express.Router()

router.post('/register', register)
