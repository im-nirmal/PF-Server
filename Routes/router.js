//defining  different paths using express
const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiidleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//setting up path using Router
const router = new express.Router()

//resoving register request from font-end
router.post('/register',userController.register)

//login route
router.post('/login',userController.login)

//addproject route ; jwtMiddleware is the router specific middleware ; after apllying jwtMiddleware then use multerConfig
router.post('/add-project',jwtMiidleware,multerConfig.single('projectImage'),projectController.addProject)


//getallProjects request
router.get('/all-projects',jwtMiidleware,projectController.getAllProjects)

//getUserProjects
router.get('/user-projects',jwtMiidleware,projectController.getUserProjects)

//getHomeProjects
router.get('/home-projects',projectController.getHomeProjects)

//edit project ;  ' : ' indicate it is a path parameter
router.put('/edit-project/:pid',jwtMiidleware,multerConfig.single('projectImage'),projectController.editProjects)

//remove project
router.delete('/remove-project/:pid',jwtMiidleware,projectController.removeProject)

//edit user
router.put('/edit-user',jwtMiidleware,multerConfig.single("profileImage"),userController.editUser)

//export router
module.exports = router