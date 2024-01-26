import React from 'react'
import Image1 from '../assets/login-page-images/login_image1.webp'
import Box from '@mui/material/Box'
import { Card, CardContent, Grow } from '@mui/material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import LinkPreview from '../components/LinkPreview.tsx'
import Link from '@mui/material/Link'

const AboutScreen: React.FC = () => {
    const links = [
        {
            originalLink: 'https://github.com/Stability-AI/stablediffusion',
            proxyLink: '/github/Stability-AI/stablediffusion',
        },
        {
            originalLink: 'https://github.com/CompVis/stable-diffusion',
            proxyLink: '/github/CompVis/stable-diffusion',
        },
        {
            originalLink: 'https://github.com/woctezuma/stable-diffusion-colab',
            proxyLink: '/github/woctezuma/stable-diffusion-colab',
        },
    ]

    return (
        <div className={'flex flex-col justify-center items-center'}>
            <Box className={'w-full h-96 overflow-hidden flex justify-center items-center'}>
                <img
                    src={Image1}
                    alt='login_image1'
                    className={'w-full h-full object-cover'}
                    style={{ maskImage: 'linear-gradient(to top, transparent, black 100%)' }}
                />
            </Box>
            <div className={'w-2/3 -mt-40 z-10'}>
                <Grow in timeout={1000}>
                    <Card
                        sx={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            boxShadow: 5,
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
            <Typography variant='h4' component='div' mt={10}>
                Featured Repositories
            </Typography>
            <div className={'grid grid-cols-3 gap-8 my-10 mx-16'}>
                {links.map((link) => (
                    <Grow in timeout={1000} key={link.originalLink}>
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
                            <LinkPreview
                                originalLink={link.originalLink}
                                proxyLink={link.proxyLink}
                            />
                        </Paper>
                    </Grow>
                ))}
            </div>
        </div>
    )
}

export default AboutScreen
