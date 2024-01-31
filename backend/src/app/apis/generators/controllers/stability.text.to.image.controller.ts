import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { IStabilityTextToImage } from '../interfaces'
import stabilityService from '../services/stability.service'

export default class StabilityTextToImageController extends MasterController<
    null,
    null,
    IStabilityTextToImage
> {
    public static doc() {
        return {
            tags: ['Generators'],
            description: 'Generate stability text to image',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object({
                positivePrompt: Joi.string().required(),
                negativePrompt: Joi.string().required().allow(''),
                width: Joi.number().valid(320, 448, 640, 896, 1280, 1536).required(),
                height: Joi.number().valid(320, 448, 640, 896, 1280, 1536).required(),
                samplingSteps: Joi.number().min(1).max(50).required(),
                cfgScale: Joi.number().min(1).max(35).required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: IStabilityTextToImage,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
        } = allData

        const { positivePrompt, negativePrompt, width, height, samplingSteps, cfgScale } = body

        const response = await stabilityService.textToImage(_id, {
            positivePrompt,
            negativePrompt,
            width,
            height,
            samplingSteps,
            cfgScale,
        })

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.STABILITY_TEXT_TO_IMAGE_SUCCESS
        )
    }
}
