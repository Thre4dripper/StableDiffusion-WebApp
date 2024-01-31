import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import imageService from '../services/image.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class DeleteImageController extends MasterController<
    { imageId: string },
    null,
    null
> {
    static doc() {
        return {
            tags: ['Images'],
            description: 'Delete image',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object().keys({
                imageId: Joi.string().required(),
            })
        )

        return payload
    }

    async restController(
        params: {
            imageId: string
        },
        query: null,
        body: null,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id: userId },
            imageId,
        } = allData

        const response = await imageService.deleteImage({ userId, imageId })

        return new ResponseBuilder(StatusCodes.SUCCESS, response, SuccessMessages.IMAGE_DELETED)
    }
}
