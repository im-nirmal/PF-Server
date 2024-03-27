//defining  different paths using express
const express = require('express')
const userController = require('../Controllers/userController')

//setting up path using Router
const router = new express.Router()

//resoving register request from font-end
router.post('/register',userController.register)


//export router
module.exports = router