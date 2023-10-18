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

// app.post('/api/login')

// app.post('api/upload')
// app.post('/api/feed')

// app.post('api/search')

// app.post('api/profile')
// app.post('api/me')

// app.put('api/privacy')

app.listen(PORT, () => console.log(PORT))
