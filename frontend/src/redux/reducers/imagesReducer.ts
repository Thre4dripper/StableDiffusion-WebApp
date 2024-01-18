import { ActionTypes } from '../actions/actionTypes.ts'
import lodash from 'lodash'

export interface ImagesInitialState {
    inputImage: string
    outputImage: string
}

interface SetInputImageAction {
    type: ActionTypes.SET_INPUT_IMAGE
    payload: string
    index: number
}

interface SetOutputImageAction {
    type: ActionTypes.SET_OUTPUT_IMAGE
    payload: string
    index: number
}

interface AddLdmCellAction {
    type: ActionTypes.ADD_IMAGES_CELL
    payload: ImagesInitialState
    index: number
}

interface RemoveLdmCellAction {
    type: ActionTypes.REMOVE_IMAGES_CELL
    index: number
}

type Action = SetInputImageAction | SetOutputImageAction | AddLdmCellAction | RemoveLdmCellAction

export const imagesInitialState: ImagesInitialState = {
    inputImage: '',
    outputImage: '',
}

const imagesInitialStates: ImagesInitialState[] = [
    {
        inputImage: '',
        outputImage: '',
    },
]

const imagesReducer = (state = imagesInitialStates, action: Action) => {
    const newState = lodash.cloneDeep(state)
    switch (action.type) {
        case ActionTypes.SET_INPUT_IMAGE:
            newState[action.index].inputImage = action.payload
            return newState
        case ActionTypes.SET_OUTPUT_IMAGE:
            newState[action.index].outputImage = action.payload
            return newState
        case ActionTypes.ADD_IMAGES_CELL:
            newState.splice(action.index, 0, action.payload)
            return newState
        case ActionTypes.REMOVE_IMAGES_CELL:
            newState.splice(action.index, 1)
            return newState
        default:
            return state
    }
}

export default imagesReducer