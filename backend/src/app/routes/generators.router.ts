import express from 'express'
import WizTextToImageController from '../apis/generators/controllers/wiz.text.to.image.controller'
import Auth from '../middlewares/Auth'

export default (app: express.Application) => {
    WizTextToImageController.post(app, '/api/v1/generators/wiz/text-to-image', [Auth])
}
