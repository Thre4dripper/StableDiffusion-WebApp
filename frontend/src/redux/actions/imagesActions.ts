import { ActionTypes } from './actionTypes.ts'
import { ImagesInitialState } from '../reducers/imagesReducer.ts'

export const setInputImage = (image: File | null, index: number) => ({
    type: ActionTypes.SET_INPUT_IMAGE,
    payload: image,
    index,
})

export const setOutputImage = (image: string, index: number) => ({
    type: ActionTypes.SET_OUTPUT_IMAGE,
    payload: image,
    index,
})

export const addImageCell = (images: ImagesInitialState, index: number) => ({
    type: ActionTypes.ADD_IMAGES_CELL,
    payload: images,
    index,
})

export const removeImageCell = (index: number) => ({
    type: ActionTypes.REMOVE_IMAGES_CELL,
    index,
})
