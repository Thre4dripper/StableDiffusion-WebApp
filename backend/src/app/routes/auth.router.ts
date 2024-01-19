import express from 'express'
import RegisterUserController from '../apis/auth/controllers/register.user.controller'
import LoginUserController from '../apis/auth/controllers/login.user.controller'

export default (app: express.Application) => {
    RegisterUserController.post(app, '/api/v1/auth/register/', [])
    LoginUserController.post(app, '/api/v1/auth/login/', [])
}
