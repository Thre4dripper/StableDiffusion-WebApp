import React from 'react'
import { Input, Paper, Slider } from '@mui/material'

const OtherControls: React.FC = () => {
    return (
        <Paper
            className={'flex-1 mx-4 my-2 p-2'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#fff4d7',
            }}>
            <div className={'flex flex-col justify-between px-8 gap-4'}>
                <div className={'mx-4 my-2'}>
                    <label className={'text-black text-md'}>Sampling Steps</label>
                    <div className={'flex flex-row gap-6'}>
                        <Slider
                            aria-label='Sampling Steps'
                            defaultValue={30}
                            valueLabelDisplay='auto'
                            color='warning'
                            max={100}
                            min={0}
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    'lineHeight': 1.2,
                                    'fontSize': 12,
                                    'background': 'unset',
                                    'padding': 0,
                                    'width': 32,
                                    'height': 32,
                                    'borderRadius': '50% 50% 50% 0',
                                    'backgroundColor': '#eb6b02',
                                    'transformOrigin': 'bottom left',
                                    'transform': 'translate(50%, -100%) rotate(-45deg) scale(0)',
                                    '&:before': { display: 'none' },
                                    '&.MuiSlider-valueLabelOpen': {
                                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                                    },
                                    '& > *': {
                                        transform: 'rotate(45deg)',
                                    },
                                },
                            }}
                        />
                        <Input
                            className={'w-20'}
                            defaultValue={30}
                            inputProps={{
                                'step': 1,
                                'min': 0,
                                'max': 100,
                                'type': 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            color='warning'
                        />
                    </div>
                </div>
                <div className={'mx-4 my-2'}>
                    <label className={'text-black text-md'}>CFG Scale</label>
                    <div className={'flex flex-row gap-6'}>
                        <Slider
                            aria-label='CFG Scale'
                            defaultValue={30}
                            valueLabelDisplay='auto'
                            color='secondary'
                            min={1}
                            max={35}
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    'lineHeight': 1.2,
                                    'fontSize': 12,
                                    'background': 'unset',
                                    'padding': 0,
                                    'width': 32,
                                    'height': 32,
                                    'borderRadius': '50% 50% 50% 0',
                                    'backgroundColor': '#9b27af',
                                    'transformOrigin': 'bottom left',
                                    'transform': 'translate(50%, -100%) rotate(-45deg) scale(0)',
                                    '&:before': { display: 'none' },
                                    '&.MuiSlider-valueLabelOpen': {
                                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                                    },
                                    '& > *': {
                                        transform: 'rotate(45deg)',
                                    },
                                },
                            }}
                        />
                        <Input
                            className={'w-20'}
                            defaultValue={30}
                            inputProps={{
                                'step': 1,
                                'min': 1,
                                'max': 35,
                                'type': 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                            color='secondary'
                        />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default OtherControls