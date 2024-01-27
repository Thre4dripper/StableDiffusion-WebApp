import { ICreateImage } from '../interfaces'
import imageRepository from '../../../repositories/image.repository'

class ImageService {
    async createImage(data: ICreateImage) {
        return imageRepository.createImage(data)
    }
}

export default new ImageService()
