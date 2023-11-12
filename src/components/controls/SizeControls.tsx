import React from 'react'
import { Paper } from '@mui/material'
import CustomSlider from '../CustomSlider.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { DimensionsInitialState } from '../../redux/reducers/dimensionsReducer.ts'
import { setHeight, setWidth } from '../../redux/actions/dimensionsActions.ts'
import { RootState } from '../../redux/store.ts'

const marks = [
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
]

const labelFormat = (value: number) => {
    return marks.find((mark) => mark.value === value)?.label || undefined
}
const SizeControls: React.FC = () => {
    const { width, height } = useSelector<RootState, DimensionsInitialState>(
        (state) => state.dimensions
    )

    const widthValue = marks.find((mark) => +mark.label === width)?.value || 0
    const heightValue = marks.find((mark) => +mark.label === height)?.value || 0

    const dispatch = useDispatch()

    const handleWidthChange = (_event: Event, newValue: number | number[]) => {
        const value = marks.find((mark) => mark.value === (newValue as number))?.label || '0'
        dispatch(setWidth(+value))
    }

    const handleHeightChange = (_event: Event, newValue: number | number[]) => {
        const value = marks.find((mark) => mark.value === (newValue as number))?.label || '0'
        dispatch(setHeight(+value))
    }

    return (
        <Paper
            className={'flex-1 mx-4 my-2 p-2'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#e2ffe7',
            }}>
            <div className={'flex flex-col justify-between px-8 gap-4'}>
                <div className={'flex flex-col'}>
                    <label className={'text-black text-md'}>Width</label>
                    <CustomSlider
                        valueLabelDisplay='auto'
                        valueLabelFormat={labelFormat}
                        aria-label='pretto slider'
                        marks={marks}
                        value={widthValue}
                        onChange={handleWidthChange}
                        step={null}
                    />
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-black text-md'}>Height</label>
                    <CustomSlider
                        valueLabelDisplay='auto'
                        aria-label='pretto slider'
                        value={heightValue}
                        valueLabelFormat={labelFormat}
                        step={null}
                        onChange={handleHeightChange}
                        marks={marks}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default SizeControls