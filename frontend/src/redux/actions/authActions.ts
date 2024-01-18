import { UserData } from '../reducers/authReducer.ts'
import { ActionTypes } from './actionTypes.ts'

export const setToken = (token: string | null) => ({
    type: ActionTypes.SET_TOKEN,
    payload: token,
})

export const setUserData = (userData: UserData | null) => ({
    type: ActionTypes.SET_USER_DATA,
    payload: userData,
})
