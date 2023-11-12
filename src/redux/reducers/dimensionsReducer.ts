import { ActionTypes } from '../actions/actionTypes'

export interface DimensionsInitialState {
    width: number
    height: number
}

interface SetWidthAction {
    type: ActionTypes.SET_WIDTH
    payload: number
}

interface SetHeightAction {
    type: ActionTypes.SET_HEIGHT
    payload: number
}

type Action = SetWidthAction | SetHeightAction

const initialState: DimensionsInitialState = {
    width: 256,
    height: 256,
}

const dimensionsReducer = (state: DimensionsInitialState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_WIDTH:
            return {
                ...state,
                width: action.payload,
            }
        case ActionTypes.SET_HEIGHT:
            return {
                ...state,
                height: action.payload,
            }
        default:
            return state
    }
}

export default dimensionsReducer
