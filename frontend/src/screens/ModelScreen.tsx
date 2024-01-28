import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

enum Model {
    WIZ = 'Wiz Model',
    STABILITY = 'Stability API',
}

const cards = [
    {
        title: Model.WIZ,
        description:
            'Embark on a journey with the Wiz Model, a freely accessible Stable Diffusion Model. Unleash your creativity as you explore the possibilities it offers. Please note, while the Wiz Model is freely available to all users, the accuracy is not guaranteed.',
        link: 'https://www.wizmodel.com/',
    },
    {
        title: Model.STABILITY,
        description:
            'Dive into the advanced Stability API, powered by the latest SDXL Model. Experience top-notch accuracy and reliability in predicting molecular stability. The API is available for free with limited access, requiring your unique API key for full utilization.',
        link: 'https://platform.stability.ai/',
    },
]

const ModelScreen: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Model>(Model.WIZ)

    const handleCardClick = (title: Model) => {
        setSelectedCard(title)
    }

    return (
        <div className={'flex flex-col justify-center items-center gap-2 py-8'}>
            <Typography
                variant='h2'
                component='div'
                className={'text-slate-500'}
                style={{ fontSize: '36px', fontWeight: 'bold' }}>
                Select a Model
            </Typography>
            <div
                className={
                    'mx-4 md:mx-8 lg:mx-12 xl:mx-16 my-8 flex flex-col lg:flex-row justify-center items-center gap-8'
                }>
                {cards.map((card) => (
                    <Paper
                        key={card.title}
                        className={`px-8 py-4 cursor-pointer border-8 ${
                            selectedCard === card.title ? 'border-purple-500' : 'border-transparent'
                        }`}
                        elevation={selectedCard === card.title ? 8 : 2}
                        onClick={() => handleCardClick(card.title)}
                        sx={{
                            minHeight: '16rem',
                            transition: 'all 0.2s ease-in-out',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                        <Typography
                            variant='h4'
                            component='div'
                            className={'text-purple-500'}
                            style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {card.title}
                        </Typography>
                        <Typography
                            variant='body2'
                            align='justify'
                            className={'text-slate-600 font-semibold'}
                            style={{ fontSize: '16px' }}>
                            {card.description}
                        </Typography>
                        <Button
                            variant='outlined'
                            href={card.link}
                            sx={{
                                'color': '#a755f5',
                                'borderColor': '#a755f5',
                                '&:hover': {
                                    borderColor: '#a755f5',
                                    backgroundColor: '#a755f5',
                                    color: '#fff',
                                },
                            }}>
                            Learn More
                        </Button>
                    </Paper>
                ))}
            </div>
            <div className={'w-full flex justify-center items-center'}>
                {selectedCard === Model.WIZ ? (
                    <div
                        className={
                            'h-32 flex flex-col justify-center items-center gap-4 max-w-2xl mx-4 md:mx-8'
                        }>
                        <Typography
                            variant='body2'
                            align='justify'
                            className={'text-slate-400 font-semibold'}
                            style={{ fontSize: '20px' }}>
                            Please note, while the Wiz Model is freely available to all users, the
                            accuracy is not guaranteed. For a more accurate prediction, please use
                            the Stability API.
                        </Typography>
                        <Button
                            variant='outlined'
                            sx={{
                                'color': '#a755f5',
                                'borderColor': '#a755f5',
                                '&:hover': {
                                    borderColor: '#a755f5',
                                    backgroundColor: '#a755f5',
                                    color: '#fff',
                                },
                            }}
                            onClick={() => {
                                setSelectedCard(Model.STABILITY)
                            }}>
                            Switch to Stability API
                        </Button>
                    </div>
                ) : (
                    <div
                        className={
                            'h-32 flex flex-col justify-center items-center gap-8 w-full max-w-2xl mx-4 md:mx-8'
                        }>
                        <Button
                            variant='outlined'
                            sx={{
                                'color': '#a755f5',
                                'borderColor': '#a755f5',
                                '&:hover': {
                                    borderColor: '#a755f5',
                                    backgroundColor: '#a755f5',
                                    color: '#fff',
                                },
                            }}
                            href={'https://platform.stability.ai/docs/getting-started'}>
                            Get API Key
                        </Button>
                        <TextField
                            id='outlined-basic'
                            label='API Key'
                            variant='outlined'
                            className={'w-full'}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                },
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#a755f5',
                                },
                                '& .MuiFormLabel-root.Mui-focused': {
                                    color: '#a755f5',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: '#a755f5',
                                    },
                            }}
                        />
                    </div>
                )}
            </div>
            <div className={'w-full flex flex-row justify-end'}>
                <div className={'mx-4 md:mx-8 lg:mx-12 my-4 xl:mx-16'}>
                    <Button
                        variant='contained'
                        sx={{
                            'backgroundColor': '#a755f5',
                            '&:hover': {
                                backgroundColor: '#a755f5',
                                color: '#fff',
                            },
                        }}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ModelScreen
