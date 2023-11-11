import React from 'react'
import { IconButton, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface LdmCellRemoveButtonProps {
    className?: string
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
    removeCell: (index: number) => void
    index: number
}

const LdmCellRemoveButton: React.FC<LdmCellRemoveButtonProps> = ({
    className,
    setIsHovering,
    removeCell,
    index,
}) => {
    return (
        <Paper
            onMouseEnter={() => {
                setIsHovering(true)
            }}
            onMouseLeave={() => {
                setIsHovering(false)
            }}
            onMouseMove={() => {
                setIsHovering(true)
            }}
            onClick={() => {
                removeCell(index)
            }}
            className={className}
            sx={{
                borderRadius: '50%',
                marginLeft: '-1.5rem',
                marginTop: '-1rem',
                backgroundColor: '#ff2a2a',
            }}
            elevation={4}>
            <IconButton className={'w-12 h-12'}>
                <CloseIcon
                    sx={{
                        color: '#fff',
                    }}
                />
            </IconButton>
        </Paper>
    )
}

export default LdmCellRemoveButton