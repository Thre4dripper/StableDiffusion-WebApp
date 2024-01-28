import UserModel from '../models/user.model'

class AiModelRepository {
    async updateAiModel(userId: string, model: string, apiKey: string) {
        return UserModel.updateOne(
            { _id: userId },
            {
                $set: {
                    model,
                    stabilityAIKey: apiKey,
                },
            }
        )
    }
}

export default new AiModelRepository()
