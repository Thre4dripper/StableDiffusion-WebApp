import userRepository from '../../../repositories/user.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class ProfileService {
    async getProfile(userId: string) {
        const user = userRepository.find({ _id: userId })

        if (!user) {
            throw new ValidationError(ErrorMessages.USER_NOT_FOUND)
        }

        return user
    }
}

export default new ProfileService()
