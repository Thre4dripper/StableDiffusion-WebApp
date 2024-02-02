import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grow from '@mui/material/Grow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import LinkPreview from '../components/LinkPreview.tsx'
import Link from '@mui/material/Link'
import image1 from '../assets/login-page-images/login_image1.webp'
import image2 from '../assets/login-page-images/login_image2.webp'
import image3 from '../assets/login-page-images/login_image3.png'
import image4 from '../assets/login-page-images/login_image4.png'
import image5 from '../assets/login-page-images/login_image5.jpg'
import image6 from '../assets/login-page-images/login_image6.jpg'
import image7 from '../assets/login-page-images/login_image7.png'
import image8 from '../assets/login-page-images/login_image8.webp'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import Loader from '../components/Loader.tsx'

const images = [image1, image2, image3, image4, image5, image6, image7, image8]

const links = [
    'https://github.com/Stability-AI/stablediffusion',
    'https://github.com/CompVis/stable-diffusion',
    'https://github.com/camenduru/stable-diffusion-webui-colab',
]

interface LinkPreviewData {
    title: string
    description: string
    image: string
}

const AboutScreen: React.FC = () => {
    const image = images[Math.floor(Math.random() * images.length)]

    const [previews, setPreviews] = useState<LinkPreviewData[]>([])

    const { isLoading, isFailed, isSuccess, callApi } = useApi({
        url: '/api/v1/link-preview',
        method: RequestMethod.POST,
    })

    useEffect(() => {
        callApi({
            body: { urls: links },
            onSuccess: (response) => {
                console.log(response)
                response?.data?.data.forEach((data: LinkPreviewData) => {
                    setPreviews((prev) => [
                        ...prev,
                        {
                            title: data.title,
                            description: data.description,
                            image: data.image,
                        },
                    ])
                })
            },
            onError: (error) => {
                console.error(error)
            },
        })
    }, [callApi])

    return (
        <div className={'flex flex-col justify-center items-center'}>
            <Box
                className={
                    'w-full h-[20rem] md:h-[40rem] overflow-hidden flex justify-center items-center'
                }>
                <img
                    src={image}
                    alt='login_image1'
                    className={'w-full h-full object-cover'}
                    style={{ maskImage: 'linear-gradient(to top, transparent, black 100%)' }}
                />
            </Box>
            <div className={'w-full md:w-2/3 -mt-[10rem] md:-mt-[32rem] z-10'}>
                <Grow in timeout={1000}>
                    <Card
                        sx={{
                            'padding': '1.5rem',
                            'textAlign': 'center',
                            'boxShadow': 5,
                            'backgroundColor': 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                                backgroundColor: 'white',
                            },
                        }}>
                        <CardContent>
                            <Typography variant='h4' component='div' mb={2}>
                                About
                            </Typography>
                            <Typography
                                variant='body1'
                                color='text.secondary'
                                paragraph
                                textAlign={'justify'}>
                                This project is a part of my college minor project. The Model is
                                more capable of doing what is shown in this web app. The model is
                                capable of generating images from text, images from images, images
                                from videos, videos from images, videos from text, videos from
                                videos and many more. The model is also capable of generating images
                                and videos in different resolutions.
                            </Typography>
                            <Typography
                                variant='body1'
                                color='text.secondary'
                                paragraph
                                textAlign={'justify'}>
                                Our web application, an evolved iteration of a college minor
                                project, is a testament to our dedication to generative art and the
                                exploration of cutting-edge research. Embracing the principles of
                                SDM, as detailed in the paper
                                <Link href='https://arxiv.org/abs/2307.01952'>
                                    {' '}
                                    "Stable Diffusion Models"
                                </Link>
                                , we've harnessed its potential to breathe life into mesmerizing
                                images.
                            </Typography>
                            <Typography
                                variant='body1'
                                color='text.secondary'
                                paragraph
                                textAlign={'justify'}>
                                Immerse yourself in the artistic possibilities as you experiment
                                with prompts and witness the enchanting dance of creativity guided
                                by artificial intelligence. Whether you're an art enthusiast or
                                simply curious about the intersection of technology and art, our
                                project invites you to explore, create, and be inspired.
                            </Typography>
                        </CardContent>
                        <Typography variant='body2' color='text.secondary' className={'text-right'}>
                            ~ Made by Ijlal Ahmad and Ebadul Islam Farooqi
                        </Typography>
                    </Card>
                </Grow>
            </div>
            <Typography variant='h4' component='div' mt={6}>
                Featured Repositories
            </Typography>
            {isLoading && (
                <div className={'flex justify-center items-center p-4'}>
                    <Loader />
                </div>
            )}
            {isFailed && (
                <div className={'flex justify-center items-center p-4'}>
                    <Typography variant='h6' component='div'>
                        Unable to fetch link preview
                    </Typography>
                </div>
            )}
            {isSuccess && (
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-8 my-10 mx-4 lg:mx-16'}>
                    {previews.map((preview, index) => (
                        <Grow in timeout={1000} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    'textAlign': 'center',
                                    'boxShadow': 4,
                                    'overflow': 'hidden',
                                    '&:hover': {
                                        boxShadow: 16,
                                    },
                                }}>
                                <LinkPreview url={links[index]} {...preview} />
                            </Paper>
                        </Grow>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AboutScreen
