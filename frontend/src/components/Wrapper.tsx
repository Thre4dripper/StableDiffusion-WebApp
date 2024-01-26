import React from 'react'
import HeaderFragment from '../fragments/HeaderFragment.tsx'

interface IWrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
    return (
        <div className={'flex flex-col'}>
            <HeaderFragment />
            {children}
        </div>
    )
}

export default Wrapper
