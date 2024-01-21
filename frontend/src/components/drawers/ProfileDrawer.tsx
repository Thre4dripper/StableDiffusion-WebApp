import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Container, Drawer, InputAdornment } from '@mui/material'
import { Mail, Save } from '@mui/icons-material'
import Button from '@mui/material/Button'

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
                <div
                    className={
                        'flex flex-col items-center bg-orange-300 rounded-3xl mx-16 mt-4 ' +
                        'shadow-md shadow-black/40 select-none'
                    }>
                    <Typography
                        component='h1'
                        variant='h5'
                        sx={{
                            padding: 1,
                        }}>
                        Profile
                    </Typography>
                </div>
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
            {/*    save and cancel buttons*/}
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                <Button variant='outlined' color='error' sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button variant='contained' color='warning' startIcon={<Save />}>
                    Save
                </Button>
            </Box>
        </Drawer>
    )
}

export default ProfileDrawer
