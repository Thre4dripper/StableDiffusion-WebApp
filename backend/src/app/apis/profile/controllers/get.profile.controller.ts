import MasterController from '../../../utils/MasterController'
import profileService from '../services/profile.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'

export default class GetProfileController extends MasterController<null, null, null> {
    static doc() {
        return {
            tags: ['Profile'],
            summary: 'Get Profile',
            description: 'Get Profile',
        }
    }

    async restController(
        params: null,
        query: null,
        body: null,
        headers: any,
        allData: any
    ): Promise<any> {
        const { user } = allData

        const response = await profileService.getProfile(user._id)

        return new ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_PROFILE_SUCCESS
        )
    }
}
