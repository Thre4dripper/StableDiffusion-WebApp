import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import Button from '@mui/material/Button'

interface ICircularProgressBarProps {
    value: number
    maxValue: number
    color: string
}

const CircularProgressBar: React.FC<ICircularProgressBarProps> = ({ value, maxValue, color }) => {
    const strokeWidth = 5
    const size = 50
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const animationDuration = 1500 // Set the duration in milliseconds
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
        <div className={'relative'}>
            <svg height={size} width={size}>
                <circle
                    stroke={'#e0e0e0'}
                    fill='transparent'
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    strokeDashoffset={0} // No offset for the gray circle
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeLinecap='round' // Rounded caps
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
                    strokeLinecap='round' // Rounded caps
                />
            </svg>
            <div
                className={'absolute flex flex-col justify-center items-center'}
                style={{ top: 0, left: 0, width: size, height: size }}>
                <span className={'text-gray-500'}>{Math.round(animatingValue)}</span>
            </div>
        </div>
    )
}

interface IGeneratedImageCardProps {
    image: string
    positivePrompt: string
    negativePrompt?: string
    dimensions: number[]
    samplingSteps: number
    cfgScale: number
    upScale: number
    date: string
    remove: () => void
}

const GeneratedImageCard: React.FC<IGeneratedImageCardProps> = ({
    image,
    positivePrompt,
    negativePrompt,
    dimensions,
    samplingSteps,
    cfgScale,
    upScale,
    date,
    remove,
}) => {
    return (
        <Card elevation={5}>
            <CardMedia
                component='img'
                alt='Generated Image'
                sx={{
                    height: 200,
                }}
                image={image}
            />
            <CardContent>
                <div className={'flex flex-row gap-2'}>
                    <Chip
                        label='Positive Prompt'
                        size='medium'
                        color='success'
                        variant={'outlined'}
                    />
                    <div className={'flex-grow'} />
                    <span className={'text-gray-500'}>{dimensions.join(' x ')}</span>
                </div>
                <Typography gutterBottom variant='h6' component='div'>
                    {positivePrompt}
                </Typography>
                {negativePrompt && (
                    <>
                        <Chip
                            label='Negative Prompt'
                            size='medium'
                            color='error'
                            variant={'outlined'}
                        />
                        <Typography gutterBottom variant='h6' component='div'>
                            {negativePrompt}s
                        </Typography>
                    </>
                )}
            </CardContent>
            <div className={'flex flex-row justify-evenly'}>
                <CircularProgressBar value={samplingSteps} maxValue={150} color={'#eb6b02'} />
                <CircularProgressBar value={cfgScale} maxValue={35} color={'#9b27af'} />
                <CircularProgressBar value={upScale} maxValue={4} color={'#0287d0'} />
            </div>
            <CardActions>
                <div>{date}</div>
                <div className={'flex-grow'} />
                <Button variant={'text'} color={'error'} onClick={remove}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default GeneratedImageCard
