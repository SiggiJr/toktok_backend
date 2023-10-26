import express from 'express'
import { createProfile, register } from '../controller/register.js'
import { checkToken } from '../middleware/authMiddleware.js'
import { encrypt } from '../middleware/encrypt.js'
import { login, logout } from '../controller/login.js'
import { getProfileData, getUserData } from '../controller/userController.js'
import { updateProfile } from '../controller/updateController.js'

export const router = new express.Router()

router.post('/register', encrypt, register)

router.put('/createprofile', checkToken, createProfile)

router.put('/updateuser', checkToken, updateProfile)

router.post('/login', encrypt, login)

router.get('/userdata', checkToken, getUserData)

router.get('/logout', logout)

router.get('/:id', getProfileData)
