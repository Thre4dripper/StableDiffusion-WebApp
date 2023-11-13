import React, { useEffect } from 'react'
import { Button, CircularProgress, IconButton } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import DownloadIcon from '@mui/icons-material/Download'
import useApi from '../../../hooks/useApi.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store.ts'

interface LdmCellOutputBoxProps {
    openImageDialog: (image: string) => void
    index: number
}

const LdmCellOutputBox: React.FC<LdmCellOutputBoxProps> = ({ openImageDialog, index }) => {
    const positivePrompt = useSelector<RootState, string>(
        (state) => state.prompts[index].positivePrompt
    )

    const [image, setImage] = React.useState<string | null>(null)

    const { data, isLoading, callApi } = useApi({
        url: '/sdapi/v1/txt2img',
        method: 'POST',
        body: {
            prompt: positivePrompt,
            steps: 100,
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${import.meta.env.VITE_WIZMODEL_API_KEY}`,
        },
    })

    const generateImage = () => {
        //TODO positive prompt is empty
        if (positivePrompt === '') return
        callApi()
    }

    useEffect(() => {
        // base64 to image
        if (data === null) return
        const parsedImage = `data:image/png;base64,${data.data?.images[0]}`
        setImage(parsedImage)
    }, [data])

    console.log(data)
    return (
        <div className={'rounded-br-2xl rounded-tr-2xl'}>
            <div className={'flex flex-col justify-end'}>
                <IconButton
                    className={'flex-1'}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => {
                        if (image !== null) openImageDialog(image)
                    }}>
                    {!isLoading && image && (
                        <img
                            src={image}
                            alt={'Latent Diffusion Model'}
                            className={'w-96 h-96 rounded-2xl'}
                        />
                    )}

                    {!isLoading && !image && (
                        <div
                            className={
                                'w-96 h-96 bg-slate-400 rounded-2xl flex justify-center items-center'
                            }>
                            <ImageIcon />
                        </div>
                    )}

                    {isLoading && (
                        <div className={'flex w-96 h-96 justify-center items-center'}>
                            <CircularProgress />
                        </div>
                    )}
                </IconButton>
                {/*Button*/}
                <div className={'h-16 flex justify-center items-center gap-4'}>
                    <Button
                        variant={'contained'}
                        sx={{
                            'backgroundColor': '#24282f',
                            '&:hover': {
                                backgroundColor: '#5d799d',
                            },
                        }}
                        onClick={generateImage}>
                        Generate
                    </Button>
                    <Button
                        variant={'outlined'}
                        startIcon={<DownloadIcon />}
                        sx={{
                            'borderColor': '#24282f',
                            'color': '#24282f',
                            '&:hover': {
                                borderColor: '#5d799d',
                                color: '#5d799d',
                            },
                        }}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LdmCellOutputBox