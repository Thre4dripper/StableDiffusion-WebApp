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

interface LdmCardProps {
    index: number
    setIsHovering: React.Dispatch<React.SetStateAction<boolean>>
}

const LdmCellCard: React.FC<LdmCardProps> = ({ index, setIsHovering }) => {
    const [open, setOpen] = React.useState(false)
    const { positivePrompt, negativePrompt } = useSelector<RootState, PromptsInitialState>(
        (state) => state.prompts[index]
    )
    const [image, setImage] = React.useState<string>('')

    const dispatch = useDispatch()

    const handlePositivePromptChange = (value: string) => {
        dispatch(setPositivePrompt(value, index))
    }

    const handleNegativePromptChange = (value: string) => {
        dispatch(setNegativePrompt(value, index))
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
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                    },
                                }}>
                                <div
                                    className={
                                        'w-48 h-full bg-slate-200 rounded-xl flex justify-center items-center'
                                    }>
                                    <AddPhotoAlternateIcon
                                        sx={{
                                            color: 'rgb(39,46,63)',
                                        }}
                                        fontSize={'large'}
                                    />
                                </div>
                            </IconButton>
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
                            setImage(image)
                            setOpen(true)
                        }}
                        index={index}
                    />
                </div>
            </Paper>
            <ZoomableImageDialog
                open={open}
                setOpen={setOpen}
                image={image}
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