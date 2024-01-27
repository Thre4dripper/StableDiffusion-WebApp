export interface ICreateImage {
    userId: string
    image: string
    positivePrompt: string
    negativePrompt: string
    dimensions: {
        width: number
        height: number
    }
    samplingSteps: number
    cfgScale: number
    upScale: number
}
