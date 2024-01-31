import MasterController from '../../../utils/MasterController'
import { IStabilityImageToImage } from '../interfaces'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import stabilityService from '../services/stability.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class StabilityImageToImageController extends MasterController<
    null,
    null,
    IStabilityImageToImage
> {
    public static doc() {
        return {
            tags: ['Generators'],
            description: 'Generate stability image to image',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object({
                positivePrompt: Joi.string().required(),
                negativePrompt: Joi.string().required().allow(''),
                samplingSteps: Joi.number().min(1).max(50).required(),
                cfgScale: Joi.number().min(1).max(35).required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: IStabilityImageToImage,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
            file: inputImage,
        } = allData

        const { positivePrompt, negativePrompt, samplingSteps, cfgScale } = body

        const response = await stabilityService.imageToImage(_id, {
            inputImage,
            positivePrompt,
            negativePrompt,
            samplingSteps,
            cfgScale,
        })

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.STABILITY_IMAGE_TO_IMAGE_SUCCESS
        )
    }
}
