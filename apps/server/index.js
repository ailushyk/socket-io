import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { ping } from './src/ping.js'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
  cookie: true,
})

const onConnection = (socket) => {
  ping(io, socket)
}

io.on('connect', onConnection)

httpServer.listen(3010)
