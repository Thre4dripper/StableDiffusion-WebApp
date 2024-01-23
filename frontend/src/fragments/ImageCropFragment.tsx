import React, { useRef } from 'react'
import { Container } from '@mui/material'
import Button from '@mui/material/Button'
import { centerCrop, convertToPixelCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Typography from '@mui/material/Typography'
import { CropRotate } from '@mui/icons-material'
import CustomSmoothSlider from '../components/sliders/CustomSmoothSlider.tsx'

interface ImageCropFragmentProps {
    cropShape: 'rect' | 'round'
    aspect: number
    image: string | null
}

const ImageCropFragment: React.FC<ImageCropFragmentProps> = ({ cropShape, aspect, image }) => {
    const [crop, setCrop] = React.useState<Crop>()
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [rotation, setRotation] = React.useState(0)

    const onCropComplete = (crop: Crop) => {
        const { width, height } = imageRef.current!
        setCanvasPreview(
            imageRef.current!,
            canvasRef.current!,
            convertToPixelCrop(crop, width, height),
            rotation
        )
    }

    const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            aspect,
            width,
            height
        )

        setCrop(centerCrop(crop, width, height))
    }

    const setCanvasPreview = (
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        crop: Crop,
        rotation: number
    ) => {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            return
        }

        const pixelRatio = window.devicePixelRatio
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = crop.width * pixelRatio * scaleX
        canvas.height = crop.height * pixelRatio * scaleY

        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        // ctx.translate((-crop.width * scaleX) / 2, (-crop.height * scaleY) / 2)
        ctx.translate(-cropX, -cropY)

        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        )

        ctx.restore()
    }

    return (
        <Container
            component='main'
            maxWidth='xs'
            sx={{
                width: 500,
            }}>
            <div className={'flex flex-col gap-4 justify-center my-8'}>
                <div className={'flex flex-col gap-4 justify-center items-center'}>
                    <div
                        className={
                            'flex flex-col items-center bg-orange-400 rounded-3xl px-4 ' +
                            'shadow-md shadow-black/40 select-none'
                        }>
                        <Typography
                            component='h1'
                            variant='h5'
                            sx={{
                                padding: 1,
                                color: 'white',
                            }}>
                            Preview
                        </Typography>
                    </div>
                    <canvas
                        ref={canvasRef}
                        className={'border-2 border-slate-300 rounded-full w-40 h-40'}
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <ReactCrop
                    onChange={(_, percentageCrop) => {
                        setCrop(percentageCrop)
                    }}
                    onComplete={onCropComplete}
                    circularCrop={cropShape === 'round'}
                    crop={crop}
                    aspect={aspect}>
                    <img src={image ?? ''} alt={''} ref={imageRef} onLoad={onImageLoaded} />
                </ReactCrop>
                {/*Controls*/}
                <div className={'flex flex-row gap-8 justify-center items-center mt-8'}>
                    <CropRotate />
                    <CustomSmoothSlider
                        value={rotation}
                        min={0}
                        max={360}
                        valueLabelDisplay='auto'
                        color='warning'
                        step={1}
                        onChange={(_event: Event, newValue: number | number[]) => {
                            const value = newValue as number
                            setRotation(value)
                            setCanvasPreview(
                                imageRef.current!,
                                canvasRef.current!,
                                convertToPixelCrop(
                                    crop!,
                                    imageRef.current!.width,
                                    imageRef.current!.height
                                ),
                                value
                            )
                        }}
                    />
                </div>
                <div className={'flex flex-row gap-4 justify-end items-center'}>
                    <Button variant='outlined' color='warning'>
                        Cancel
                    </Button>
                    <Button variant='contained' color='warning'>
                        Confirm
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default ImageCropFragment
