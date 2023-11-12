import { ActionTypes } from '../actions/actionTypes'

export interface SamplingInitialState {
    samplingSteps: number
    cfgScale: number
    upScale: number
}

interface SetSamplingStepsAction {
    type: ActionTypes.SET_SAMPLING_STEPS
    payload: number
}

interface SetCfgScaleAction {
    type: ActionTypes.SET_CFG_SCALE
    payload: number
}

interface SetUpScaleAction {
    type: ActionTypes.SET_UPSCALE
    payload: number
}

type Action = SetSamplingStepsAction | SetCfgScaleAction | SetUpScaleAction

const initialState: SamplingInitialState = {
    samplingSteps: 20,
    cfgScale: 7,
    upScale: 2,
}

const samplingReducer = (state: SamplingInitialState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_SAMPLING_STEPS:
            return {
                ...state,
                samplingSteps: action.payload,
            }
        case ActionTypes.SET_CFG_SCALE:
            return {
                ...state,
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
