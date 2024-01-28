import express from 'express'
import UpdateAiModelController from '../apis/ai_model/controllers/update.ai.model.controller'
import Auth from '../middlewares/Auth'

export default (app: express.Application) => {
    UpdateAiModelController.put(app, '/api/v1/ai-model', [Auth])
}
