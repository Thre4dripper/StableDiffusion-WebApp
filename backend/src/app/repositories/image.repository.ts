import ImageModel from '../models/image.model'
import mongoose from 'mongoose'

class ImageRepository {
    async find(filter: {}) {
        return ImageModel.findOne(filter)
    }

    async createImage(data: any) {
        return ImageModel.create(data)
    }

    async getImages(userId: string, limit: number, offset: number) {
        const result = await ImageModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $facet: {
                    totalCount: [
                        {
                            $count: 'count',
                        },
                    ],
                    entries: [
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },
                        {
                            $skip: offset,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                },
            },
            {
                $project: {
                    totalCount: {
                        $arrayElemAt: ['$totalCount.count', 0],
                    },
                    entries: 1,
                },
            },
        ])

        return result[0]
    }

    async deleteImage(userId: string, imageId: string) {
        return ImageModel.deleteOne({
            _id: new mongoose.Types.ObjectId(imageId),
            userId: new mongoose.Types.ObjectId(userId),
        })
    }
}

export default new ImageRepository()
