import React from 'react'
import CustomSamplingSlider from '../sliders/CustomSamplingSlider.tsx'
import { Input } from '@mui/material'

interface SamplingInputProps extends React.ComponentProps<typeof CustomSamplingSlider> {
    label: string
    isMarked: boolean
    setValue: (value: number) => void
}

const SamplingInput: React.FC<SamplingInputProps> = (props) => {
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        props.setValue(newValue as number)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(+event.target.value)
    }
    return (
        <div className={'mx-4 my-2'}>
            <label className={'text-black text-md'}>{props.label}</label>
            <div className={'flex flex-row gap-6'}>
                <CustomSamplingSlider
                    {...props}
                    aria-label={props.label}
                    marks={props.isMarked}
                    onChange={handleSliderChange}
                />
                <Input
                    className={'w-20'}
                    value={props.value}
                    inputProps={{
                        'min': props.min,
                        'max': props.max,
                        'type': 'number',
                        'aria-labelledby': props.label,
                    }}
                    onChange={handleInputChange}
                    color={props.color}
                />
            </div>
        </div>
    )
}

export default SamplingInput