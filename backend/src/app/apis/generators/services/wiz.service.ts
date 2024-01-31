import imageService from '../../images/services/image.service'
import { IWizImageToImage, IWizTextToImage } from '../interfaces'
import axios from 'axios'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'

require('dotenv').config()

const baseUrl = 'https://api.wizmodel.com'

class WizService {
    async textToImage(userId: string, data: IWizTextToImage) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/sdapi/v1/txt2img`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.WIZ_API_KEY}`,
            },
            data: {
                prompt: data.positivePrompt,
                negative_prompt: data.negativePrompt,
                width: data.width,
                height: data.height,
                steps: data.samplingSteps,
                cfg_scale: data.cfgScale,
                enable_hr: true,
                hr_scale: data.upScale,
            },
        }

        let response = null
        try {
            response = await axios(config)
        } catch (error) {
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        return await this.saveToDB(userId, response, data)
    }

    bufferToBase64(buffer: ArrayBufferLike) {
        const binary = Buffer.from(buffer).toString('base64')
        return `data:image/png;base64,${binary}`
    }

    async imageToImage(userId: string, data: IWizImageToImage) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/sdapi/v1/img2img`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.WIZ_API_KEY}`,
            },
            data: {
                init_images: [this.bufferToBase64(data.inputImage.buffer)],
                prompt: data.positivePrompt,
                negative_prompt: data.negativePrompt,
                width: data.width,
                height: data.height,
                steps: data.samplingSteps,
                cfg_scale: data.cfgScale,
                enable_hr: true,
                hr_scale: data.upScale,
            },
        }

        let response = null
        try {
            response = await axios(config)
        } catch (error) {
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        return await this.saveToDB(userId, response, data)
    }

    private async saveToDB(userId: string, response: any, data: IWizTextToImage) {
        const savedImage = await imageService.createImage({
            userId,
            image: `data:image/png;base64,${response.data.images[0]}`,
            positivePrompt: data.positivePrompt,
            negativePrompt: data.negativePrompt,
            dimensions: {
                width: data.width,
                height: data.height,
            },
            samplingSteps: data.samplingSteps,
            cfgScale: data.cfgScale,
            upScale: data.upScale,
        })

        if (!savedImage) {
            throw new ValidationError(ErrorMessages.IMAGE_GENERATION_FAILED)
        }

        return response.data.images[0]
    }
}

export default new WizService()
