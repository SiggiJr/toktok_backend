import express from 'express'
import { handleLike, newPost, upload } from '../controller/postController.js'

export const router = new express.Router()

router.post('/upload', upload)

router.put('/upload', newPost)

router.post('/likes', handleLike)
