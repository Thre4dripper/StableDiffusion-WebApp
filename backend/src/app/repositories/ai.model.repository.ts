import UserModel from '../models/user.model'

class AiModelRepository {
    async updateAiModel(userId: string, model: string) {
        return UserModel.updateOne(
            { _id: userId },
            {
                $set: {
                    model,
                },
            }
        )
    }
}

export default new AiModelRepository()
