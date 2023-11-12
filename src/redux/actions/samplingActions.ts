import { ActionTypes } from './actionTypes'

export const setSamplingSteps = (samplingSteps: number) => ({
    type: ActionTypes.SET_SAMPLING_STEPS,
    payload: samplingSteps,
})

export const setCfgScale = (cfgScale: number) => ({
    type: ActionTypes.SET_CFG_SCALE,
    payload: cfgScale,
})

export const setUpScale = (upScale: number) => ({
    type: ActionTypes.SET_UPSCALE,
    payload: upScale,
})
