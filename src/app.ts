import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './feature/auth/api/router/auth.router'
import { newsRouter } from './feature/news/api/router/news.router'
import { testRouter } from './feature/testing/api/router/testing.router'
import fileUpload from 'express-fileupload'
import cors from 'cors'

export const app = express()

app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('public'))

app.use('/api/auth', authRouter)
app.use('/api/news', newsRouter)
app.use('/api/testing/delete-all-data', testRouter)
