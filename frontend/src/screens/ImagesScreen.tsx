import React, { useCallback, useEffect, useRef, useState } from 'react'
import GeneratedImageCard from '../components/GeneratedImageCard.tsx'
import Loader from '../components/Loader.tsx'
import Grow from '@mui/material/Grow'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import { useSelector } from 'react-redux'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import { RootState } from '../redux/store.ts'

interface ImageData {
    userId: string
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
    const [images, setImages] = useState<ImageData[]>([])
    const [totalImages, setTotalImages] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)

    const { token } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    const { callApi, isLoading } = useApi({
        url: `/api/v1/images?limit=4&offset=${offset}`,
        method: RequestMethod.GET,
    })

    const fetchImages = useCallback(async () => {
        callApi({
            body: null,
            token: token!,
            onSuccess: (response) => {
                console.log(response)
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

    //first time call
    useEffect(() => {
        fetchImages().then()
    }, [])

    const observerTarget = useRef(null)
    const observeIntersection = () => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
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
    }

    useEffect(observeIntersection, [fetchImages, isLoading])

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
                                <GeneratedImageCard {...image} remove={() => {}} />
                            </div>
                        </Grow>
                    )
                })}
            </div>
            {(images.length < totalImages || isLoading) && (
                <div ref={observerTarget} className={'flex flex-row my-40 justify-center'}>
                    {isLoading && <Loader />}
                </div>
            )}
        </div>
    )
}

export default ImagesScreen
