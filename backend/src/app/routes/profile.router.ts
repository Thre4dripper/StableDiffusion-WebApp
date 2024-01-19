import express from 'express'
import GetProfileController from '../apis/profile/controllers/get.profile.controller'
import Auth from '../middlewares/Auth'

export default (app: express.Application) => {
    GetProfileController.get(app, '/api/v1/profile/', [Auth])
}
