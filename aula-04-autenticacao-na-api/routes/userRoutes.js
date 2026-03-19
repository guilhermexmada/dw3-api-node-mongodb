import express from 'express'
import userController from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/user', userController.createUser)

// endpoint para logar
userRoutes.post('/auth', userController.loginUser)

export default userRoutes