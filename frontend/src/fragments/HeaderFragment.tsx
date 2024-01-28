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
import { useNavigate } from 'react-router-dom'

interface IHeaderFragmentProps {
    toolbarColor: string
}

const HeaderFragment: React.FC<IHeaderFragmentProps> = ({ toolbarColor }) => {
    const [mainDrawerOpen, setMainDrawerOpen] = React.useState(false)
    const [profileDrawerOpen, setProfileDrawerOpen] = React.useState(false)

    const { userData } = useSelector<RootState, AuthInitialState>((state) => state.auth)

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToGeneratedImages = () => {
        navigate('/generated-images')
    }
    const navigateToModel = () => {
        navigate('/model')
    }
    const navigateToAbout = () => {
        navigate('/about')
    }

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
        <AppBar position='fixed'>
            <Toolbar
                className={'flex flex-row gap-4'}
                sx={{
                    backgroundColor: toolbarColor,
                    color: 'white',
                }}>
                <div className={'block sm:hidden'}>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={() => {
                            setMainDrawerOpen(true)
                        }}>
                        <MenuSharp />
                    </IconButton>
                </div>
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    onClick={navigateToHome}
                    sx={{
                        cursor: 'pointer',
                    }}>
                    Stable Diffusion Model
                </Typography>
                <div className={'flex-grow'} />

                <div
                    className={
                        'hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    }>
                    <CustomTooltip title={'Generated Images'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'} onClick={navigateToGeneratedImages}>
                            <AutoAwesome />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title={'AI Model'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'} onClick={navigateToModel}>
                            <FaceRetouchingNatural />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title={'About'} TransitionComponent={Zoom}>
                        <IconButton color={'inherit'} onClick={navigateToAbout}>
                            <Info />
                        </IconButton>
                    </CustomTooltip>
                </div>
                <div className={'flex-grow'} />

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
