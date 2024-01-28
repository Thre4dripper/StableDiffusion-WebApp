import React from 'react'
import { Button, CircularProgress, IconButton } from '@mui/material'
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
import { AuthInitialState, Model } from '../../redux/reducers/authReducer.ts'
import { useSnackbar } from 'notistack'

interface CellOutputBoxProps {
    openImageDialog: (image: string) => void
    index: number
    cellType: CellType
}

const CellOutputBox: React.FC<CellOutputBoxProps> = ({ openImageDialog, index, cellType }) => {
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
    const { enqueueSnackbar } = useSnackbar()

    const { isLoading: isWizTextToImageLoading, callApi: wizTextToImageApi } = useApi({
        url: '/api/v1/generate/wiz/text-to-image',
        method: RequestMethod.POST,
    })

    const wizTextToImageGenerate = () => {
        wizTextToImageApi({
            body: {
                positivePrompt,
                negativePrompt,
                samplingSteps,
                cfgScale,
                width,
                height,
                upScale,
            },
            token: token!,
            onSuccess: (response) => {
                const parsedImage = `data:image/png;base64,${response?.data?.data}`
                dispatch(setOutputImage(parsedImage, index))
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    const generateImage = () => {
        if (positivePrompt === '') {
            enqueueSnackbar('Please enter a prompt', {
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
            return
        }

        if (userData?.model === Model.WIZ_MODEL) {
            if (cellType === CellType.TEXT_TO_IMAGE) {
                wizTextToImageGenerate()
            }
        }
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
                    {!isWizTextToImageLoading && outputImage && (
                        <img
                            src={outputImage}
                            alt={'Latent Diffusion Model'}
                            className={'w-full h-full'}
                        />
                    )}

                    {!isWizTextToImageLoading && !outputImage && (
                        <div
                            className={
                                'w-full h-full bg-slate-400 flex justify-center items-center'
                            }>
                            <ImageIcon fontSize={'large'} />
                        </div>
                    )}

                    {isWizTextToImageLoading && (
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
                        disabled={isWizTextToImageLoading}
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
                        disabled={isWizTextToImageLoading || outputImage === ''}
                        onClick={downloadImage}>
                        Download
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CellOutputBox
