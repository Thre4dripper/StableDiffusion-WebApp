import { ActionTypes } from './actionTypes'
import { DimensionsInitialState } from '../reducers/dimensionsReducer.ts'

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

export const addDimensionCell = (dimensions: DimensionsInitialState, index: number) => ({
    type: ActionTypes.ADD_DIMENSION_CELL,
    payload: dimensions,
    index,
})

export const removeDimensionCell = (index: number) => ({
    type: ActionTypes.REMOVE_DIMENSION_CELL,
    index,
})
