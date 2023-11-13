import React from 'react'
import AddCellButton from './AddCellButton.tsx'
import LdmCellCard from './LdmCellCard.tsx'
import LdmCellRemoveButton from './LdmCellRemoveButton.tsx'
import AddCellDialog from '../../dialogs/AddCellDialog.tsx'
import { AddCellDialogState } from '../../../enums/AddCellDialogState.ts'
import { CellType } from '../../../enums/CellType.ts'

interface LdmCellProps {
    addCellAbove: (index: number, cellType: CellType) => void
    addCellBelow: (index: number, cellType: CellType) => void
    removeCell: (index: number) => void
    index: number
    cellType: CellType
}

const LdmCell: React.FC<LdmCellProps> = ({
    addCellAbove,
    addCellBelow,
    removeCell,
    index,
    cellType,
}) => {
    const [isHovering, setIsHovering] = React.useState(false)
    const [openAddCellDialog, setOpenAddCellDialog] = React.useState<AddCellDialogState>(
        AddCellDialogState.CLOSED
    )

    const handleDialogClose = () => {
        setOpenAddCellDialog(AddCellDialogState.CLOSED)
    }

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
                        addCell={() => {
                            setOpenAddCellDialog(AddCellDialogState.OPENED_FROM_ABOVE)
                        }}
                        index={index}
                    />
                )}
                <LdmCellCard index={index} setIsHovering={setIsHovering} cellType={cellType} />
                {isHovering && (
                    <AddCellButton
                        className={'z-10 absolute left-1/2 transform -translate-x-1/2 bottom-4'}
                        setIsHovering={setIsHovering}
                        addCell={() => {
                            setOpenAddCellDialog(AddCellDialogState.OPENED_FROM_BELOW)
                        }}
                        index={index}
                    />
                )}
            </div>
            <AddCellDialog
                openAddCellDialog={openAddCellDialog}
                onClose={handleDialogClose}
                addCellAbove={addCellAbove}
                addCellBelow={addCellBelow}
                index={index}
            />
        </div>
    )
}

export default LdmCell