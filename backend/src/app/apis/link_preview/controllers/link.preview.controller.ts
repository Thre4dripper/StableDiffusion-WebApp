import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import linkPreviewService from '../services/link.preview.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'

export default class LinkPreviewController extends MasterController<
    null,
    null,
    { urls: string[] }
> {
    static doc() {
        return {
            description: 'This is link preview controller',
            tags: ['Link Preview'],
            summary: 'This is link preview controller',
        }
    }

    public validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object().keys({
                urls: Joi.array().items(Joi.string().uri()).required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: { urls: string[] },
        headers: any,
        allData: any
    ): Promise<any> {
        const { urls } = body

        let response = await linkPreviewService.getLinksPreview(urls)

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            'Link preview fetched successfully'
        )
    }
}
