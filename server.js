import http from 'http'
import dotenv from 'dotenv'
import path from "path"

import app from './src/app.js'

dotenv.config({
    path: path.resolve('./src/config/.env')
})

const PORT = process.env.PORT || 3001

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})