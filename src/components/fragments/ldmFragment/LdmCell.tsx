import React from 'react'
import AddCellButton from './AddCellButton.tsx'
import LdmCellCard from './LdmCellCard.tsx'
import LdmCellRemoveButton from './LdmCellRemoveButton.tsx'

const LdmCell: React.FC = () => {
    const [isHovering, setIsHovering] = React.useState(false)

    return (
        <div className={'flex flex-col items-center'}>
            <div className={'w-full relative'}>
                {isHovering && (
                    <LdmCellRemoveButton
                        className={'z-10 absolute right-10 top-8'}
                        setIsHovering={setIsHovering}
                    />
                )}
                {isHovering && (
                    <AddCellButton
                        className={'z-10 absolute left-1/2 transform -translate-x-1/2 top-2'}
                        setIsHovering={setIsHovering}
                    />
                )}
                <LdmCellCard setIsHovering={setIsHovering} />
                {isHovering && (
                    <AddCellButton
                        className={'z-10 absolute left-1/2 transform -translate-x-1/2 bottom-4'}
                        setIsHovering={setIsHovering}
                    />
                )}
            </div>
        </div>
    )
}

export default LdmCell