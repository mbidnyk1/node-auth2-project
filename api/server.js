const express = require('express')
const server = express()
const helmet = require('helmet')
const morgan =  require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const dbConfig = require('../db/db-config')
const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')

server.use(express.json(), helmet(), morgan('short'), cors(), cookieParser())
server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req,res) => {
    res.json( { api: 'Online!' })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'Error processing the request.' })
})

module.exports = server