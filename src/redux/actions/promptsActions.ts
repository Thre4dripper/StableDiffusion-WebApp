import { ActionTypes } from './actionTypes'

export const setPositivePrompt = (positivePrompt: string, index: number) => ({
    type: ActionTypes.SET_POSITIVE_PROMPT,
    payload: positivePrompt,
    index,
})

export const setNegativePrompt = (negativePrompt: string, index: number) => ({
    type: ActionTypes.SET_NEGATIVE_PROMPT,
    payload: negativePrompt,
    index,
})
