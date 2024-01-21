import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Container, Drawer, InputAdornment } from '@mui/material'
import { Mail } from '@mui/icons-material'

interface ProfileData {
    firstName: string
    lastName: string
    email: string
}

interface ProfileDrawerProps {
    open: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
    })

    const [avatarSrc, setAvatarSrc] = useState('https://i.pravatar.cc/150?img=3')

    useEffect(() => {
        fetch('https://source.unsplash.com/random/150x150').then((response) =>
            setAvatarSrc(response.url)
        )
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <Drawer anchor={'right'} open={open} onClose={onClose}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        padding: 3,
                        borderRadius: 2,
                    }}>
                    <Avatar
                        sx={{ m: 1, bgcolor: 'secondary.main', width: 150, height: 150 }}
                        src={avatarSrc}></Avatar>
                    <Typography component='h1' variant='h4' gutterBottom sx={{ mt: 2 }}>
                        {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' gutterBottom>
                        {profileData.email}
                    </Typography>

                    <Box component='form' sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='First Name'
                                    name='firstName'
                                    value={profileData.firstName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Last Name'
                                    name='lastName'
                                    value={profileData.lastName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position='start'
                                                style={{ marginRight: 8 }}>
                                                <Mail />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Drawer>
    )
}

export default ProfileDrawer
