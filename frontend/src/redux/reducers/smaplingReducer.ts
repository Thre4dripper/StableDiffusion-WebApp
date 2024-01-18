import { ActionTypes } from '../actions/actionTypes'
import lodash from 'lodash'

export interface SamplingInitialState {
    samplingSteps: number
    cfgScale: number
    upScale: number
}

interface SetSamplingStepsAction {
    type: ActionTypes.SET_SAMPLING_STEPS
    payload: number
    index: number
}

interface SetCfgScaleAction {
    type: ActionTypes.SET_CFG_SCALE
    payload: number
    index: number
}

interface SetUpScaleAction {
    type: ActionTypes.SET_UPSCALE
    payload: number
    index: number
}

interface AddLdmCellAboveAction {
    type: ActionTypes.ADD_SAMPLING_CELL
    payload: SamplingInitialState
    index: number
}

interface RemoveLdmCellAction {
    type: ActionTypes.REMOVE_SAMPLING_CELL
    index: number
}

type Action =
    | SetSamplingStepsAction
    | SetCfgScaleAction
    | SetUpScaleAction
    | AddLdmCellAboveAction
    | RemoveLdmCellAction

export const samplingInitialState: SamplingInitialState = {
    samplingSteps: 20,
    cfgScale: 7,
    upScale: 1,
}
const samplingInitialStates: SamplingInitialState[] = [samplingInitialState]

const samplingReducer = (state: SamplingInitialState[] = samplingInitialStates, action: Action) => {
    const newState = lodash.cloneDeep(state)
    switch (action.type) {
        case ActionTypes.SET_SAMPLING_STEPS:
            newState[action.index].samplingSteps = action.payload
            return newState
        case ActionTypes.SET_CFG_SCALE:
            newState[action.index].cfgScale = action.payload
            return newState
        case ActionTypes.SET_UPSCALE:
            newState[action.index].upScale = action.payload
            return newState
        case ActionTypes.ADD_SAMPLING_CELL:
            newState.splice(action.index, 0, action.payload)
            return newState
        case ActionTypes.REMOVE_SAMPLING_CELL:
            return newState.filter((_, index) => index !== action.index)
        default:
            return state
    }
}

export default samplingReducer
