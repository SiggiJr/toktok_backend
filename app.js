import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import cors from 'cors'
import cloudinary from 'cloudinary'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/api/register')
app.post('/api/login')

app.post('api/upload')
app.post('/api/feed')

app.post('api/search')

app.post('api/profile')
app.post('api/me')

app.put('api/privacy')

app.listen(PORT)
