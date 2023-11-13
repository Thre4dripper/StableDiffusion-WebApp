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

export const addDimensionCell = (dimensions: { width: number; height: number }, index: number) => ({
    type: ActionTypes.ADD_DIMENSION_CELL,
    payload: dimensions,
    index,
})

export const removeDimensionCell = (index: number) => ({
    type: ActionTypes.REMOVE_DIMENSION_CELL,
    index,
})
