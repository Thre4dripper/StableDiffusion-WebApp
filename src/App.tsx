import HeaderFragment from './components/fragments/HeaderFragment.tsx'
import React from 'react'
import LDMFragment from './components/fragments/LDMFragment.tsx'

const App: React.FC = () => {
    return (
        <div className={'flex flex-col'}>
            <HeaderFragment />
            <LDMFragment />
        </div>
    )
}

export default App
