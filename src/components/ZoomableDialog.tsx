import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

interface ZoomableDialogProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    image: string
}

const ZoomableDialog: React.FC<ZoomableDialogProps> = ({ open, setOpen, image }) => {
    const [zoomLevel, setZoomLevel] = useState<number>(1)
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const handleCloseDialog = () => {
        setOpen(false)
        setZoomLevel(1)
        setPosition({ x: 0, y: 0 })
    }

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY < 0) {
            setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2.5))
        } else {
            setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 1))
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
        // Cleanup the debounced function when the component unmounts
        return () => {
            debouncedSetPosition.cancel()
        }
    }, [debouncedSetPosition])

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center ${
                open ? 'block' : 'hidden'
            } bg-black bg-opacity-50`}
            onClick={handleCloseDialog}>
            <div
                className={
                    'w-[35rem] h-[35rem] bg-slate-700 rounded-md transition-transform ease-in-out'
                }
                onWheel={handleWheel}
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
                    transition: `all 0.5s ease-out`,
                }}>
                <img
                    src={image}
                    alt={'Latent Diffusion Model'}
                    className={'w-full h-full rounded-md'}
                />
            </div>
        </div>
    )
}

export default ZoomableDialog
