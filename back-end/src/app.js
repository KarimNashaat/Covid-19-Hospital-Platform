require('./db/mongoose')
const connections = require('./connections/connections')
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')


const userRouter = require('./routers/user')
const hospitalRouter = require('./routers/hospital')

app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(hospitalRouter)

const server = http.createServer(app)
const io = socketio(server)

connections(io)
app.server = server

module.exports = app