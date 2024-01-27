import React from 'react'
import { Alert, Button, CircularProgress, IconButton, Snackbar } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import useApi, { RequestMethod } from '../../hooks/useApi.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store.ts'
import { PromptsInitialState } from '../../redux/reducers/promptsReducer.ts'
import { DimensionsInitialState } from '../../redux/reducers/dimensionsReducer.ts'
import { SamplingInitialState } from '../../redux/reducers/samplingReducer.ts'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { ImagesInitialState } from '../../redux/reducers/imagesReducer.ts'
import { setOutputImage } from '../../redux/actions/imagesActions.ts'
import { CellType } from '../../enums/CellType.ts'
import { AuthInitialState } from '../../redux/reducers/authReducer.ts'

interface CellOutputBoxProps {
    openImageDialog: (image: string) => void
    index: number
    cellType: CellType
}

const CellOutputBox: React.FC<CellOutputBoxProps> = ({ openImageDialog, index, cellType }) => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )
    const { width, height } = useSelector<RootState, DimensionsInitialState>(
        (state) => state.dimensions[index]
    )
    const { samplingSteps, cfgScale, upScale } = useSelector<RootState, SamplingInitialState>(
        (state) => state.sampling[index]
    )
    const { inputImage, outputImage } = useSelector<RootState, ImagesInitialState>(
        (state) => state.images[index]
    )

    const { token, userData } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    const dispatch = useDispatch()

    const { isLoading: isImageGenerating, callApi: generateImageApi } = useApi({
        url: `https://api.wizmodel.com/sdapi/v1/${
            cellType === CellType.TEXT_TO_IMAGE ? 'txt' : 'img'
        }2img`,
        method: RequestMethod.POST,
    })

    const { callApi: uploadImageApi } = useApi({
        url: '/api/v1/images/upload',
        method: RequestMethod.POST,
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
        generateImageApi({
            body: {
                init_images: [inputImage],
                prompt: positivePrompt,
                negative_prompt: negativePrompt,
                width: width,
                height: height,
                steps: samplingSteps,
                cfg_scale: cfgScale,
                enable_hr: true,
                hr_scale: upScale,
            },
            token: import.meta.env.VITE_WIZMODEL_API_KEY,
            onSuccess: (data) => {
                const parsedImage = `data:image/png;base64,${data?.data?.images[0]}`
                dispatch(setOutputImage(parsedImage, index))

                uploadImageApi({
                    body: {
                        userId: userData?.id,
                        image: parsedImage,
                        positivePrompt: positivePrompt,
                        negativePrompt: negativePrompt,
                        dimensions: {
                            width: width,
                            height: height,
                        },
                        samplingSteps: samplingSteps,
                        cfgScale: cfgScale,
                        upScale: upScale,
                    },
                    token: token!,
                    onSuccess: (data) => {
                        console.log(data)
                    },
                    onError: (error) => {
                        console.log(error)
                    },
                })
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    const downloadImage = () => {
        if (outputImage === null) return
        const link = document.createElement('a')
        link.href = outputImage
        link.download = `${positivePrompt}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div className={'flex flex-col gap-4 h-full justify-center items-center'}>
                <IconButton
                    className={'w-full h-80 lg:h-96'}
                    sx={{
                        'borderRadius': '1rem',
                        'padding': '0',
                        'overflow': 'hidden',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => {
                        if (outputImage !== '') openImageDialog(outputImage)
                    }}>
                    {!isImageGenerating && outputImage && (
                        <img
                            src={outputImage}
                            alt={'Latent Diffusion Model'}
                            className={'w-full h-full'}
                        />
                    )}

                    {!isImageGenerating && !outputImage && (
                        <div
                            className={
                                'w-full h-full bg-slate-400 flex justify-center items-center'
                            }>
                            <ImageIcon fontSize={'large'} />
                        </div>
                    )}

                    {isImageGenerating && (
                        <div className={'flex w-full h-full justify-center items-center'}>
                            <CircularProgress />
                        </div>
                    )}
                </IconButton>
                {/*Button*/}
                <div className={'flex justify-center items-center gap-4 px-4'}>
                    <Button
                        variant={'contained'}
                        sx={{
                            'backgroundColor': '#24282f',
                            '&:hover': {
                                backgroundColor: '#5d799d',
                            },
                        }}
                        disabled={isImageGenerating}
                        onClick={generateImage}
                        startIcon={<AutoAwesomeIcon />}>
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
                        disabled={isImageGenerating || outputImage === ''}
                        onClick={downloadImage}>
                        Download
                    </Button>
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

export default CellOutputBox
