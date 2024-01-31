import React from 'react'
import HeaderFragment from '../fragments/HeaderFragment.tsx'
import { useSelector } from 'react-redux'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import { RootState } from '../redux/store.ts'

interface IWrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
    const route = window.location.pathname
    let toolbarColor = 'primary.main'

    if (route === '/generated-images') {
        toolbarColor = '#9a27ae'
    } else if (route === '/model') {
        toolbarColor = '#a755f5'
    } else if (route === '/about') {
        toolbarColor = '#ff4081'
    }

    const { userData } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    return (
        <div className={'flex flex-col'}>
            {userData && <HeaderFragment toolbarColor={toolbarColor} />}
            <div className={`flex-grow ${userData ? 'mt-16' : ''}`}>{children}</div>
        </div>
    )
}

export default Wrapper
