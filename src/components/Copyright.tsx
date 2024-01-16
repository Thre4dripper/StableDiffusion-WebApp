import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Copyright: React.FC<any> = (props: any) => {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright