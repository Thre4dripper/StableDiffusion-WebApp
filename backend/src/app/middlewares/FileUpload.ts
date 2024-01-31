import { NextFunction } from 'express'
import multer, { MulterError } from 'multer'

import ResponseBuilder from '../utils/ResponseBuilder'
import { StatusCodes } from '../enums/StatusCodes'

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    fileFilter(_req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.mimetype.match(/image\/*./)) {
            callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})
const FileUpload = async (req: any, res: any, next: NextFunction) => {
    try {
        const uploadFile = upload.single('inputImage')

        uploadFile(req, res, (err: any) => {
            if (err instanceof MulterError) {
                // Handle Multer errors
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(new ResponseBuilder(StatusCodes.BAD_REQUEST, null, err.message))
            } else if (err) {
                // Handle other unexpected errors
                return res
                    .status(StatusCodes.SERVER_ERROR)
                    .json(new ResponseBuilder(StatusCodes.SERVER_ERROR, null, err.message))
            }

            next()
        })
    } catch (error: any) {
        return res
            .status(StatusCodes.SERVER_ERROR)
            .json(new ResponseBuilder(StatusCodes.SERVER_ERROR, null, error.message))
    }
}

export default FileUpload
