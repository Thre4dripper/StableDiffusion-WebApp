import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

interface ZoomableImageDialogProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    image: string
    zoomIntensity: number
    delay: number
    initialZoomLevel: number
    minZoomLevel: number
    maxZoomLevel: number
}

const ZoomableImageDialog: React.FC<ZoomableImageDialogProps> = ({
    open,
    setOpen,
    image,
    zoomIntensity,
    delay,
    initialZoomLevel,
    minZoomLevel,
    maxZoomLevel,
}) => {
    const [zoomLevel, setZoomLevel] = useState<number>(initialZoomLevel)
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const handleCloseDialog = () => {
        setOpen(false)
        setZoomLevel(1)
        setPosition({ x: 0, y: 0 })
    }

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.deltaY < 0) {
            setZoomLevel((prevZoom) => Math.min(prevZoom + zoomIntensity / 10, maxZoomLevel))
        } else {
            setZoomLevel((prevZoom) => Math.max(prevZoom - zoomIntensity / 10, minZoomLevel))
        }

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const xPercent = x / rect.width
        const yPercent = y / rect.height
        setPosition({ x: xPercent, y: yPercent })
    }

    const debouncedSetPosition = debounce(
        (xPercent: number, yPercent: number) => {
            setPosition({ x: xPercent, y: yPercent })
        },
        10 // Adjust the debounced delay as needed
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const xPercent = x / rect.width || 0 // Ensure a default value of 0
        const yPercent = y / rect.height || 0 // Ensure a default value of 0
        debouncedSetPosition(xPercent, yPercent)
    }

    useEffect(() => {
        const preventDefault = (e: WheelEvent) => e.preventDefault()
        if (open) {
            window.addEventListener('wheel', preventDefault, { passive: false })
        } else {
            window.removeEventListener('wheel', preventDefault)
        }

        // Cleanup the debounced function when the component unmounts
        return () => {
            window.removeEventListener('wheel', preventDefault)
            debouncedSetPosition.cancel()
        }
    }, [open, debouncedSetPosition])

    return (
        <div
            className={`z-50 fixed inset-0 flex items-center justify-center ${
                open ? 'block' : 'hidden'
            } bg-black bg-opacity-50`}
            onClick={handleCloseDialog}>
            <div
                className={'w-[35rem] h-fit bg-slate-700 rounded-2xl shadow-lg shadow-slate-800/50'}
                onWheel={handleWheel}
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
                    transition: `all ${delay}s ease-out`,
                }}>
                <img
                    src={image}
                    alt={'Latent Diffusion Model'}
                    className={'w-full h-full rounded-2xl'}
                />
            </div>
        </div>
    )
}

export default ZoomableImageDialog
