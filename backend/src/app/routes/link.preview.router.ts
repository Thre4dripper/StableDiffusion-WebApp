import express from 'express'
import LinkPreviewController from '../apis/link_preview/controllers/link.preview.controller'

export default (app: express.Application) => {
    LinkPreviewController.post(app, '/api/v1/link-preview', [])
}
