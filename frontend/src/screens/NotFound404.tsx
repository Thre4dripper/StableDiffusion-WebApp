import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { keyframes } from '@mui/system'
import { useNavigate } from 'react-router-dom'

const NotFound404: React.FC = () => {
    const navigate = useNavigate()
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const handleGoBack = () => {
        setIsButtonClicked(true)
        setTimeout(() => {
            setIsButtonClicked(false)
            navigate('/')
        }, 1000)
    }

    const bounce = keyframes`
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0);
        }
    `
    const shake = keyframes`
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        50% {
            transform: translateX(5px);
        }
        75% {
            transform: translateX(-5px);
        }
        100% {
            transform: translateX(0);
        }
    `
    const fadeIn = keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                animation: `${fadeIn} 2s`,
            }}>
            <Container maxWidth='md'>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='h1' sx={{ animation: `${bounce} 2s infinite` }}>
                            404
                        </Typography>
                        <Typography variant='h4'>
                            Oops! Looks like you're lost in the digital wilderness.
                        </Typography>
                        <Typography variant='body1'>
                            The page you're searching for seems to have vanished into the virtual
                            abyss. Don't worry; let's get you back on track.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleGoBack}
                            sx={{
                                'animation': isButtonClicked
                                    ? `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`
                                    : 'none',
                                '&:hover': { transform: 'scale(1.1)' },
                                'marginTop': 2,
                            }}>
                            Take Me Home
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Replace the SVG image URL with your own creative illustration */}
                        <img
                            src='https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg'
                            alt='Creative Illustration'
                            width={500}
                            height={250}
                            style={{ animation: `${bounce} 5s infinite` }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default NotFound404
