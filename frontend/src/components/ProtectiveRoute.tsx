import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import Loader from './Loader.tsx'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/actions/authActions.ts'
import { UserData } from '../redux/reducers/authReducer.ts'

interface Props {
    children: React.ReactNode
}

const ProtectiveRoute: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { callApi, isLoading, isIdle } = useApi({
        url: '/api/v1/profile',
        method: RequestMethod.GET,
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
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
                }
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
