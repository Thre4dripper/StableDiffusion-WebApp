export interface IWizTextToImage {
    positivePrompt: string
    negativePrompt: string
    width: number
    height: number
    samplingSteps: number
    cfgScale: number
    upScale: number
}

export interface IWizImageToImage extends IWizTextToImage {
    inputImage: Buffer
}

export interface IStabilityTextToImage {
    positivePrompt: string
    negativePrompt: string
    width: number
    height: number
    samplingSteps: number
    cfgScale: number
}
