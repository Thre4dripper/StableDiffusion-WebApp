import React from 'react'
import { IconButton, Paper } from '@mui/material'
import image from '../assets/00001-994454352.png'
import ZoomableDialog from './ZoomableDialog.tsx'
import CustomSlider from './CustomSlider.tsx'

const LdmFragment: React.FC = () => {
    const [open, setOpen] = React.useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }

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
        <div>
            <Paper
                className={'mx-10 mt-5 h-[35rem]'}
                elevation={3}
                sx={{
                    borderRadius: '16px',
                }}>
                <div className={'flex flex-row h-full'}>
                    {/*Attributes*/}
                    <div className={'flex-1 flex flex-col h-full'}>
                        {/*Prompt*/}
                        <div className={'mx-4 my-2'}>
                            <textarea
                                className={
                                    'w-full h-20 bg-slate-300 text-black text-md p-2 rounded-lg'
                                }
                                placeholder={'Prompt'}
                            />
                        </div>
                        {/*Negative Prompt*/}
                        <div className={'mx-4 my-2'}>
                            <textarea
                                className={
                                    'w-full h-20 bg-slate-300 text-black text-md p-2 rounded-lg'
                                }
                                placeholder={'Negative Prompt'}
                            />
                        </div>
                        {/*Size controls*/}
                        <Paper
                            className={'mx-4 my-2 p-2'}
                            elevation={3}
                            sx={{
                                borderRadius: '20px',
                            }}>
                            <div className={'flex flex-col justify-between px-4 gap-4'}>
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
                    </div>
                    {/*Image*/}
                    <div className={'w-[35rem] h-full bg-slate-700 rounded-br-2xl rounded-tr-2xl'}>
                        <IconButton
                            sx={{
                                'width': '100%',
                                'height': '100%',
                                'padding': '0px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={handleOpenDialog}>
                            <img
                                src={image}
                                alt={'Latent Diffusion Model'}
                                className={'w-full h-full rounded-br-2xl rounded-tr-2xl'}
                            />
                        </IconButton>
                    </div>
                </div>
            </Paper>
            <ZoomableDialog open={open} setOpen={setOpen} image={image} />
        </div>
    )
}

export default LdmFragment