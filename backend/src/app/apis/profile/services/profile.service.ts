import userRepository from '../../../repositories/user.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import { IUpdateProfile } from '../interfaces'

class ProfileService {
    async getProfile(userId: string) {
        const user = userRepository.find({ _id: userId })

        if (!user) {
            throw new ValidationError(ErrorMessages.USER_NOT_FOUND)
        }

        return user
    }

    async updateProfile(data: IUpdateProfile) {
        const { userId, firstName, lastName, email, profilePic } = data

        const user = await userRepository.find({ _id: userId })

        if (!user) {
            throw new ValidationError(ErrorMessages.USER_NOT_FOUND)
        }

        return userRepository.update(
            { _id: userId },
            {
                firstName,
                lastName,
                email,
                profilePic,
            }
        )
    }
}

export default new ProfileService()
