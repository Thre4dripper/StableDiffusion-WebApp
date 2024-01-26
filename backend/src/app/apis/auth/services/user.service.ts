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

        const userObject = {
            _id: result.toJSON()._id,
            firstName: result.toJSON().firstName,
            lastName: result.toJSON().lastName,
            email: result.toJSON().email,
        }

        return {
            ...result.toJSON(),
            tokens: EncryptionUtil.generateJwtTokens(userObject),
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

        const userObject = {
            _id: user.toJSON()._id,
            firstName: user.toJSON().firstName,
            lastName: user.toJSON().lastName,
            email: user.toJSON().email,
        }

        return {
            ...user.toJSON(),
            tokens: EncryptionUtil.generateJwtTokens(userObject),
        }
    }
}

export default new UserService()
