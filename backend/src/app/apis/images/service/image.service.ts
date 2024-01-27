import { ICreateImage, IGetImages } from '../interfaces'
import imageRepository from '../../../repositories/image.repository'

class ImageService {
    async createImage(data: ICreateImage) {
        return imageRepository.createImage(data)
    }

    async getImages(data: IGetImages) {
        const { userId, limit, offset } = data
        return imageRepository.getImages(userId, Number(limit), Number(offset))
    }
}

export default new ImageService()
