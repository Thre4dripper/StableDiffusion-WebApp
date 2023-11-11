import React from 'react'
import { Button, IconButton, Paper } from '@mui/material'
import image from '../assets/v1_txt2img_1.png'
import ZoomableImageDialog from './ZoomableImageDialog.tsx'
import SizeControls from './controls/SizeControls.tsx'
import OtherControls from './controls/OtherControls.tsx'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import AddIcon from '@mui/icons-material/Add'

const LDMCard: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const [isHovering, setIsHovering] = React.useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }

    return (
        <div
            className={'flex flex-col items-center'}
            onMouseEnter={() => {
                setIsHovering(true)
            }}
            onMouseLeave={() => {
                setIsHovering(false)
            }}
            onMouseMove={() => {
                setIsHovering(true)
            }}>
            {isHovering && (
                <div className={'w-full flex justify-center'}>
                    <Button
                        variant={'outlined'}
                        startIcon={<AddIcon />}
                        sx={{
                            'marginTop': '2rem',
                            'borderColor': '#24282f',
                            'color': '#24282f',
                            '&:hover': {
                                borderColor: '#5d799d',
                                color: '#5d799d',
                            },
                        }}>
                        Add Cell
                    </Button>
                </div>
            )}
            <div className={'w-full relative'}>
                {/*Close Button*/}
                {isHovering && (
                    <div className={'z-10 absolute right-10 top-8'}>
                        <Paper
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
                    </div>
                )}
                <Paper
                    className={'flex-1 mx-16 mt-8'}
                    elevation={3}
                    sx={{
                        borderRadius: '16px',
                    }}>
                    <div className={'flex flex-row h-full items-center'}>
                        {/*Attributes*/}
                        <div className={'flex-1 flex flex-col'}>
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
                        {/*Image Container*/}
                        <div className={'rounded-br-2xl rounded-tr-2xl'}>
                            <div className={'flex flex-col justify-end'}>
                                <IconButton
                                    className={'flex-1'}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                        },
                                    }}
                                    onClick={handleOpenDialog}>
                                    {/*<img*/}
                                    {/*    src={image}*/}
                                    {/*    alt={'Latent Diffusion Model'}*/}
                                    {/*    className={'w-96 h-96'}*/}
                                    {/*/>*/}
                                    <div
                                        className={
                                            'w-96 h-96 bg-slate-400 rounded-2xl flex justify-center items-center'
                                        }>
                                        <ImageIcon />
                                    </div>
                                </IconButton>
                                {/*Button*/}
                                <div className={'h-16 flex justify-center items-center gap-4'}>
                                    <Button
                                        variant={'contained'}
                                        sx={{
                                            'backgroundColor': '#24282f',
                                            '&:hover': {
                                                backgroundColor: '#5d799d',
                                            },
                                        }}>
                                        Generate
                                    </Button>
                                    <Button
                                        variant={'outlined'}
                                        startIcon={<DownloadIcon />}
                                        sx={{
                                            'borderColor': '#24282f',
                                            'color': '#24282f',
                                            '&:hover': {
                                                borderColor: '#5d799d',
                                                color: '#5d799d',
                                            },
                                        }}>
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
            {isHovering && (
                <div className={'w-full flex justify-center'}>
                    <Button
                        variant={'outlined'}
                        startIcon={<AddIcon />}
                        sx={{
                            'marginTop': '2rem',
                            'borderColor': '#24282f',
                            'color': '#24282f',
                            '&:hover': {
                                borderColor: '#5d799d',
                                color: '#5d799d',
                            },
                        }}>
                        Add Cell
                    </Button>
                </div>
            )}
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