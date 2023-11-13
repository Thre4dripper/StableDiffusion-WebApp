import { ActionTypes } from '../actions/actionTypes'
import lodash from 'lodash'

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

interface AddLdmCellAction {
    type: ActionTypes.ADD_PROMPT_CELL
    payload: PromptsInitialState
    index: number
}

interface RemoveLdmCellAction {
    type: ActionTypes.REMOVE_PROMPT_CELL
    index: number
}

type Action =
    | SetPositivePromptAction
    | SetNegativePromptAction
    | AddLdmCellAction
    | RemoveLdmCellAction

export const promptsInitialState: PromptsInitialState = {
    positivePrompt: '',
    negativePrompt: '',
}
const promptsInitialStates: PromptsInitialState[] = [promptsInitialState]

const promptsReducer = (state: PromptsInitialState[] = promptsInitialStates, action: Action) => {
    const newState = lodash.cloneDeep(state)
    switch (action.type) {
        case ActionTypes.SET_POSITIVE_PROMPT:
            newState[action.index].positivePrompt = action.payload
            return newState
        case ActionTypes.SET_NEGATIVE_PROMPT:
            newState[action.index].negativePrompt = action.payload
            return newState
        case ActionTypes.ADD_PROMPT_CELL:
            newState.splice(action.index, 0, action.payload)
            return newState
        case ActionTypes.REMOVE_PROMPT_CELL:
            return newState.filter((_, index) => index !== action.index)
        default:
            return state
    }
}

export default promptsReducer
