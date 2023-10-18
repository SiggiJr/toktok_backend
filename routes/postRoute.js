import express from 'express'
import { upload } from '../controller/postController.js'

export const router = new express.Router()

router.post('/upload', upload)
