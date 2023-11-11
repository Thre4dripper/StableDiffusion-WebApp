import React, { useState } from 'react'
import LdmCell from './ldmFragment/LdmCell.tsx'

const LdmCellList: React.FC = () => {
    const [cells, setCells] = useState<number[]>([0]) // Array of cell indices

    const addCellAbove = (index: number) => {
        setCells((prevCells) => {
            const newCells = [...prevCells]
            newCells.splice(index, 0, newCells.length) // Add a new cell index before the specified index
            return newCells
        })
    }

    const addCellBelow = (index: number) => {
        setCells((prevCells) => {
            const newCells = [...prevCells]
            newCells.splice(index + 1, 0, newCells.length) // Add a new cell index after the specified index
            return newCells
        })
    }

    const removeCell = (index: number) => {
        setCells((prevCells) => prevCells.filter((_, i) => i !== index))
    }

    return (
        <div className={'py-4'}>
            {cells.map((cellIndex, index) => (
                <LdmCell
                    key={cellIndex}
                    addCellAbove={() => addCellAbove(index)}
                    addCellBelow={() => addCellBelow(index)}
                    removeCell={() => removeCell(index)}
                    index={cellIndex}
                />
            ))}
        </div>
    )
}

export default LdmCellList
