import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Copyright: React.FC<any> = (props: any) => {
    const origin = window.location.origin
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' to={`${origin}/about`} className={'underline'}>
                Ijlal Ahmad & Ebadul Islam
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright
