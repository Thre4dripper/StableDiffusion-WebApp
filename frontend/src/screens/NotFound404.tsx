import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

import image1 from '../assets/login-page-images/login_image1.webp'
import image2 from '../assets/login-page-images/login_image2.webp'
import image3 from '../assets/login-page-images/login_image3.png'
import image4 from '../assets/login-page-images/login_image4.png'
import image5 from '../assets/login-page-images/login_image5.jpg'
import image6 from '../assets/login-page-images/login_image6.jpg'
import image7 from '../assets/login-page-images/login_image7.png'
import image8 from '../assets/login-page-images/login_image8.webp'
import { ArrowBack } from '@mui/icons-material'

const images = [image1, image2, image3, image4, image5, image6, image7, image8]

const NotFound404: React.FC = () => {
    const image = images[Math.floor(Math.random() * images.length)]

    return (
        <Box sx={{ height: '100vh' }}>
            <Grid container className='min-h-full bg-white lg:flex'>
                <Grid item xs={12} lg={4} className='flex flex-col justify-end items-center'>
                    <Box sx={{ maxWidth: 'lg' }} className={'flex flex-col gap-4'}>
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight: 'bold',
                            }}
                            className='text-indigo-600'>
                            404
                        </Typography>
                        <Typography
                            variant='h2'
                            className='text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                            Page not found
                        </Typography>
                        <Typography variant='body1' className='text-base leading-7 text-gray-600'>
                            Sorry, we couldn’t find the page you’re looking for.
                        </Typography>
                        <Link href='/' underline={'none'} className='text-indigo-600'>
                            <div className='flex items-center gap-2'>
                                <ArrowBack className='' />
                                <span className={'font-semibold'}>Go back home</span>
                            </div>
                        </Link>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={0}
                    lg={8}
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    className={'relative'}>
                    <div className='absolute inset-0 bg-gradient-to-r from-white to-transparent' />
                    <img src={image} alt='' className='object-cover w-full h-screen' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default NotFound404
