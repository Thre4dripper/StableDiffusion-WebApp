import React from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Menu, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../redux/actions/authActions.ts'
import { Logout, Person2 } from '@mui/icons-material'

const HeaderFragment: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('token')
        dispatch(setToken(null))
        navigate('/login')
    }
    return (
        <div
            className={
                'w-full h-16 bg-gradient-to-b from-gray-700 from-5% via-slate-700 to-slate-800 flex items-center'
            }>
            <div className={'ml-8'}>
                <Typography variant={'h6'} className={'text-white select-none'}>
                    Stable Diffusion Model
                </Typography>
            </div>
            <div className={'flex-grow'} />
            <div className={'mr-8'}>
                <Avatar
                    className={'cursor-pointer'}
                    sx={{ bgcolor: 'secondary.main' }}
                    onClick={handleAvatarClick}>
                    U
                </Avatar>
            </div>
            <Menu
                open={open}
                onClose={() => {
                    setAnchorEl(null)
                }}
                anchorEl={anchorEl}>
                <MenuItem onClick={handleProfileClick}>
                    <Person2 className={'mr-2'} />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <Logout className={'mr-2'} />
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default HeaderFragment
