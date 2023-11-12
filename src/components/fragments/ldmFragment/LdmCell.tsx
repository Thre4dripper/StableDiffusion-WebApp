import React from 'react'
import AddCellButton from './AddCellButton.tsx'
import LdmCellCard from './LdmCellCard.tsx'
import LdmCellRemoveButton from './LdmCellRemoveButton.tsx'

interface LdmCellProps {
    addCellAbove: (index: number) => void
    addCellBelow: (index: number) => void
    removeCell: (index: number) => void
    index: number
}

const LdmCell: React.FC<LdmCellProps> = ({ addCellAbove, addCellBelow, removeCell, index }) => {
    const [isHovering, setIsHovering] = React.useState(false)

    return (
        <div className={'flex flex-col items-center'}>
            <div className={'w-full relative'}>
                {isHovering && (
                    <LdmCellRemoveButton
                        className={'z-10 absolute right-10 top-8'}
                        setIsHovering={setIsHovering}
                        removeCell={removeCell}
                        index={index}
                    />
                )}
                {isHovering && (
                    <AddCellButton
                        className={'z-10 absolute left-1/2 transform -translate-x-1/2 top-2'}
                        setIsHovering={setIsHovering}
                        addCell={addCellAbove}
                        index={index}
                    />
                )}
                <LdmCellCard index={index} setIsHovering={setIsHovering} />
                {isHovering && (
                    <AddCellButton
                        className={'z-10 absolute left-1/2 transform -translate-x-1/2 bottom-4'}
                        setIsHovering={setIsHovering}
                        addCell={addCellBelow}
                        index={index}
                    />
                )}
            </div>
        </div>
    )
}

export default LdmCell