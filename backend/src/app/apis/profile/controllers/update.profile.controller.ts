import MasterController from '../../../utils/MasterController'
import { IUpdateProfile } from '../interfaces'
import Joi from 'joi'
import RequestBuilder from '../../../utils/RequestBuilder'
import profileService from '../services/profile.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class UpdateProfileController extends MasterController<null, null, IUpdateProfile> {
    static doc() {
        return {
            tags: ['Profile'],
            description: 'Update profile',
            summary: '',
        }
    }

    public static validate() {
        const payload = new RequestBuilder()

        payload.addToBody(
            Joi.object().keys({
                firstName: Joi.string().min(3).max(20).required(),
                lastName: Joi.string().min(3).max(20).required(),
                email: Joi.string().email().required(),
                profilePic: Joi.string().required().allow(null, ''),
            })
        )

        return payload
    }

    async restController(
        params: null,
        query: null,
        body: IUpdateProfile,
        headers: any,
        allData: any
    ): Promise<any> {
        const {
            user: { _id },
            firstName,
            lastName,
            email,
            profilePic,
        } = allData

        const response = await profileService.updateProfile({
            userId: _id,
            firstName,
            lastName,
            email,
            profilePic,
        })

        return new ResponseBuilder(StatusCodes.CREATED, response, SuccessMessages.REGISTER_SUCCESS)
    }
}
