import ImageModel from '../models/image.model'
import mongoose from 'mongoose'

class ImageRepository {
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
}

export default new ImageRepository()
