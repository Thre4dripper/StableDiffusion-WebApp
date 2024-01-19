import React from 'react'
import HeaderFragment from '../fragments/HeaderFragment.tsx'
import SdmCellsList from '../fragments/SdmFragment.tsx'

const HomeScreen: React.FC = () => {
    return (
        <div className={'flex flex-col'}>
            <HeaderFragment />
            <SdmCellsList />
        </div>
    )
}

export default HomeScreen
