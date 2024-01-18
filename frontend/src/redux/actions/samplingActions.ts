import { ActionTypes } from './actionTypes'

export const setSamplingSteps = (samplingSteps: number, index: number) => ({
    type: ActionTypes.SET_SAMPLING_STEPS,
    payload: samplingSteps,
    index,
})

export const setCfgScale = (cfgScale: number, index: number) => ({
    type: ActionTypes.SET_CFG_SCALE,
    payload: cfgScale,
    index,
})

export const setUpScale = (upScale: number, index: number) => ({
    type: ActionTypes.SET_UPSCALE,
    payload: upScale,
    index,
})

export const addSamplingCell = (
    sampling: { samplingSteps: number; cfgScale: number; upScale: number },
    index: number
) => ({
    type: ActionTypes.ADD_SAMPLING_CELL,
    payload: sampling,
    index,
})

export const removeSamplingCell = (index: number) => ({
    type: ActionTypes.REMOVE_SAMPLING_CELL,
    index,
})
