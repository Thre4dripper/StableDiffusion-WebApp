import React from 'react'
import { Paper } from '@mui/material'
import CustomMarksSlider from '../sliders/CustomMarksSlider.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { DimensionsInitialState } from '../../redux/reducers/dimensionsReducer.ts'
import { setHeight, setWidth } from '../../redux/actions/dimensionsActions.ts'
import { RootState } from '../../redux/store.ts'
import { Model } from '../../redux/reducers/authReducer.ts'

const marks = {
    [Model.WIZ_MODEL]: [
        {
            value: 0,
            label: '32',
        },
        {
            value: 20,
            label: '64',
        },
        {
            value: 40,
            label: '128',
        },
        {
            value: 60,
            label: '256',
        },
        {
            value: 80,
            label: '512',
        },
        {
            value: 100,
            label: '1024',
        },
    ],
    [Model.STABILITY_AI]: [
        {
            value: 0,
            label: '320',
        },
        {
            value: 20,
            label: '448',
        },
        {
            value: 40,
            label: '640',
        },
        {
            value: 60,
            label: '896',
        },
        {
            value: 80,
            label: '1280',
        },
        {
            value: 100,
            label: '1536',
        },
    ],
}

const labelFormat = (value: number, model: Model) => {
    return marks[model].find((mark) => mark.value === value)?.label || undefined
}

interface SizeControlsProps {
    index: number
}

const SizeControls: React.FC<SizeControlsProps> = ({ index }) => {
    const { width, height } = useSelector<RootState, DimensionsInitialState>(
        (state) => state.dimensions[index]
    )

    const selectedModel = useSelector<RootState, Model>(
        (state) => state.auth.userData?.model ?? Model.WIZ_MODEL
    )

    const widthValue = marks[selectedModel].find((mark) => +mark.label === width)?.value || 0
    const heightValue = marks[selectedModel].find((mark) => +mark.label === height)?.value || 0

    const dispatch = useDispatch()
    const handleWidthChange = (_event: Event, newValue: number | number[]) => {
        const value =
            marks[selectedModel].find((mark) => mark.value === (newValue as number))?.label || '0'
        dispatch(setWidth(+value, index))
    }

    const handleHeightChange = (_event: Event, newValue: number | number[]) => {
        const value =
            marks[selectedModel].find((mark) => mark.value === (newValue as number))?.label || '0'
        dispatch(setHeight(+value, index))
    }

    return (
        <Paper
            className={'flex-1 p-2 h-full'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#e2ffe7',
            }}>
            <div className={'h-full flex flex-col justify-center px-8 gap-2'}>
                <div className={' flex flex-col'}>
                    <label className={'text-black text-md'}>Width</label>
                    <CustomMarksSlider
                        valueLabelDisplay='auto'
                        valueLabelFormat={(value) => labelFormat(value, selectedModel)}
                        aria-label='pretto slider'
                        marks={marks[selectedModel]}
                        value={widthValue}
                        onChange={handleWidthChange}
                        step={null}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-black text-md'}>Height</label>
                    <CustomMarksSlider
                        valueLabelDisplay='auto'
                        aria-label='pretto slider'
                        value={heightValue}
                        valueLabelFormat={(value) => labelFormat(value, selectedModel)}
                        step={null}
                        onChange={handleHeightChange}
                        marks={marks[selectedModel]}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default SizeControls
