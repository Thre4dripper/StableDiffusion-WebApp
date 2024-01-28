import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import { IWizTextToImage } from '../interfaces'
import wizService from '../services/wiz.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class WizTextToImageController extends MasterController<
    null,
    null,
    IWizTextToImage
> {
    static doc() {
        return {
            tags: ['Wiz Model'],
            description: 'WizTextToImage',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object({
                positivePrompt: Joi.string().required(),
                negativePrompt: Joi.string().required().allow(''),
                width: Joi.number().valid(32, 64, 128, 256, 512, 1024).required(),
                height: Joi.number().valid(32, 64, 128, 256, 512, 1024).required(),
                samplingSteps: Joi.number().min(1).max(150).required(),
                cfgScale: Joi.number().min(1).max(35).required(),
                upScale: Joi.number().min(1).max(4).required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: IWizTextToImage,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
        } = allData

        const { positivePrompt, negativePrompt, width, height, samplingSteps, cfgScale, upScale } =
            body

        const response = await wizService.textToImage(_id, {
            positivePrompt,
            negativePrompt,
            width,
            height,
            samplingSteps,
            cfgScale,
            upScale,
        })

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.WIZ_TEXT_TO_IMAGE_SUCCESS
        )
    }
}
