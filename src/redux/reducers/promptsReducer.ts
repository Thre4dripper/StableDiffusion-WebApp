import { ActionTypes } from '../actions/actionTypes'

export interface PromptsInitialState {
    positivePrompt: string
    negativePrompt: string
}

interface SetPositivePromptAction {
    type: ActionTypes.SET_POSITIVE_PROMPT
    payload: string
    index: number
}

interface SetNegativePromptAction {
    type: ActionTypes.SET_NEGATIVE_PROMPT
    payload: string
    index: number
}

type Action = SetPositivePromptAction | SetNegativePromptAction

const initialState: PromptsInitialState = {
export const promptsInitialState: PromptsInitialState = {
    positivePrompt: '',
    negativePrompt: '',
}
const promptsInitialStates: PromptsInitialState[] = [promptsInitialState]

const promptsReducer = (state: PromptsInitialState[] = promptsInitialStates, action: Action) => {
    const newState = [...state]
    switch (action.type) {
        case ActionTypes.SET_POSITIVE_PROMPT:
            newState[action.index].positivePrompt = action.payload
            return newState
                positivePrompt: action.payload,
            }
        case ActionTypes.SET_NEGATIVE_PROMPT:
            newState[action.index].negativePrompt = action.payload
            return newState
                negativePrompt: action.payload,
            }
        default:
            return state
    }
}

export default promptsReducer
