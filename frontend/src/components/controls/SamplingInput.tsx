import React from 'react'
import CustomSmoothSlider from '../sliders/CustomSmoothSlider.tsx'
import { Input } from '@mui/material'

interface SamplingInputProps {
    sliderProps: React.ComponentProps<typeof CustomSmoothSlider>
    label: string
    isMarked: boolean
    setValue: (value: number) => void
}

const SamplingInput: React.FC<SamplingInputProps> = ({
    sliderProps,
    label,
    isMarked,
    setValue,
}) => {
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+event.target.value)
    }
    return (
        <div>
            <label className={'text-black text-md'}>{label}</label>
            <div className={'flex flex-row gap-6'}>
                <CustomSmoothSlider
                    {...sliderProps}
                    aria-label={label}
                    marks={isMarked}
                    onChange={handleSliderChange}
                />
                <Input
                    className={'w-20'}
                    value={sliderProps.value}
                    inputProps={{
                        'min': sliderProps.min,
                        'max': sliderProps.max,
                        'type': 'number',
                        'aria-labelledby': label,
                    }}
                    onChange={handleInputChange}
                    color={sliderProps.color}
                />
            </div>
        </div>
    )
}

export default SamplingInput
