import { ActionTypes } from '../actions/actionTypes'

export interface PromptsInitialState {
    positivePrompt: string
    negativePrompt: string
}

interface SetPositivePromptAction {
    type: ActionTypes.SET_POSITIVE_PROMPT
    payload: string
}

interface SetNegativePromptAction {
    type: ActionTypes.SET_NEGATIVE_PROMPT
    payload: string
}

type Action = SetPositivePromptAction | SetNegativePromptAction

const initialState: PromptsInitialState = {
    positivePrompt: '',
    negativePrompt: '',
}

const promptsReducer = (state: PromptsInitialState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_POSITIVE_PROMPT:
            return {
                ...state,
                positivePrompt: action.payload,
            }
        case ActionTypes.SET_NEGATIVE_PROMPT:
            return {
                ...state,
                negativePrompt: action.payload,
            }
        default:
            return state
    }
}

export default promptsReducer
