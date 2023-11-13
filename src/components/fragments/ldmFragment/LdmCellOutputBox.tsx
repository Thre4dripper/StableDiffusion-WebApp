import React, { useEffect } from 'react'
import { Alert, Button, CircularProgress, IconButton, Snackbar } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import useApi from '../../../hooks/useApi.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store.ts'
import { PromptsInitialState } from '../../../redux/reducers/promptsReducer.ts'
import { DimensionsInitialState } from '../../../redux/reducers/dimensionsReducer.ts'
import { SamplingInitialState } from '../../../redux/reducers/smaplingReducer.ts'

interface LdmCellOutputBoxProps {
    openImageDialog: (image: string) => void
    index: number
}

const LdmCellOutputBox: React.FC<LdmCellOutputBoxProps> = ({ openImageDialog, index }) => {
    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )
    const { width, height } = useSelector<RootState, DimensionsInitialState>(
        (state) => state.dimensions[index]
    )
    const { samplingSteps, cfgScale, upScale } = useSelector<RootState, SamplingInitialState>(
        (state) => state.sampling[index]
    )

    const [image, setImage] = React.useState<string | null>(null)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    const { data, isLoading, callApi } = useApi({
        url: '/wiz/v1/txt2img',
        method: 'POST',
        body: {
            prompt: positivePrompt,
            negative_prompt: negativePrompt,
            width: width,
            height: height,
            steps: samplingSteps,
            cfg_scale: cfgScale,
            enable_hr: true,
            hr_scale: upScale,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_WIZMODEL_API_KEY}`,
        },
    })

    const generateImage = () => {
        if (positivePrompt === '') {
            //close and reopen snackbar
            if (snackbarOpen) {
                setSnackbarOpen(false)
                setTimeout(() => {
                    setSnackbarOpen(true)
                }, 100)
            } else {
                setSnackbarOpen(true)
            }
            return
        }
        callApi()
    }

    useEffect(() => {
        // base64 to image
        if (data === null) return
        const parsedImage = `data:image/png;base64,${data.data?.images[0]}`
        setImage(parsedImage)
    }, [data])

    const downloadImage = () => {
        if (image === null) return
        const link = document.createElement('a')
        link.href = image
        link.download = `${positivePrompt}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div className={'rounded-br-2xl rounded-tr-2xl'}>
                <div className={'flex flex-col justify-end'}>
                    <IconButton
                        className={'flex-1'}
                        sx={{
                            'borderRadius': '.5rem',
                            'padding': '0',
                            'overflow': 'hidden',
                            'margin': '1rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => {
                            if (image !== null) openImageDialog(image)
                        }}>
                        {!isLoading && image && (
                            <img
                                src={image}
                                alt={'Latent Diffusion Model'}
                                className={'w-96 h-fit'}
                            />
                        )}

                        {!isLoading && !image && (
                            <div
                                className={
                                    'w-96 h-96 bg-slate-400 flex justify-center items-center'
                                }>
                                <ImageIcon />
                            </div>
                        )}

                        {isLoading && (
                            <div className={'flex w-96 h-96 justify-center items-center'}>
                                <CircularProgress />
                            </div>
                        )}
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
                            }}
                            onClick={downloadImage}>
                            Download
                        </Button>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => {
                    setSnackbarOpen(false)
                }}>
                <Alert severity='error' sx={{ width: '100%' }}>
                    Please enter a prompt
                </Alert>
            </Snackbar>
        </>
    )
}

export default LdmCellOutputBox