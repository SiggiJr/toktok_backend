import express from 'express'
import { newPost, upload } from '../controller/postController.js'

export const router = new express.Router()

router.post('/upload', upload)

router.put('/upload', newPost)
