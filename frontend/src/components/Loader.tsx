import React from 'react'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

const Loader: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <CircularProgress />
        </Box>
    )
}

export default Loader
