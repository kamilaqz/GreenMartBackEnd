'use strict'
const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.route('/user/create')
.post((req, res) => 
userController.createUser(req, res))

userRouter.route('/users')
.get((req, res) => userController.getUsers(req, res))
.put((req, res) => userController.updateUser(req, res))

userRouter.route('/user/:id')
.get((req, res) => userController.getUserById(req, res))
.delete((req, res) => userController.deleteUserById(req, res))

userRouter.route('/user/login')
.post((req, res)=> userController.loginUser(req, res))

module.exports = userRouter