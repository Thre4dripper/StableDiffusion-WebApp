import React, { useState } from 'react'
import LdmCell from './ldmFragment/LdmCell.tsx'
import { useDispatch } from 'react-redux'
import { addDimensionCell, removeDimensionCell } from '../../redux/actions/dimensionsActions.ts'
import { addPromptCell, removePromptCell } from '../../redux/actions/promptsActions.ts'
import { addSamplingCell, removeSamplingCell } from '../../redux/actions/samplingActions.ts'
import { dimensionsInitialState } from '../../redux/reducers/dimensionsReducer.ts'
import { promptsInitialState } from '../../redux/reducers/promptsReducer.ts'
import { samplingInitialState } from '../../redux/reducers/smaplingReducer.ts'
import { CellType } from '../../enums/CellType.ts'
import { addImageCell, removeImageCell } from '../../redux/actions/imagesActions.ts'
import { imagesInitialState } from '../../redux/reducers/imagesReducer.ts'
import AddCellDialog from '../dialogs/AddCellDialog.tsx'
import { AddCellDialogState } from '../../enums/AddCellDialogState.ts'

const LdmCellList: React.FC = () => {
    const [cells, setCells] = useState<{ id: number; cellType: CellType }[]>([])
    const dispatch = useDispatch()
    const addCellAbove = (index: number, cellType: CellType) => {
        setCells((prevCells) => {
            const newCells = [...prevCells]
            newCells.splice(index, 0, {
                id: Date.now(),
                cellType: cellType,
            }) // Add a new cell index before the specified index
            return newCells
        })

        dispatch(addPromptCell(promptsInitialState, index))
        dispatch(addDimensionCell(dimensionsInitialState, index))
        dispatch(addSamplingCell(samplingInitialState, index))
        dispatch(addImageCell(imagesInitialState, index))
    }

    const addCellBelow = (index: number, cellType: CellType) => {
        setCells((prevCells) => {
            const newCells = [...prevCells]
            newCells.splice(index + 1, 0, {
                id: Date.now(),
                cellType: cellType,
            }) // Add a new cell index after the specified index
            return newCells
        })

        dispatch(addPromptCell(promptsInitialState, index + 1))
        dispatch(addDimensionCell(dimensionsInitialState, index + 1))
        dispatch(addSamplingCell(samplingInitialState, index + 1))
        dispatch(addImageCell(imagesInitialState, index + 1))
    }

    const removeCell = (index: number) => {
        setCells((prevCells) => prevCells.filter((_, i) => i !== index))
        dispatch(removeSamplingCell(index))
        dispatch(removeDimensionCell(index))
        dispatch(removePromptCell(index))
        dispatch(removeImageCell(index))
    }

    return (
        <div className={'py-4'}>
            {cells.map((cell, index) => (
                <LdmCell
                    key={cell.id}
                    addCellAbove={addCellAbove}
                    addCellBelow={addCellBelow}
                    removeCell={() => removeCell(index)}
                    index={index}
                    cellType={cell.cellType}
                />
            ))}
            <AddCellDialog
                //Dialog only opened for the first time
                openAddCellDialog={
                    cells.length === 0
                        ? AddCellDialogState.OPENED_FROM_ABOVE
                        : AddCellDialogState.CLOSED
                }
                onClose={() => {}}
                addCellAbove={addCellAbove}
                addCellBelow={addCellBelow}
                index={0}
            />
        </div>
    )
}

export default LdmCellList
