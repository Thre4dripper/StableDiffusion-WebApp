import { ICreateImage, IGetImages } from '../interfaces'
import imageRepository from '../../../repositories/image.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class ImageService {
    async createImage(data: ICreateImage) {
        return imageRepository.createImage(data)
    }

    async getImages(data: IGetImages) {
        const { userId, limit, offset } = data
        return imageRepository.getImages(userId, Number(limit), Number(offset))
    }

    async deleteImage(data: { userId: string; imageId: string }) {
        const { userId, imageId } = data

        const image = await imageRepository.find({
            _id: imageId,
            userId,
        })

        if (!image) {
            throw new ValidationError(ErrorMessages.IMAGE_NOT_FOUND)
        }
        return imageRepository.deleteImage(userId, imageId)
    }
}

export default new ImageService()
