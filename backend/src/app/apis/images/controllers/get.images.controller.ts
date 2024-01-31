import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import imageService from '../services/image.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { StatusCodes } from '../../../enums/StatusCodes'
import { IGetImages } from '../interfaces'

export default class GetImagesController extends MasterController<null, IGetImages, null> {
    static doc() {
        return {
            tags: ['Images'],
            description: 'Get images',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToQuery(
            Joi.object().keys({
                limit: Joi.number().required(),
                offset: Joi.number().required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: IGetImages,
        body: null,
        headers: any,
        allData: any
    ): Promise<any> {
        const { user, limit, offset } = allData

        const response = await imageService.getImages({
            userId: user._id,
            limit,
            offset,
        })

        return new ResponseBuilder(StatusCodes.SUCCESS, response, SuccessMessages.IMAGES_FETCHED)
    }
}
