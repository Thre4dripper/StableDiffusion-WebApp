import { AiModel } from '../../../enums/AiModel'
import aiModelRepository from '../../../repositories/ai.model.repository'

class AiModelService {
    async updateAiModel(userId: string, model: AiModel) {
        return aiModelRepository.updateAiModel(userId, model)
    }
}

export default new AiModelService()
