import { ActionTypes } from './actionTypes.ts'

export const setInputImage = (image: string, index: number) => ({
    type: ActionTypes.SET_INPUT_IMAGE,
    payload: image,
    index,
})

export const setOutputImage = (image: string, index: number) => ({
    type: ActionTypes.SET_OUTPUT_IMAGE,
    payload: image,
    index,
})

export const addImageCell = (
    images: { inputImage: string; outputImage: string },
    index: number
) => ({
    type: ActionTypes.ADD_IMAGES_CELL,
    payload: images,
    index,
})

export const removeImageCell = (index: number) => ({
    type: ActionTypes.REMOVE_IMAGES_CELL,
    index,
})
