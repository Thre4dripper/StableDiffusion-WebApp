import express from 'express'
import UploadImageController from '../apis/images/controllers/upload.image.controller'
import Auth from '../middlewares/Auth'

export default (app: express.Application) => {
    UploadImageController.post(app, '/api/v1/images/upload', [Auth])
}
