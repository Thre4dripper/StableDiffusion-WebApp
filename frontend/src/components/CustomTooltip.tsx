import React from 'react'
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'

interface Props extends React.ComponentProps<typeof Tooltip> {}

const CustomTooltip: React.FC<Props> = (props) => {
    const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#333d52',
            fontSize: '0.8rem',
            fontWeight: 600,
        },
    }))

    if (React.isValidElement(props.children)) {
        return <StyledTooltip {...props} children={props.children} />
    } else {
        return null // or return some default element
    }
}

export default CustomTooltip
