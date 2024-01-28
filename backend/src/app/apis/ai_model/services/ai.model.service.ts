import aiModelRepository from '../../../repositories/ai.model.repository'
import { IUpdateAiModel } from '../interfaces'

class AiModelService {
    async updateAiModel(data: IUpdateAiModel) {
        const { userId, model, apiKey } = data
        return aiModelRepository.updateAiModel(userId, model, apiKey)
    }
}

export default new AiModelService()
