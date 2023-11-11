import React from 'react'
import { IconButton, Paper } from '@mui/material'
import image from '../assets/00001-994454352.png'
import ZoomableImageDialog from './ZoomableImageDialog.tsx'
import SizeControls from './controls/SizeControls.tsx'
import OtherControls from './controls/OtherControls.tsx'
import CloseIcon from '@mui/icons-material/Close'

const LDMCard: React.FC = () => {
    const [open, setOpen] = React.useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }

    return (
        <div>
            <div className={'flex ml-16 mr-12 my-8'}>
                <Paper
                    className={'flex-1'}
                    elevation={3}
                    sx={{
                        borderRadius: '16px',
                    }}>
                    <div className={'flex flex-row h-full items-center'}>
                        {/*Attributes*/}
                        <div className={'flex-1 flex flex-col h-full'}>
                            {/*Prompt*/}
                            <div className={'mx-4 my-2'}>
                                <textarea
                                    className={
                                        'w-full h-20 bg-slate-300 text-slate-700 text-md p-2 rounded-lg'
                                    }
                                    placeholder={'Prompt'}
                                />
                            </div>
                            {/*Negative Prompt*/}
                            <div className={'mx-4 my-2'}>
                                <textarea
                                    className={
                                        'w-full h-20 bg-slate-300 text-slate-700 text-md p-2 rounded-lg'
                                    }
                                    placeholder={'Negative Prompt'}
                                />
                            </div>
                            {/*Controls controls*/}
                            <div className={'flex flex-row'}>
                                <SizeControls />
                                <OtherControls />
                            </div>
                        </div>
                        {/*Image*/}
                        <div
                            className={
                                'w-[30rem] h-[30rem] bg-slate-700 rounded-br-2xl rounded-tr-2xl'
                            }>
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
                <div className={'z-10'}>
                    <Paper
                        sx={{
                            borderRadius: '50%',
                            marginLeft: '-1.5rem',
                            marginTop: '-1rem',
                            backgroundColor: '#ff5050',
                        }}>
                        <IconButton className={'w-12 h-12'}>
                            <CloseIcon
                                sx={{
                                    color: '#fff',
                                }}
                            />
                        </IconButton>
                    </Paper>
                </div>
            </div>
            <ZoomableImageDialog
                open={open}
                setOpen={setOpen}
                image={image}
                zoomIntensity={10}
                delay={0.2}
                initialZoomLevel={1}
                minZoomLevel={1}
                maxZoomLevel={2.5}
            />
        </div>
    )
}

export default LDMCard