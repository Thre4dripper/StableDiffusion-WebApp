import React from 'react'
import { IconButton, Paper } from '@mui/material'
import image from '../../assets/00001-994454352.png'
import ZoomableDialog from '../ZoomableDialog.tsx'
import SizeControls from '../controls/SizeControls.tsx'
import OtherControls from '../controls/OtherControls.tsx'

const LdmFragment: React.FC = () => {
    const [open, setOpen] = React.useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
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