import { IconButton, Paper } from '@mui/material'
import SizeControls from '../controls/SizeControls.tsx'
import SamplingControls from '../controls/SamplingControls.tsx'
import React from 'react'
import ZoomableImageDialog from '../dialogs/ZoomableImageDialog.tsx'
import CellPrompt from './CellPrompt.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store.ts'
import { PromptsInitialState } from '../../redux/reducers/promptsReducer.ts'
import { setNegativePrompt, setPositivePrompt } from '../../redux/actions/promptsActions.ts'
import CellOutputBox from './CellOutputBox.tsx'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { CellType } from '../../enums/CellType.ts'
import { setInputImage } from '../../redux/actions/imagesActions.ts'
import { Model } from '../../redux/reducers/authReducer.ts'
import CustomTooltip from '../CustomTooltip.tsx'

interface CellCardProps {
    index: number
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
    cellType: CellType
}

const CellCard: React.FC<CellCardProps> = ({ index, setIsHovering, cellType }) => {
    const [open, setOpen] = React.useState(false)
    const [modalImage, setModalImage] = React.useState<string>('')

    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )
    const selectedModel = useSelector<RootState, Model>(
        (state) => state.auth.userData?.model ?? Model.WIZ_MODEL
    )

    const inputImage = useSelector<RootState, File | null>(
        (state) => state.images[index].inputImage
    )
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
                dispatch(setInputImage(target.files[0], index))
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
                className={'flex-1 mx-4 md:mx-8 lg:mx-16 my-8'}
                elevation={3}
                sx={{
                    borderRadius: '16px',
                }}>
                <div
                    className={
                        'grid gap-4 p-4 ' +
                        'grid-cols-1 grid-rows-11 ' +
                        'lg:grid-cols-7 lg:grid-rows-6 ' +
                        'xl:grid-cols-11 xl:grid-rows-4'
                    }>
                    {/*Prompt and Image Container*/}
                    <div
                        className={
                            'row-span-2 ' +
                            'lg:col-span-7 lg:row-span-2 ' +
                            'xl:col-span-8 xl:row-span-2 ' +
                            'flex flex-row gap-4'
                        }>
                        {/*Prompt Container*/}
                        <div className={'flex-1 flex flex-col justify-center gap-4'}>
                            <CellPrompt
                                value={positivePrompt}
                                setValue={handlePositivePromptChange}
                                promptType={'Positive'}
                            />
                            <CellPrompt
                                value={negativePrompt}
                                setValue={handleNegativePromptChange}
                                promptType={'Negative'}
                            />
                        </div>
                        {/*Input Image Container*/}
                        {cellType === CellType.IMAGE_TO_IMAGE && (
                            <IconButton
                                onClick={handleImageInput}
                                sx={{
                                    'borderRadius': '1rem',
                                    'padding': '0',
                                    'overflow': 'hidden',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                    },
                                }}>
                                <div
                                    className={
                                        'w-40 lg:w-52 h-full bg-slate-200 rounded-xl overflow-hidden flex justify-center items-center'
                                    }>
                                    {inputImage && (
                                        <img
                                            src={URL.createObjectURL(inputImage)}
                                            alt={'Latent Diffusion Model'}
                                            className={'w-full h-full'}
                                        />
                                    )}
                                    {inputImage === null && (
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
                    <CustomTooltip
                        title={
                            selectedModel === Model.STABILITY_AI &&
                            cellType === CellType.IMAGE_TO_IMAGE
                                ? 'Size controls are disabled for Stability AI Image-to-Image models, ' +
                                  'The size of the output image is determined by the size of the input image.'
                                : ''
                        }
                        placement={'bottom'}>
                        <div
                            style={{
                                opacity:
                                    selectedModel === Model.STABILITY_AI &&
                                    cellType === CellType.IMAGE_TO_IMAGE
                                        ? 0.7
                                        : 1,
                            }}
                            className={
                                'row-span-2 row-start-3 ' +
                                'lg:col-span-4 lg:row-span-2 lg:row-start-3 ' +
                                'xl:col-span-4 xl:row-span-2 xl:col-start-1 xl:row-start-3'
                            }>
                            <div
                                className={'w-full h-full'}
                                style={{
                                    pointerEvents:
                                        selectedModel === Model.STABILITY_AI &&
                                        cellType === CellType.IMAGE_TO_IMAGE
                                            ? 'none'
                                            : 'auto',
                                }}>
                                <SizeControls index={index} />
                            </div>
                        </div>
                    </CustomTooltip>
                    <div
                        className={
                            'row-span-2 row-start-5 ' +
                            'lg:col-span-4 lg:row-span-2 lg:col-start-1 lg:row-start-5 ' +
                            'xl:col-span-4 xl:row-span-2 xl:col-start-5 xl:row-start-3'
                        }>
                        <SamplingControls index={index} />
                    </div>
                    {/*Output Container*/}
                    <div
                        className={
                            'row-span-5 row-start-7 ' +
                            'lg:col-span-3 lg:row-span-4 lg:col-start-5 lg:row-start-3 ' +
                            'xl:col-span-3 xl:row-span-4 xl:col-start-9 xl:row-start-1'
                        }>
                        <CellOutputBox
                            openImageDialog={(image: string) => {
                                setModalImage(image)
                                setOpen(true)
                            }}
                            index={index}
                            cellType={cellType}
                        />
                    </div>
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

export default CellCard
