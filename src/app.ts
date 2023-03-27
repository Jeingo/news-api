import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './feature/auth/api/router/auth.router'
import { newsRouter } from './feature/news/api/router/news.router'
import { testRouter } from './feature/testing/api/router/testing.router'
import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import http from 'http'
import socketio from 'socket.io'

const app = express()
export const server = http.createServer(app)
export const io = new socketio.Server(server, { cors: { origin: '*' } })

app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('public-files'))
app.use(express.static('public-websocket'))

// For real-time notification
app.get('/', function (req: Request, res: Response) {
    res.sendFile('index.html')
})

app.use('/api/auth', authRouter)
app.use('/api/news', newsRouter)
app.use('/api/testing/delete-all-data', testRouter)
