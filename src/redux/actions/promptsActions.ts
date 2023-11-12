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

export const addPromptCell = (
    prompts: { positivePrompt: string; negativePrompt: string },
    index: number
) => ({
    type: ActionTypes.ADD_PROMPT_CELL,
    payload: prompts,
    index,
})
