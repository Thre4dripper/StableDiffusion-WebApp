import MasterController from '../../../utils/MasterController'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import { AiModel } from '../../../enums/AiModel'
import aiModelService from '../services/ai.model.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class UpdateAiModelController extends MasterController<
    null,
    null,
    { model: AiModel }
> {
    static doc() {
        return {
            tags: ['AiModel'],
            description: 'Update AiModel',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object({
                model: Joi.string()
                    .valid(...Object.values(AiModel))
                    .required(),
            })
        )

        return payload
    }

    async restController(
        _params: null,
        _query: null,
        _body: {
            model: AiModel
        },
        _headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
            model,
        } = allData

        const response = await aiModelService.updateAiModel(_id, model)

        return new ResponseBuilder(StatusCodes.SUCCESS, response, SuccessMessages.AI_MODEL_UPDATED)
    }
}
