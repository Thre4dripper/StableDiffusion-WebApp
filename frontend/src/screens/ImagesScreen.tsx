import React, { useCallback, useEffect, useRef, useState } from 'react'
import GeneratedImageCard from '../components/GeneratedImageCard.tsx'
import Loader from '../components/Loader.tsx'
import Grow from '@mui/material/Grow'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import { useSelector } from 'react-redux'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import { RootState } from '../redux/store.ts'
import AlertDialog from '../components/dialogs/AlertDialog.tsx'
import { useSnackbar } from 'notistack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export interface ImageData {
    userId: string
    _id: string
    image: string
    positivePrompt: string
    negativePrompt: string
    dimensions: {
        width: number
        height: number
    }
    samplingSteps: number
    cfgScale: number
    upScale: number
    createdAt: Date
}

const ImagesScreen: React.FC = () => {
    const navigate = useNavigate()

    const [images, setImages] = useState<ImageData[]>([])
    const [totalImages, setTotalImages] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)
    const [removeDialogOpen, setRemoveDialogOpen] = React.useState({
        open: false,
        imageId: '',
    })

    const { token } = useSelector<RootState, AuthInitialState>((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar()

    const { callApi, isLoading: isFetching } = useApi({
        url: `/api/v1/images?limit=4&offset=${offset}`,
        method: RequestMethod.GET,
    })

    const fetchImages = useCallback(async () => {
        callApi({
            body: null,
            token: token!,
            onSuccess: (response) => {
                const newImages = response?.data?.data?.entries
                setImages((prevImages) => [...prevImages, ...newImages])
                setTotalImages(response?.data?.data?.totalCount)
                setOffset((prevOffset) => prevOffset + 4)
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }, [callApi, token])

    //first time call for image fetching
    useEffect(() => {
        fetchImages().then()
    }, [])

    const observerTarget = useRef(null)

    //for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    await fetchImages()
                }
            },
            { threshold: 1 }
        )

        const target = observerTarget.current
        if (target) {
            observer.observe(target)
        }

        return () => {
            if (target) {
                observer.unobserve(target)
            }
        }
    }, [fetchImages, isFetching])

    const {
        callApi: removeImageApi,
        isLoading: isDeleting,
        isSuccess: isDeleted,
        isFailed: isDeleteFailed,
    } = useApi({
        url: `/api/v1/images`,
        method: RequestMethod.DELETE,
    })
    const removeImage = (id: string) => {
        removeImageApi({
            body: {
                imageId: id,
            },
            token: token!,
            onSuccess: () => {
                //reset the whole state
                setImages([])
                setTotalImages(0)
                setOffset(0)
                fetchImages().then()
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    useEffect(() => {
        if (isDeleted) {
            enqueueSnackbar('Image Deleted Successfully', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                preventDuplicate: true,
            })
        } else if (isDeleteFailed) {
            enqueueSnackbar('Failed to Delete Image', {
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                preventDuplicate: true,
            })
        } else if (isDeleting) {
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
    }, [enqueueSnackbar, isDeleteFailed, isDeleted, isDeleting, removeDialogOpen.imageId])

    return (
        <div className={'flex flex-col gap-4 my-8 mx-8 md:mx-10 lg:mx-14 xl:mx-16'}>
            <div
                className={
                    'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                }>
                {images.map((image, index) => {
                    const growDelay = Math.random() * (2000 - 500) + 500
                    return (
                        <Grow in timeout={growDelay} key={index}>
                            <div>
                                <GeneratedImageCard
                                    {...image}
                                    removeImage={(id) => {
                                        setRemoveDialogOpen({
                                            open: true,
                                            imageId: id,
                                        })
                                    }}
                                />
                            </div>
                        </Grow>
                    )
                })}
            </div>
            {(images.length < totalImages || isFetching) && (
                <div ref={observerTarget} className={'flex flex-row my-40 justify-center'}>
                    {isFetching && <Loader />}
                </div>
            )}
            {images.length === 0 && !isFetching && (
                <div className={'flex flex-col my-40 justify-center items-center gap-8'}>
                    <Typography
                        variant='body2'
                        component='div'
                        className={'text-slate-500 select-none'}
                        style={{ fontSize: '36px', fontWeight: 'bold' }}>
                        No Images Found :(
                    </Typography>
                    <Button
                        variant='contained'
                        color={'secondary'}
                        onClick={() => {
                            navigate('/')
                        }}>
                        Generate Images
                    </Button>
                </div>
            )}
            <AlertDialog
                title={'Delete Image'}
                description={'Are you sure you want to delete this image?'}
                positiveButtonText={'Delete'}
                negativeButtonText={'Cancel'}
                positiveAction={() => {
                    removeImage(removeDialogOpen.imageId)
                    setRemoveDialogOpen({
                        open: false,
                        imageId: '',
                    })
                }}
                negativeAction={() => {
                    setRemoveDialogOpen({
                        open: false,
                        imageId: '',
                    })
                }}
                open={removeDialogOpen.open}
            />
        </div>
    )
}

export default ImagesScreen
