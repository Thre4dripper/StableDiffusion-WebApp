import React, { useEffect, useRef, useState } from 'react'
import GeneratedImageCard from '../components/GeneratedImageCard.tsx'
import Loader from '../components/Loader.tsx'
import Grow from '@mui/material/Grow'

const ImagesScreen: React.FC = () => {
    const [images, setImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const observerTarget = useRef(null)

    const randomImage = () => {
        const randomWidth = Math.floor(Math.random() * 10) + 300
        const randomHeight = Math.floor(Math.random() * 10) + 300
        return `https://picsum.photos/${randomWidth}/${randomHeight}`
    }

    const observeIntersection = () => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setIsLoading(true)
                    // Simulate fetching more images from an API
                    setTimeout(() => {
                        setImages((prevImages) => [
                            ...prevImages,
                            randomImage(),
                            randomImage(),
                            randomImage(),
                            randomImage(),
                        ])
                        setIsLoading(false)
                    }, 500) // Simulated delay, replace with actual fetch logic
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

    useEffect(observeIntersection, [isLoading])

    return (
        <div className={'flex flex-col gap-4 my-8 mx-8 md:mx-10 lg:mx-14 xl:mx-16'}>
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
                {images.map((image, index) => {
                    const growDelay = Math.random() * (2000 - 500) + 500
                    return (
                        <Grow in timeout={growDelay} key={index}>
                            <div>
                                <GeneratedImageCard
                                    image={image}
                                    positivePrompt={'Cat'}
                                    dimensions={[100, 200]}
                                    samplingSteps={100}
                                    cfgScale={10}
                                    upScale={1}
                                    date={'awfa'}
                                    remove={() => {}}
                                />
                            </div>
                        </Grow>
                    )
                })}
            </div>
            <div ref={observerTarget} className={'flex flex-row my-40 justify-center'}>
                {isLoading && <Loader />}
            </div>
        </div>
    )
}

export default ImagesScreen
