import { ActionTypes } from './actionTypes'

export const setWidth = (width: number, index: number) => ({
    type: ActionTypes.SET_WIDTH,
    payload: width,
    index,
})

export const setHeight = (height: number, index: number) => ({
    type: ActionTypes.SET_HEIGHT,
    payload: height,
    index,
})
