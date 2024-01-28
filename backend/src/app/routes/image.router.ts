import express from 'express'
import Auth from '../middlewares/Auth'
import GetImagesController from '../apis/images/controllers/get.images.controller'
import DeleteImageController from '../apis/images/controllers/delete.image.controller'

export default (app: express.Application) => {
    GetImagesController.get(app, '/api/v1/images', [Auth])
    DeleteImageController.delete(app, '/api/v1/images', [Auth])
}
