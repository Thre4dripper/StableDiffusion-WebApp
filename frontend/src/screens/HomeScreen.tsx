import React from 'react'
import SdmCellsList from '../fragments/SdmFragment.tsx'
import HeaderFragment from '../fragments/HeaderFragment.tsx'

const HomeScreen: React.FC = () => {
    return (
        <div className={'flex flex-col'}>
            <HeaderFragment />
            <SdmCellsList />
        </div>
    )
}

export default HomeScreen
