import { ActionTypes } from '../actions/actionTypes.ts'

export interface UserData {
    id: number
    firstName: string
    lastName: string
    email: string
}

export interface AuthReducerInitialState {
    token: string | null
    userData: UserData | null
}

interface SetTokenAction {
    type: ActionTypes.SET_TOKEN
    payload: string | null
}

interface SetUserDataAction {
    type: ActionTypes.SET_USER_DATA
    payload: UserData | null
}

type Action = SetTokenAction | SetUserDataAction

export const authInitialState: AuthReducerInitialState = {
    token: null,
    userData: null,
}

const authReducer = (state: AuthReducerInitialState = authInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_TOKEN:
            return { ...state, token: action.payload }
        case ActionTypes.SET_USER_DATA:
            return { ...state, userData: action.payload }
        default:
            return state
    }
}

export default authReducer
