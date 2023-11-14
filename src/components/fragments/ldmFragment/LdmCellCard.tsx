import { IconButton, Paper } from '@mui/material'
import SizeControls from '../../controls/SizeControls.tsx'
import SamplingControls from '../../controls/SamplingControls.tsx'
import React from 'react'
import ZoomableImageDialog from '../../dialogs/ZoomableImageDialog.tsx'
import LdmCellPrompt from './LdmCellPrompt.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store.ts'
import { PromptsInitialState } from '../../../redux/reducers/promptsReducer.ts'
import { setNegativePrompt, setPositivePrompt } from '../../../redux/actions/promptsActions.ts'
import LdmCellOutputBox from './LdmCellOutputBox.tsx'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { CellType } from '../../../enums/CellType.ts'
import { setInputImage } from '../../../redux/actions/imagesActions.ts'

interface LdmCardProps {
    index: number
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
    cellType: CellType
}

const LdmCellCard: React.FC<LdmCardProps> = ({ index, setIsHovering, cellType }) => {
    const [open, setOpen] = React.useState(false)
    const [modalImage, setModalImage] = React.useState<string>('')

    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )
    const inputImage = useSelector<RootState, string>((state) => state.images[index].inputImage)
    const dispatch = useDispatch()

    const handlePositivePromptChange = (value: string) => {
        dispatch(setPositivePrompt(value, index))
    }

    const handleNegativePromptChange = (value: string) => {
        dispatch(setNegativePrompt(value, index))
    }

    const handleImageInput = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement
            if (target.files && target.files.length > 0) {
                const reader = new FileReader()
                reader.readAsDataURL(target.files[0])
                reader.onloadend = () => {
                    const base64data = reader.result
                    dispatch(setInputImage(base64data as string, index))
                }
            }
        }
        input.click()
    }

    return (
        <div>
            <Paper
                onMouseEnter={() => {
                    setIsHovering(true)
                }}
                onMouseLeave={() => {
                    setIsHovering(false)
                }}
                onMouseMove={() => {
                    setIsHovering(true)
                }}
                className={'flex-1 mx-16 my-8'}
                elevation={3}
                sx={{
                    borderRadius: '16px',
                }}>
                <div className={'flex flex-row'}>
                    {/*Whole Container*/}
                    <div className={'flex-1 flex flex-col my-2'}>
                        {/*Prompt and Image Container*/}
                        <div className={'flex-1 flex flex-row'}>
                            {/*Prompt Container*/}
                            <div className={'flex-1 flex flex-col justify-center gap-4 py-2'}>
                                <LdmCellPrompt
                                    value={positivePrompt}
                                    setValue={handlePositivePromptChange}
                                    promptType={'Positive'}
                                />
                                <LdmCellPrompt
                                    value={negativePrompt}
                                    setValue={handleNegativePromptChange}
                                    promptType={'Negative'}
                                />
                            </div>
                            {/*Input Image Container*/}
                            {cellType === CellType.IMAGE_TO_IMAGE && (
                                <IconButton
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                        },
                                    }}
                                    onClick={handleImageInput}>
                                    <div
                                        className={
                                            'w-48 h-full bg-slate-200 rounded-xl overflow-hidden flex justify-center items-center'
                                        }>
                                        {inputImage && (
                                            <img
                                                src={inputImage}
                                                alt={'Latent Diffusion Model'}
                                                className={'w-48 h-48'}
                                            />
                                        )}
                                        {inputImage === '' && (
                                            <AddPhotoAlternateIcon
                                                sx={{
                                                    color: 'rgb(39,46,63)',
                                                }}
                                                fontSize={'large'}
                                            />
                                        )}
                                    </div>
                                </IconButton>
                            )}
                        </div>
                        {/*Controls Container*/}
                        <div className={'flex flex-row'}>
                            <SizeControls index={index} />
                            <SamplingControls index={index} />
                        </div>
                    </div>
                    {/*Output Container*/}
                    <LdmCellOutputBox
                        openImageDialog={(image: string) => {
                            setModalImage(image)
                            setOpen(true)
                        }}
                        index={index}
                        cellType={cellType}
                    />
                </div>
            </Paper>
            <ZoomableImageDialog
                open={open}
                setOpen={setOpen}
                image={modalImage}
                zoomIntensity={10}
                delay={0.2}
                initialZoomLevel={1}
                minZoomLevel={1}
                maxZoomLevel={2.5}
            />
        </div>
    )
}

export default LdmCellCard