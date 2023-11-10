import React from 'react'
import { Paper } from '@mui/material'
import CustomSlider from '../CustomSlider.tsx'

const SizeControls: React.FC = () => {
    const marks = [
        {
            value: 0,
            label: '32',
        },
        {
            value: 20,
            label: '64',
        },
        {
            value: 40,
            label: '128',
        },
        {
            value: 60,
            label: '256',
        },
        {
            value: 80,
            label: '512',
        },
        {
            value: 100,
            label: '1024',
        },
    ]

    const labelFormat = (value: number) => {
        return marks.find((mark) => mark.value === value)?.label || undefined
    }
    return (
        <Paper
            className={'flex-1 mx-4 my-2 p-2'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#e2ffe7',
            }}>
            <div className={'flex flex-col justify-between px-8 gap-4'}>
                <div className={'flex flex-col'}>
                    <label className={'text-black text-md'}>Width</label>
                    <CustomSlider
                        valueLabelDisplay='auto'
                        valueLabelFormat={labelFormat}
                        aria-label='pretto slider'
                        marks={marks}
                        step={null}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-black text-md'}>Height</label>
                    <CustomSlider
                        valueLabelDisplay='auto'
                        aria-label='pretto slider'
                        defaultValue={20}
                        valueLabelFormat={labelFormat}
                        step={null}
                        marks={marks}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default SizeControls