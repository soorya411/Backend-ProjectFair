
//import express
const express = require('express')

//import multer

const multerConfig = require('../Middlewares/multerMiddleware')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//import userController
const userController = require('../Controllers/userController')

const projectController = require('../Controllers/projectController')
//create a router object of express to define routes(paths)
const router = new express.Router()

//using router object to define paths

//1 Register API routes
router.post('/register', userController.register)

//2 Login API routes
router.post('/login', userController.login)

//3 add user project api routes 
router.post('/project/add', jwtMiddleware, multerConfig.single('projectimage'),
    projectController.addUserProject) //http://localhost:4000/project/add

// 4 get user projects api routes
router.get('/project/all-user-projects', jwtMiddleware, projectController.getUserProject)  //http://localhost:4000/project/add

// 5 get all projects api routes
router.get('/project/all-projects', jwtMiddleware, projectController.getAllProjects)

// 6 get home page projects api routes
router.get('/project/home-projects', projectController.getHomeProject)

//update project routes
router.put('/project/update-project/:id', jwtMiddleware, multerConfig.single('projectimage'), projectController.editProject)

//delete project routes

router.delete('/project/delete-project/:pid', jwtMiddleware, projectController.deleteProject) //http://localhost:4000/project/delete-project/:id


module.exports = router