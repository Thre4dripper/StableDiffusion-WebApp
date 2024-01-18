import { UserData } from '../reducers/authReducer.ts'

export const setToken = (token: string | null) => ({
    type: 'SET_TOKEN',
    payload: token,
})

export const setUserData = (userData: UserData | null) => ({
    type: 'SET_USER_DATA',
    payload: userData,
})
