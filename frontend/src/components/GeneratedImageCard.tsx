import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { CardActions, IconButton } from '@mui/material'
import CustomTooltip from './CustomTooltip.tsx'
import Box from '@mui/material/Box'
import moment from 'moment'
import { AccessTime, Delete, Download, OpenInNew } from '@mui/icons-material'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import { useSelector } from 'react-redux'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import { RootState } from '../redux/store.ts'
import { ImageData } from '../screens/ImagesScreen.tsx'
import { useSnackbar } from 'notistack'
import AlertDialog from './dialogs/AlertDialog.tsx'

interface ICircularProgressBarProps {
    value: number
    maxValue: number
    color: string
    title: string
}

const CircularProgressBar: React.FC<ICircularProgressBarProps> = ({
    value,
    maxValue,
    color,
    title,
}) => {
    const strokeWidth = 7
    const size = 60
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const animationDuration = 1500
    const [animatingValue, setAnimatingValue] = React.useState(0)

    useEffect(() => {
        const startTime = Date.now()

        const interval = setInterval(() => {
            const currentTime = Date.now()
            const progress = (currentTime - startTime) / animationDuration

            if (progress < 1) {
                setAnimatingValue(Math.min(value, progress * maxValue))
            } else {
                setAnimatingValue(value)
                clearInterval(interval)
            }
        }, 10)

        return () => clearInterval(interval)
    }, [value, maxValue, animationDuration])

    const offset = circumference - (animatingValue / maxValue) * circumference

    return (
        <CustomTooltip title={title}>
            <div className={'relative select-none'}>
                <svg height={size} width={size}>
                    <circle
                        stroke={`${color}20`}
                        fill='transparent'
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        strokeDashoffset={0}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        strokeLinecap='round'
                    />
                    <circle
                        stroke={color}
                        fill='transparent'
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset: offset }}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        strokeLinecap='round'
                    />
                </svg>
                <div
                    className={'absolute flex flex-col justify-center items-center'}
                    style={{ top: 0, left: 0, width: size, height: size }}>
                    <span className={'text-gray-500 font-semibold'}>
                        {Math.round(animatingValue)}
                    </span>
                </div>
            </div>
        </CustomTooltip>
    )
}

const GeneratedImageCard: React.FC<ImageData> = ({
    _id,
    image,
    positivePrompt,
    negativePrompt,
    dimensions,
    samplingSteps,
    cfgScale,
    upScale,
    createdAt,
}) => {
    const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
    const { token } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    const { enqueueSnackbar } = useSnackbar()
    const parseAndFormatDate = (inputDate: Date) => {
        const parsedDate = moment(inputDate)

        return parsedDate.format('MMM DD, YYYY')
    }

    const openImageInNewTab = () => {
        const imageBase64 = image.split(',')[1] // removeImage data:image/png;base64, part
        const byteCharacters = atob(imageBase64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'image/jpeg' })
        const blobUrl = URL.createObjectURL(blob)
        window.open(blobUrl, '_blank')
    }

    const downloadImage = () => {
        const link = document.createElement('a')
        link.href = image
        link.download = 'image.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const { callApi: removeImageApi, isLoading } = useApi({
        url: `/api/v1/images/${_id}`,
        method: RequestMethod.DELETE,
    })
    const removeImage = () => {
        removeImageApi({
            body: JSON.stringify({}),
            token: token!,
            onSuccess: () => {
                enqueueSnackbar('Image Deleted Successfully', {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    preventDuplicate: true,
                })
            },
            onError: (error) => {
                enqueueSnackbar(error, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            },
        })
    }

    useEffect(() => {
        if (isLoading) {
            enqueueSnackbar('Deleting Image', {
                variant: 'info',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                preventDuplicate: true,
            })
        }
    }, [enqueueSnackbar, isLoading])

    return (
        <Card
            elevation={5}
            sx={{ backgroundColor: '#f9f9f9', borderRadius: '12px', overflow: 'hidden' }}>
            <CardMedia
                component='img'
                alt='Generated Image'
                sx={{
                    height: 200,
                    objectFit: 'cover',
                }}
                image={image}
            />
            <CardContent>
                <div className={'flex flex-row gap-2'}>
                    <Chip
                        label={<span className={'font-semibold'}>Positive Prompt</span>}
                        size='small'
                        color='success'
                        variant={'outlined'}
                    />
                    <div className={'flex-grow'} />
                    <Chip
                        label={
                            <span className={'font-semibold text-gray-500'}>
                                {dimensions.width} x {dimensions.height}
                            </span>
                        }
                        size='small'
                        color={'default'}
                        variant={'outlined'}
                    />
                </div>
                <Typography variant='subtitle1' component='div' sx={{ mt: 2, fontWeight: 600 }}>
                    {positivePrompt}
                </Typography>
                {negativePrompt && (
                    <>
                        <Chip
                            label='Negative Prompt'
                            size='medium'
                            color='error'
                            variant={'outlined'}
                            sx={{ mt: 1 }}
                        />
                        <Typography variant='h6' component='div' sx={{ mt: 1 }}>
                            {negativePrompt}s
                        </Typography>
                    </>
                )}
            </CardContent>
            <Box
                sx={{
                    p: 1,
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: '12px',
                    borderBottomRightRadius: '12px',
                }}>
                <div className={'flex flex-row justify-evenly'}>
                    <CircularProgressBar
                        value={samplingSteps}
                        maxValue={150}
                        color={'#eb6b02'}
                        title={'Sampling Steps'}
                    />
                    <CircularProgressBar
                        value={cfgScale}
                        maxValue={35}
                        color={'#9b27af'}
                        title={'CFG Scale'}
                    />
                    <CircularProgressBar
                        value={upScale}
                        maxValue={4}
                        color={'#0287d0'}
                        title={'Up Scale'}
                    />
                </div>
                <CardActions sx={{ mt: 2 }}>
                    <div className={'w-full flex flex-row justify-center items-center'}>
                        <AccessTime sx={{ color: '#272e3f', marginRight: 1 }} />
                        <span className={'text-sm text-gray-500 font-semibold'}>
                            {parseAndFormatDate(createdAt)}
                        </span>
                        <div className={'flex-1'} />
                        <CustomTooltip title={'Open'}>
                            <IconButton
                                sx={{ color: '#272e3f' }}
                                aria-label='open'
                                size='large'
                                onClick={openImageInNewTab}>
                                <OpenInNew />
                            </IconButton>
                        </CustomTooltip>
                        <CustomTooltip title={'Download'}>
                            <IconButton
                                onClick={downloadImage}
                                sx={{ color: '#272e3f' }}
                                aria-label='download'
                                size='large'>
                                <Download />
                            </IconButton>
                        </CustomTooltip>
                        <CustomTooltip title={'Delete'}>
                            <IconButton
                                onClick={() => {
                                    setRemoveDialogOpen(true)
                                }}
                                sx={{ color: '#ff5151' }}
                                aria-label='delete'
                                size='large'>
                                <Delete />
                            </IconButton>
                        </CustomTooltip>
                    </div>
                </CardActions>
            </Box>
            <AlertDialog
                title={'Delete Image'}
                description={'Are you sure you want to delete this image?'}
                positiveButtonText={'Delete'}
                negativeButtonText={'Cancel'}
                positiveAction={() => {
                    removeImage()
                    setRemoveDialogOpen(false)
                }}
                negativeAction={() => {
                    setRemoveDialogOpen(false)
                }}
                open={removeDialogOpen}
            />
        </Card>
    )
}

export default GeneratedImageCard
