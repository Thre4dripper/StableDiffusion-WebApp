import React from 'react'
import { IconButton, Paper } from '@mui/material'
import image from '../assets/v1_txt2img_1.png'

const LdmFragment: React.FC = () => {
    return (
        <div>
            <Paper className={'mx-10 mt-5 h-[35rem]'} elevation={3}>
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
                    </div>
                    {/*Image*/}
                    <div className={'w-[35rem] h-full bg-slate-700 rounded-br-md rounded-tr-md'}>
                        <IconButton
                            sx={{
                                'width': '100%',
                                'height': '100%',
                                'padding': '0px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                },
                            }}>
                            <img
                                src={image}
                                alt={'Latent Diffusion Model'}
                                className={'w-full h-full rounded-br-md rounded-tr-md'}
                            />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default LdmFragment