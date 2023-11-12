import { ActionTypes } from './actionTypes'

export const setPositivePrompt = (positivePrompt: string) => ({
    type: ActionTypes.SET_POSITIVE_PROMPT,
    payload: positivePrompt,
})

export const setNegativePrompt = (negativePrompt: string) => ({
    type: ActionTypes.SET_NEGATIVE_PROMPT,
    payload: negativePrompt,
})
