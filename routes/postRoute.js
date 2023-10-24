import express from 'express'
import { getImageUrl, handleLike, newPost, upload } from '../controller/postController.js'

export const router = new express.Router()

router.post('/upload', upload)

router.put('/upload', newPost)

router.get('/imageurl/:imageId', getImageUrl)

router.post('/likes', handleLike)

router.get('postdetail/:id', getOnePost)
