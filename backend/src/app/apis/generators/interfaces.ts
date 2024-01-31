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

export interface IStability {
    positivePrompt: string
    negativePrompt: string
    samplingSteps: number
    cfgScale: number
}

export interface IStabilityTextToImage extends IStability {
    width: number
    height: number
}

export interface IStabilityImageToImage extends IStability {
    inputImage: Buffer
}
