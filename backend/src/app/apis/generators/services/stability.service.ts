import { IStability, IStabilityImageToImage, IStabilityTextToImage } from '../interfaces'
import axios from 'axios'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import imageService from '../../images/services/image.service'
import profileService from '../../profile/services/profile.service'
import jimp from 'jimp'

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

        return await this.saveToDB(userId, response, data, data.width, data.height)
    }

    async imageToImage(userId: string, data: IStabilityImageToImage) {
        const formData = new FormData()
        formData.append('init_image', this.bufferToBlob(data.inputImage.buffer))
        formData.append('text_prompts[0][text]', data.positivePrompt)
        formData.append('text_prompts[0][weight]', '1')

        if (data.negativePrompt) {
            formData.append('text_prompts[1][text]', data.negativePrompt)
            formData.append('text_prompts[1][weight]', '-1')
        }
        formData.append('cfg_scale', data.cfgScale.toString())
        formData.append('steps', data.samplingSteps.toString())
        formData.append('samples', '1')

        const user = await profileService.getProfile(userId)

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/v1/generation/stable-diffusion-v1-6/image-to-image`,
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: '*/*',
                Authorization: `Bearer ${user?.stabilityAIKey}`,
            },
            data: formData,
        }

        let response = null
        try {
            response = await axios(config)
        } catch (error) {
            console.log(error)
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        const { width, height } = await this.getDimensionsFromBase64(
            response.data.artifacts[0].base64
        )

        return await this.saveToDB(userId, response, data, width!, height!)
    }

    private bufferToBlob(buffer: ArrayBufferLike) {
        return new Blob([buffer], { type: 'image/png' })
    }

    private async getDimensionsFromBase64(base64: string) {
        const buffer = Buffer.from(base64, 'base64')
        const image = await jimp.read(buffer)
        return { width: image.bitmap.width, height: image.bitmap.height }
    }

    private async saveToDB(
        userId: string,
        response: any,
        data: IStability,
        width: number,
        height: number
    ) {
        const savedImage = await imageService.createImage({
            userId,
            image: `data:image/png;base64,${response.data.artifacts[0].base64}`,
            positivePrompt: data.positivePrompt,
            negativePrompt: data.negativePrompt,
            dimensions: {
                width,
                height,
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
