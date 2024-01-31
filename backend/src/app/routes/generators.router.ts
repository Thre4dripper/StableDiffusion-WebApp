import express from 'express'
import WizTextToImageController from '../apis/generators/controllers/wiz.text.to.image.controller'
import WizImageToImageController from '../apis/generators/controllers/wiz.image.to.image.controller'
import Auth from '../middlewares/Auth'
import FileUpload from '../middlewares/FileUpload'
import StabilityTextToImageController from '../apis/generators/controllers/stability.text.to.image.controller'
import StabilityImageToImageController from '../apis/generators/controllers/stability.image.to.image.controller'

export default (app: express.Application) => {
    WizTextToImageController.post(app, '/api/v1/generate/wiz/text-to-image', [Auth])
    WizImageToImageController.post(app, '/api/v1/generate/wiz/image-to-image', [Auth, FileUpload])
    StabilityTextToImageController.post(app, '/api/v1/generate/stability/text-to-image', [Auth])
    StabilityImageToImageController.post(app, '/api/v1/generate/stability/image-to-image', [
        Auth,
        FileUpload,
    ])
}
