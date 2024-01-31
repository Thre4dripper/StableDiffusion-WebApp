import { IStabilityTextToImage } from '../interfaces'
import axios from 'axios'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import imageService from '../../images/services/image.service'
import profileService from '../../profile/services/profile.service'

const baseUrl = 'https://api.stability.ai'

class StabilityService {
    async textToImage(userId: string, data: IStabilityTextToImage) {
        const user = await profileService.getProfile(userId)
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/v1/generation/stable-diffusion-v1-6/text-to-image`,
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${user?.stabilityAIKey}`,
            },
            data: {
                text_prompts: [
                    {
                        text: data.positivePrompt,
                        weight: 1,
                    },
                    {
                        text: data.negativePrompt,
                        weight: -1,
                    },
                ],
                cfg_scale: data.cfgScale,
                width: data.width,
                height: data.height,
                steps: data.samplingSteps,
                samples: 1,
            },
        }

        if (!data.negativePrompt) {
            config.data.text_prompts.pop()
        }

        let response = null
        try {
            response = await axios(config)
        } catch (error) {
            console.log(error)
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        return await this.saveToDB(userId, response, data)
    }

    private async saveToDB(userId: string, response: any, data: IStabilityTextToImage) {
        const savedImage = await imageService.createImage({
            userId,
            image: `data:image/png;base64,${response.data.artifacts[0].base64}`,
            positivePrompt: data.positivePrompt,
            negativePrompt: data.negativePrompt,
            dimensions: {
                width: data.width,
                height: data.height,
            },
            samplingSteps: data.samplingSteps,
            cfgScale: data.cfgScale,
            upScale: 1,
        })

        if (!savedImage) {
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        return response.data.artifacts[0].base64
    }
}

export default new StabilityService()
