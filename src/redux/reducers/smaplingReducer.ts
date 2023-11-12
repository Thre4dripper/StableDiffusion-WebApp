import { ActionTypes } from '../actions/actionTypes'

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

type Action = SetSamplingStepsAction | SetCfgScaleAction | SetUpScaleAction

const initialState: SamplingInitialState = {
export const samplingInitialState: SamplingInitialState = {
    samplingSteps: 20,
    cfgScale: 7,
    upScale: 2,
}
const samplingInitialStates: SamplingInitialState[] = [samplingInitialState]

const samplingReducer = (state: SamplingInitialState[] = samplingInitialStates, action: Action) => {
    const newState = [...state]
    switch (action.type) {
        case ActionTypes.SET_SAMPLING_STEPS:
            newState[action.index].samplingSteps = action.payload
            return newState
                samplingSteps: action.payload,
            }
        case ActionTypes.SET_CFG_SCALE:
            newState[action.index].cfgScale = action.payload
            return newState
                cfgScale: action.payload,
            }
        case ActionTypes.SET_UPSCALE:
            return {
                ...state,
                upScale: action.payload,
            }
        default:
            return state
    }
}

export default samplingReducer
