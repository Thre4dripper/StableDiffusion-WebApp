import MasterController from '../../../utils/MasterController'
import { StatusCodes } from '../../../enums/StatusCodes'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import RequestBuilder from '../../../utils/RequestBuilder'
import Joi from 'joi'
import userService from '../services/user.service'
import { IRegisterUser } from '../interfaces'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class RegisterUserController extends MasterController<null, null, IRegisterUser> {
    static doc() {
        return {
            tags: ['User'],
            summary: 'Register User',
            description: 'Register User',
        }
    }

    public static validate(): RequestBuilder {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object().keys({
                firstName: Joi.string().min(3).max(20).required(),
                lastName: Joi.string().min(3).max(20).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(20).required(),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: IRegisterUser,
        headers: any,
        allData: any
    ): Promise<any> {
        const { firstName, lastName, email, password } = body

        const response = await userService.registerUser({ firstName, lastName, email, password })

        return new ResponseBuilder(StatusCodes.CREATED, response, SuccessMessages.REGISTER_SUCCESS)
    }
}
