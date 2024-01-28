import { AiModel } from '../../enums/AiModel'

export interface IUpdateAiModel {
    userId: string
    model: AiModel
    apiKey: string
}
