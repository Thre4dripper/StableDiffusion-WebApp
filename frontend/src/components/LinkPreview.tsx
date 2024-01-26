import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader.tsx'
import Typography from '@mui/material/Typography'

interface YouTubePreview {
    videoId: string
    videoThumbnail: string
}

interface WebsitePreview {
    title: string
    description: string
    image: string
}

type LinkPreviewData = YouTubePreview | WebsitePreview

interface LinkPreviewProps {
    originalLink: string
    proxyLink: string
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ originalLink, proxyLink }) => {
    const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: proxyLink,
                })
                const data = response.data

                const isYouTubeVideo = isYouTubeURL(originalLink)
                if (isYouTubeVideo) {
                    const videoId = extractYouTubeVideoId(originalLink)
                    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

                    setPreviewData({
                        videoId,
                        videoThumbnail,
                    })
                    setLoading(false)
                } else {
                    const parser = new DOMParser()
                    const doc = parser.parseFromString(data, 'text/html')
                    const title = doc.querySelector('title')?.textContent || ''
                    const description =
                        doc.querySelector('meta[name="description"]')?.getAttribute('content') || ''
                    const image =
                        doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                        ''

                    setPreviewData({
                        title,
                        description,
                        image,
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [originalLink, proxyLink])

    const isYouTubeURL = (url: string): boolean => {
        return url.includes('youtube.com') || url.includes('youtu.be')
    }

    const extractYouTubeVideoId = (url: string): string => {
        const videoIdRegex =
            /(?:\/embed\/|\/watch\?v=|\/(?:v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/
        const match = url.match(videoIdRegex)
        return match ? match[1] : ''
    }

    if (loading) {
        return (
            <div className={'flex justify-center items-center p-4'}>
                <Loader />
            </div>
        )
    }

    if (!previewData) {
        return (
            <div className={'flex justify-center items-center p-4'}>
                <Typography variant='h6' component='div'>
                    Unable to fetch link preview
                </Typography>
            </div>
        )
    }

    const handleClick = () => {
        window.open(originalLink, '_blank')
    }

    if ('videoId' in previewData) {
        return (
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img src={previewData.videoThumbnail} alt='Video Thumbnail' />
            </div>
        )
    }

    return (
        <div onClick={handleClick} className={'flex flex-col bg-slate-200/50 cursor-pointer'}>
            {previewData.image && <img src={previewData.image} alt='Link Preview' />}
            <div className={'flex m-4 flex-col gap-2'}>
                <span className={'text-md font-semibold text-gray-700 text-left'}>
                    {previewData.title}
                </span>
                <span className={'text-sm text-gray-700 text-left'}>{previewData.description}</span>
                <span className={'text-sm text-gray-400 text-left'}>{originalLink}</span>
            </div>
        </div>
    )
}

export default LinkPreview
