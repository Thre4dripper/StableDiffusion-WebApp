import { Paper } from '@mui/material'
import SizeControls from '../../controls/SizeControls.tsx'
import SamplingControls from '../../controls/SamplingControls.tsx'
import React from 'react'
import ZoomableImageDialog from '../../ZoomableImageDialog.tsx'
import LdmCellPrompt from './LdmCellPrompt.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store.ts'
import { PromptsInitialState } from '../../../redux/reducers/promptsReducer.ts'
import { setNegativePrompt, setPositivePrompt } from '../../../redux/actions/promptsActions.ts'
import LdmCellOutputBox from './LdmCellOutputBox.tsx'

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
                <div className={'flex flex-row h-full items-center'}>
                    {/*Attributes*/}
                    <div className={'flex-1 flex flex-col'}>
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
                        {/*Controls controls*/}
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