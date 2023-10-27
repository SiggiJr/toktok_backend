import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import cloudinary from 'cloudinary'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyparser from 'body-parser'

import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
import { router as postRouter } from './routes/postRoute.js'
import { router as feedRouter } from './routes/feedRoute.js'
import { router as searchRouter } from './routes/searchRouter.js'
import { router as followerRouter } from './routes/followerRouter.js'
import { register } from './controller/register.js'
import { checkToken } from './middleware/authMiddleware.js'
import { verifyToken } from './utils/token.js'

const { PORT } = process.env
const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const bodyParser = app.use(
  cors({
    credentials: true,
    origin: true,
  }),
)
// app.use(bodyParser())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/post', upload.single('selected_image'), postRouter)
app.use('/api/auth', upload.none(), authRouter)
app.use('/api/user', upload.single('profile_image'), usersRouter)
app.use('/api/feed', feedRouter)
app.use('/api/search', upload.none(), searchRouter)
app.use('/api/follower', followerRouter)
app.listen(PORT, () => console.log(PORT))
