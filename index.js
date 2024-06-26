//Loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

//creates an express application
const pfServer = express()

//Use cors in express server
pfServer.use(cors())
//parsing json; if request type is json parse it into js
pfServer.use(express.json())
//using router
pfServer.use(router)

//giving permision for front-end to access the server ; want to make that file as static
pfServer.use('/uploads',express.static('./uploads'))


//port
const PORT = 3000 || process.env.PORT

//run the server to listen client request
pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at PORT: ${PORT}`);
})

//resolving GET request
//http://localhost:3000/
pfServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red"> Project Fair Server started and waiting for client request!!! </h1>`)
})


