import express from 'express'
import { getImageUrl, getOnePost, handleLike, newPost, upload } from '../controller/postController.js'
import { addComment, handleCommentLike } from '../controller/commentsController.js'
import { checkToken } from '../middleware/authMiddleware.js'

export const router = new express.Router()

router.post('/upload', upload)

router.put('/upload', newPost)

router.get('/imageurl/:imageId', getImageUrl)

router.post('/likes', handleLike)

router.get('/postdetail/:id', getOnePost)

router.post('/comments/addcomment/:postid', checkToken, addComment)

router.post('/comments/like', handleCommentLike)
