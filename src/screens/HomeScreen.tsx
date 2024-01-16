import React from 'react'
import HeaderFragment from '../components/fragments/HeaderFragment.tsx'
import LDMFragment from '../components/fragments/LdmCellsList.tsx'

const HomeScreen: React.FC = () => {
    return (
        <div className={'flex flex-col'}>
            <HeaderFragment />
            <LDMFragment />
        </div>
    )
}

export default HomeScreen