import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './feature/auth/router/auth.router'
import { newsRouter } from './feature/news/router/news.router'
import { testRouter } from './feature/testing/router/testing.router'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', true) // for get correct ip address

app.use('/api/auth', authRouter)
app.use('api/news', newsRouter)
app.use('api/testing/delete-all-data', testRouter)
