import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import Loader from './Loader.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserData } from '../redux/actions/authActions.ts'
import { AuthInitialState, UserData } from '../redux/reducers/authReducer.ts'
import { RootState } from '../redux/store.ts'

interface Props {
    children: React.ReactNode
}

const ProtectiveRoute: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { token: authStateToken, userData } = useSelector<RootState, AuthInitialState>(
        (state) => state.auth
    )
    const { callApi, isLoading, isIdle } = useApi({
        url: '/api/v1/profile',
        method: RequestMethod.GET,
    })

    useEffect(() => {
        const token = authStateToken || localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        // If userData is already present, don't call the API
        if (userData) {
            return
        }

        callApi({
            body: null,
            token: token!,
            onSuccess: (response) => {
                const user: UserData = {
                    id: response?.data.data._id,
                    firstName: response?.data.data.firstName,
                    lastName: response?.data.data.lastName,
                    email: response?.data.data.email,
                    profilePic: response?.data.data.profilePic,
                }
                dispatch(setToken(token!))
                dispatch(setUserData(user))
            },
            onError: () => {
                localStorage.removeItem('token')
                navigate('/login')
            },
        })
    }, [callApi, dispatch, navigate])

    if (isLoading || isIdle) {
        return (
            <div className={'flex w-screen h-screen justify-center items-center'}>
                <Loader />
            </div>
        )
    }

    return <>{children}</>
}

export default ProtectiveRoute
