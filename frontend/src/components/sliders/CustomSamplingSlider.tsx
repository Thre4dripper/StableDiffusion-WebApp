import React from 'react'
import { Slider, useTheme } from '@mui/material'

interface CustomSamplingSliderProps extends React.ComponentProps<typeof Slider> {}

const CustomSamplingSlider: React.FC<CustomSamplingSliderProps> = (props) => {
    const theme = useTheme()

    //get color value from props.color using theme.palette
    const color = theme.palette[props.color!].main
    return (
        <Slider
            {...props}
            sx={{
                '& .MuiSlider-valueLabel': {
                    'lineHeight': 1.2,
                    'fontSize': 12,
                    'background': 'unset',
                    'padding': 0,
                    'width': 32,
                    'height': 32,
                    'borderRadius': '50% 50% 50% 0',
                    'backgroundColor': `${color}`,
                    'transformOrigin': 'bottom left',
                    'transform': 'translate(50%, -100%) rotate(-45deg) scale(0)',
                    '&:before': { display: 'none' },
                    '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                    },
                    '& > *': {
                        transform: 'rotate(45deg)',
                    },
                },
            }}
        />
    )
}

export default CustomSamplingSlider