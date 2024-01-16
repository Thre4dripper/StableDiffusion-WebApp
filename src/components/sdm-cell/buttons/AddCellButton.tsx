import React from 'react'
import { Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface AddCellButtonProps {
    className?: string
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
    addCell: (index: number) => void
    index: number
}

const AddCellButton: React.FC<AddCellButtonProps> = ({
    className,
    setIsHovering,
    addCell,
    index,
}) => {
    return (
        <Paper
            className={className}
            onMouseEnter={() => {
                setIsHovering(true)
            }}
            onMouseLeave={() => {
                setIsHovering(false)
            }}
            onMouseMove={() => {
                setIsHovering(true)
            }}>
            <Button
                variant={'outlined'}
                startIcon={<AddIcon />}
                sx={{
                    'borderColor': '#24282f',
                    'color': '#24282f',
                    '&:hover': {
                        borderColor: '#5d799d',
                        color: '#5d799d',
                    },
                }}
                onClick={() => {
                    addCell(index)
                }}>
                Add Cell
            </Button>
        </Paper>
    )
}

export default AddCellButton