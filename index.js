//loads .env file into process.env
require('dotenv').config() //config ->Loads .env file contents into process.env by default. 

//import express
const express = require('express');

//import cors
const cors = require('cors')

//import router
const router = require('./Router/route')

const db = require('./DB/connection')

const appMiddleware = require('./Middlewares/appMiddleware')

const jwtMiddleware = require('./Middlewares/jwtMiddleware')
//create a backend application using express
const pfServer = express()

//use
pfServer.use(cors())
pfServer.use(express.json()) //returns middleware that only parses jspn

// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads', express.static('./uploads')) //to export image from server to client

//port creation
const PORT = 4000 || process.env.PORT

//server listen
pfServer.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})

//http - get resolving to http://localhost:4000

pfServer.get("/", (req, res) => {
    res.send(`<h1>Project Fair is started...</h1>`)
})