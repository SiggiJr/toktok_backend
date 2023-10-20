import express from 'express'
import { searchUser } from '../controller/searchUser.js'

export const router = new express.Router()

router.post('/user', searchUser)
