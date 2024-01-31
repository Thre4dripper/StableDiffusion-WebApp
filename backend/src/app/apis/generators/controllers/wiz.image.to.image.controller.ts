import MasterController from '../../../utils/MasterController'
import Joi from 'joi'
import RequestBuilder from '../../../utils/RequestBuilder'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { IWizImageToImage } from '../../../apis/generators/interfaces'
import wizService from '../services/wiz.service'

export default class WizImageToImageController extends MasterController<
    null,
    null,
    IWizImageToImage
> {
    public static doc() {
        return {
            tags: ['Generators'],
            description: 'WizImageToImage API',
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
        body: IWizImageToImage,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
            file: inputImage,
        } = allData

        const { positivePrompt, negativePrompt, width, height, samplingSteps, cfgScale, upScale } =
            body

        const response = await wizService.imageToImage(_id, {
            inputImage,
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
            SuccessMessages.WIZ_IMAGE_TO_IMAGE_SUCCESS
        )
    }
}
