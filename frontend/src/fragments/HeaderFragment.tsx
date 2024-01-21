import React from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { MenuSharp } from '@mui/icons-material'
import Button from '@mui/material/Button'
import MainDrawer from '../components/drawers/MainDrawer.tsx'
import ProfileDrawer from '../components/drawers/ProfileDrawer.tsx'

const HeaderFragment: React.FC = () => {
    const [mainDrawerOpen, setMainDrawerOpen] = React.useState(false)
    const [profileDrawerOpen, setProfileDrawerOpen] = React.useState(false)

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={() => {
                        setMainDrawerOpen(true)
                    }}>
                    <MenuSharp />
                </IconButton>
                <Typography variant={'h6'} className={'text-white select-none'}>
                    Stable Diffusion Model
                </Typography>
                <div className={'flex-grow'} />
                <Button variant={'text'} color={'inherit'}>
                    Generated Images
                </Button>
                <Avatar
                    className={'cursor-pointer'}
                    sx={{ bgcolor: 'secondary.main', ml: 2 }}
                    onClick={() => {
                        setProfileDrawerOpen(true)
                    }}>
                    U
                </Avatar>
            </Toolbar>
            <MainDrawer open={mainDrawerOpen} onClose={() => setMainDrawerOpen(false)} />
            <ProfileDrawer open={profileDrawerOpen} onClose={() => setProfileDrawerOpen(false)} />
        </AppBar>
    )
}

export default HeaderFragment
