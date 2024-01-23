import React, { useRef } from 'react'
import { Container } from '@mui/material'
import Button from '@mui/material/Button'
import { centerCrop, convertToPixelCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Typography from '@mui/material/Typography'
import { setCanvasPreview } from '../utils/Utils.ts'

interface ImageCropFragmentProps {
    cropShape: 'rect' | 'round'
    aspect: number
    image: string | null
}

const ImageCropFragment: React.FC<ImageCropFragmentProps> = ({ cropShape, aspect, image }) => {
    const [crop, setCrop] = React.useState<Crop>()
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const onCropComplete = (crop: Crop) => {
        const { width, height } = imageRef.current!
        setCanvasPreview(
            imageRef.current!,
            canvasRef.current!,
            convertToPixelCrop(crop, width, height)
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

                <div className={'flex flex-row gap-4 justify-end items-center'}>
                    <Button variant='outlined' color='error'>
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
