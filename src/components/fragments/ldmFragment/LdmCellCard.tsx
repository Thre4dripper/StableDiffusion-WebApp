import { Button, IconButton, Paper } from '@mui/material'
import SizeControls from '../../controls/SizeControls.tsx'
import SamplingControls from '../../controls/SamplingControls.tsx'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import React from 'react'
import image from '../../../assets/v1_txt2img_1.png'
import ZoomableImageDialog from '../../ZoomableImageDialog.tsx'
import LdmCellPrompt from './LdmCellPrompt.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store.ts'
import { PromptsInitialState } from '../../../redux/reducers/promptsReducer.ts'
import { setNegativePrompt, setPositivePrompt } from '../../../redux/actions/promptsActions.ts'
import useApi from '../../../hooks/useApi.ts'

interface LdmCardProps {
    index: number
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
}

const LdmCellCard: React.FC<LdmCardProps> = ({ index, setIsHovering }) => {
    const [open, setOpen] = React.useState(false)
    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )

    const dispatch = useDispatch()

    const { data, callApi } = useApi({
        url: '/sdapi/v1/txt2img',
        method: 'POST',
        body: {
            prompt: positivePrompt,
            steps: 100,
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${import.meta.env.VITE_WIZMODEL_API_KEY}`,
        },
    })

    console.log(data)

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handlePositivePromptChange = (value: string) => {
        dispatch(setPositivePrompt(value, index))
    }

    const handleNegativePromptChange = (value: string) => {
        dispatch(setNegativePrompt(value, index))
    }

    const generateImage = () => {
        callApi()
    }
    return (
        <div>
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
                className={'flex-1 mx-16 my-8'}
                elevation={3}
                sx={{
                    borderRadius: '16px',
                }}>
                <div className={'flex flex-row h-full items-center'}>
                    {/*Attributes*/}
                    <div className={'flex-1 flex flex-col'}>
                        <LdmCellPrompt
                            value={positivePrompt}
                            setValue={handlePositivePromptChange}
                            promptType={'Positive'}
                        />
                        <LdmCellPrompt
                            value={negativePrompt}
                            setValue={handleNegativePromptChange}
                            promptType={'Negative'}
                        />
                        {/*Controls controls*/}
                        <div className={'flex flex-row'}>
                            <SizeControls index={index} />
                            <SamplingControls index={index} />
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
                                    }}
                                    onClick={generateImage}>
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

export default LdmCellCard