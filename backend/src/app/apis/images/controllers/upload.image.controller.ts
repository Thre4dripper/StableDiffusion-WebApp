import MasterController from '../../../utils/MasterController'
import { ICreateImage } from '../interfaces'
import Joi from 'joi'
import RequestBuilder from '../../../utils/RequestBuilder'
import imageService from '../service/image.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class UploadImageController extends MasterController<null, null, ICreateImage> {
    static doc() {
        return {
            tags: ['Images'],
            description: 'Create a new image',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object().keys({
                image: Joi.string().required(),
                positivePrompt: Joi.string().required(),
                negativePrompt: Joi.string().required(),
                dimensions: Joi.object()
                    .keys({
                        width: Joi.number().required(),
                        height: Joi.number().required(),
                    })
                    .required(),
                samplingSteps: Joi.number().required(),
                cfgScale: Joi.number().required(),
                upscale: Joi.number().required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: ICreateImage,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
            image,
            positivePrompt,
            negativePrompt,
            dimensions,
            samplingSteps,
            cfgScale,
            upscale,
        } = allData

        const response = await imageService.createImage({
            userId: _id,
            image,
            positivePrompt,
            negativePrompt,
            dimensions,
            samplingSteps,
            cfgScale,
            upscale,
        })

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.CREATE_IMAGE_SUCCESS
        )
    }
}
