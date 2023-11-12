import { ActionTypes } from './actionTypes'

export const setWidth = (width: number) => ({
    type: ActionTypes.SET_WIDTH,
    payload: width,
})

export const setHeight = (height: number) => ({
    type: ActionTypes.SET_HEIGHT,
    payload: height,
})
