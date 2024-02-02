import React from 'react'

interface LinkPreviewProps {
    url: string
    title: string
    description: string
    image: string
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, title, description, image }) => {
    const handleClick = () => {
        window.open(url, '_blank')
    }

    return (
        <div onClick={handleClick} className={'flex flex-col bg-slate-200/50 cursor-pointer'}>
            {image && <img src={image} alt='Link Preview' />}
            <div className={'flex m-4 flex-col gap-2'}>
                <span className={'text-md font-semibold text-gray-700 text-left'}>{title}</span>
                <span className={'text-sm text-gray-700 text-left'}>{description}</span>
                <span className={'text-sm text-gray-400 text-left'}>{url}</span>
            </div>
        </div>
    )
}

export default LinkPreview
