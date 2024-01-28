import { ActionTypes } from './actionTypes'
import { PromptsInitialState } from '../reducers/promptsReducer.ts'

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

export const addPromptCell = (prompts: PromptsInitialState, index: number) => ({
    type: ActionTypes.ADD_PROMPT_CELL,
    payload: prompts,
    index,
})

export const removePromptCell = (index: number) => ({
    type: ActionTypes.REMOVE_PROMPT_CELL,
    index,
})
