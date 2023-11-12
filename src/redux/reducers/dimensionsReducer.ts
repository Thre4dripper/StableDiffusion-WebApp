import { ActionTypes } from '../actions/actionTypes'

export interface DimensionsInitialState {
    width: number
    height: number
}

interface SetWidthAction {
    type: ActionTypes.SET_WIDTH
    payload: number
    index: number
}

interface SetHeightAction {
    type: ActionTypes.SET_HEIGHT
    payload: number
    index: number
}

type Action = SetWidthAction | SetHeightAction

const initialState: DimensionsInitialState = {
export const dimensionsInitialState: DimensionsInitialState = {
    width: 256,
    height: 256,
}
const dimensionsInitialStates: DimensionsInitialState[] = [dimensionsInitialState]

const dimensionsReducer = (
    state: DimensionsInitialState[] = dimensionsInitialStates,
    action: Action
) => {
    const newState = [...state]
    switch (action.type) {
        case ActionTypes.SET_WIDTH:
            newState[action.index].width = action.payload
            return newState
                width: action.payload,
            }
        case ActionTypes.SET_HEIGHT:
            newState[action.index].height = action.payload
            return newState
                height: action.payload,
            }
        default:
            return state
    }
}

export default dimensionsReducer
