import { ILoginUser, IRegisterUser } from '../interfaces'
import userRepository from '../../../repositories/user.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import EncryptionUtil from '../../../utils/EncryptionUtil'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class UserService {
    async registerUser(data: IRegisterUser) {
        const user = await userRepository.find({ email: data.email })

        if (user) {
            throw new ValidationError(ErrorMessages.USER_ALREADY_EXISTS)
        }

        data.password = await EncryptionUtil.hashPassword(data.password)

        const result = await userRepository.create(data)
        return {
            ...result.toJSON(),
            tokens: EncryptionUtil.generateJwtTokens(result.toJSON()),
        }
    }

    async loginUser(data: ILoginUser) {
        const user = await userRepository.find({ email: data.email })

        if (!user) {
            throw new ValidationError(ErrorMessages.USER_NOT_FOUND)
        }

        const isPasswordValid = await EncryptionUtil.comparePassword(
            data.password,
            user.password ?? ''
        )

        if (!isPasswordValid) {
            throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS)
        }

        return {
            ...user.toJSON(),
            tokens: EncryptionUtil.generateJwtTokens(user.toJSON()),
        }
    }
}

export default new UserService()