import { NextFunction } from 'express'
import ResponseBuilder from '../utils/ResponseBuilder'
import { StatusCodes } from '../enums/StatusCodes'
import { ErrorMessages } from '../enums/ErrorMessages'
import EncryptionUtil from '../utils/EncryptionUtil'

const Auth = async (req: any, res: any, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res
                .status(StatusCodes.UNAUTHORISED)
                .json(
                    new ResponseBuilder(StatusCodes.UNAUTHORISED, null, ErrorMessages.UNAUTHORISED)
                )
        }

        const decoded = EncryptionUtil.verifyToken(token) as any

        if (!decoded || !decoded._id) {
            return res
                .status(StatusCodes.UNAUTHORISED)
                .json(
                    new ResponseBuilder(StatusCodes.UNAUTHORISED, null, ErrorMessages.UNAUTHORISED)
                )
        }

        req['user'] = decoded

        next()
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORISED)
            .json(new ResponseBuilder(StatusCodes.UNAUTHORISED, null, ErrorMessages.UNAUTHORISED))
    }
}

export default Auth
