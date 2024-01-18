import React from 'react'
import { Paper } from '@mui/material'
import SamplingInput from './SamplingInput.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store.ts'
import { SamplingInitialState } from '../../redux/reducers/smaplingReducer.ts'
import { setCfgScale, setSamplingSteps, setUpScale } from '../../redux/actions/samplingActions.ts'

interface SamplingControlsProps {
    index: number
}

const SamplingControls: React.FC<SamplingControlsProps> = ({ index }) => {
    const { samplingSteps, cfgScale, upScale } = useSelector<RootState, SamplingInitialState>(
        (state) => state.sampling[index]
    )

    const dispatch = useDispatch()
    return (
        <Paper
            className={'flex-1 mx-4 my-2 p-2'}
            elevation={3}
            sx={{
                borderRadius: '20px',
                backgroundColor: '#fff4d7',
            }}>
            <div className={'flex flex-col justify-between px-8 gap-0.5'}>
                <SamplingInput
                    sliderProps={{
                        value: samplingSteps,
                        min: 1,
                        max: 150,
                        valueLabelDisplay: 'auto',
                        color: 'warning',
                        step: 1,
                    }}
                    label='Sampling Steps'
                    setValue={(value) => {
                        dispatch(setSamplingSteps(value, index))
                    }}
                    isMarked={false}
                />
                <SamplingInput
                    sliderProps={{
                        value: cfgScale,
                        min: 1,
                        max: 35,
                        valueLabelDisplay: 'auto',
                        color: 'secondary',
                        step: 1,
                    }}
                    label='CFG Scale'
                    setValue={(value) => {
                        dispatch(setCfgScale(value, index))
                    }}
                    isMarked={true}
                />
                <SamplingInput
                    sliderProps={{
                        value: upScale,
                        min: 1,
                        max: 4,
                        valueLabelDisplay: 'auto',
                        color: 'info',
                        step: 0.1,
                    }}
                    label='Upscale By'
                    setValue={(value) => {
                        dispatch(setUpScale(value, index))
                    }}
                    isMarked={true}
                />
            </div>
        </Paper>
    )
}

export default SamplingControls