import express from 'express'
import WizTextToImageController from '../apis/generators/controllers/wiz.text.to.image.controller'
import WizImageToImageController from '../apis/generators/controllers/wiz.image.to.image.controller'
import Auth from '../middlewares/Auth'
import FileUpload from '../middlewares/FileUpload'

export default (app: express.Application) => {
    WizTextToImageController.post(app, '/api/v1/generate/wiz/text-to-image', [Auth])
    WizImageToImageController.post(app, '/api/v1/generate/wiz/image-to-image', [Auth, FileUpload])
}
