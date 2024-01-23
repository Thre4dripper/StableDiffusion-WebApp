import React from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { AppBar, IconButton, Toolbar, Zoom } from '@mui/material'
import { AutoAwesome, FaceRetouchingNatural, Info, MenuSharp } from '@mui/icons-material'
import MainDrawer from '../components/drawers/MainDrawer.tsx'
import ProfileDrawer from '../components/drawers/ProfileDrawer.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import CustomTooltip from '../components/CustomTooltip.tsx'

const HeaderFragment: React.FC = () => {
    const [mainDrawerOpen, setMainDrawerOpen] = React.useState(false)
    const [profileDrawerOpen, setProfileDrawerOpen] = React.useState(false)

    const { userData } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    const getInitials = () => {
        let initials = ''
        if (userData?.firstName) {
            initials += userData.firstName[0]
        }
        if (userData?.lastName) {
            initials += userData.lastName[0]
        }
        return initials
    }

    return (
        <AppBar position='static'>
            <Toolbar className={'flex flex-row gap-4'}>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                    onClick={() => {
                        setMainDrawerOpen(true)
                    }}>
                    <MenuSharp />
                </IconButton>
                <Typography variant='h6' noWrap component='div'>
                    Stable Diffusion Model
                </Typography>
                <div className={'flex-grow'} />

                <div className={'hidden sm:block'}>
                    <CustomTooltip title={'Generated Images'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'}>
                            <AutoAwesome />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title={'AI Model'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'}>
                            <FaceRetouchingNatural />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title={'About'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'}>
                            <Info />
                        </IconButton>
                    </CustomTooltip>
                </div>

                <Avatar
                    className={'cursor-pointer'}
                    sx={{ bgcolor: 'secondary.main' }}
                    src={userData?.profilePic}
                    onClick={() => {
                        setProfileDrawerOpen(true)
                    }}>
                    {getInitials()}
                </Avatar>
            </Toolbar>
            <MainDrawer open={mainDrawerOpen} onClose={() => setMainDrawerOpen(false)} />
            <ProfileDrawer open={profileDrawerOpen} onClose={() => setProfileDrawerOpen(false)} />
        </AppBar>
    )
}

export default HeaderFragment
