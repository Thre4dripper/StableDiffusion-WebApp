import { ActionTypes } from '../actions/actionTypes.ts'

export interface UserData {
    id: number
    firstName: string
    lastName: string
    email: string
}

export interface AuthInitialState {
    userData: UserData | null
}

interface SetUserDataAction {
    type: ActionTypes.SET_USER_DATA
    payload: UserData | null
}

type Action = SetUserDataAction

export const authInitialState: AuthInitialState = {
    userData: null,
}

const authReducer = (state: AuthInitialState = authInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_DATA:
            return { ...state, userData: action.payload }
        default:
            return state
    }
}

export default authReducer
