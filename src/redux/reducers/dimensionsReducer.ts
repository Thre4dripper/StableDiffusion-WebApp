import { ActionTypes } from '../actions/actionTypes'
import lodash from 'lodash'

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

interface AddLdmCellAction {
    type: ActionTypes.ADD_DIMENSION_CELL
    payload: DimensionsInitialState
    index: number
}

type Action = SetWidthAction | SetHeightAction | AddLdmCellAction

export const dimensionsInitialState: DimensionsInitialState = {
    width: 256,
    height: 256,
}
const dimensionsInitialStates: DimensionsInitialState[] = [dimensionsInitialState]

const dimensionsReducer = (
    state: DimensionsInitialState[] = dimensionsInitialStates,
    action: Action
) => {
    const newState = lodash.cloneDeep(state)
    switch (action.type) {
        case ActionTypes.SET_WIDTH:
            newState[action.index].width = action.payload
            console.table(newState)
            return newState
        case ActionTypes.SET_HEIGHT:
            newState[action.index].height = action.payload
            return newState
        case ActionTypes.ADD_DIMENSION_CELL:
            newState.splice(action.index, 0, action.payload)
            return newState
        default:
            return state
    }
}

export default dimensionsReducer
