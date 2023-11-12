import React from 'react'
import { Paper } from '@mui/material'
import SamplingInput from './SamplingInput.tsx'

const SamplingControls: React.FC = () => {
    return (
        <Paper
            className={'flex-1 mx-4 my-2 p-2'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#fff4d7',
            }}>
            <div className={'flex flex-col justify-between px-8 gap-0.5'}>
                <SamplingInput
                    label='Sampling Steps'
                    value={30}
                    setValue={() => {}}
                    valueLabelDisplay='auto'
                    color='warning'
                    min={1}
                    max={35}
                    isMarked={false}
                    step={1}
                />
                <SamplingInput
                    label='CFG Scale'
                    value={30}
                    setValue={() => {}}
                    valueLabelDisplay='auto'
                    color='secondary'
                    min={1}
                    max={35}
                    isMarked={false}
                    step={1}
                />
                <SamplingInput
                    label='Upscale By'
                    value={2}
                    setValue={() => {}}
                    valueLabelDisplay='auto'
                    color='info'
                    min={1}
                    max={4}
                    isMarked={true}
                    step={0.1}
                />
            </div>
        </Paper>
    )
}

export default SamplingControls