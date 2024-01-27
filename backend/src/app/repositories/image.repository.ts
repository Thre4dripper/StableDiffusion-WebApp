import ImageModel from '../models/image.model'

class ImageRepository {
    async createImage(data: any) {
        return ImageModel.create(data)
    }
}

export default new ImageRepository()
