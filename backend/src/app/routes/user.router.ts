import RegisterUserController from '../apis/user/controllers/register.user.controller'
import express from 'express'
import LoginUserController from '../apis/user/controllers/login.user.controller'

export default (app: express.Application) => {
    RegisterUserController.get(app, '/api/v1/user/register/', [])
    LoginUserController.get(app, '/api/v1/user/login/', [])
}