import React from 'react'
import HeaderFragment from '../fragments/HeaderFragment.tsx'

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

    return (
        <div className={'flex flex-col'}>
            <HeaderFragment toolbarColor={toolbarColor} />
            <div className={'flex-grow mt-16'}>{children}</div>
        </div>
    )
}

export default Wrapper
