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
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store.ts'
import { AuthInitialState } from '../../redux/reducers/authReducer.ts'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useApi, { RequestMethod } from '../../hooks/useApi.ts'
import Loader from '../Loader.tsx'
import { useSnackbar } from 'notistack'

interface ProfileDrawerProps {
    open: boolean
    onClose: () => void
}

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
})

type FormValues = z.infer<typeof schema>
const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
    const { token, userData } = useSelector<RootState, AuthInitialState>((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
        },
    })

    const [avatarSrc, setAvatarSrc] = useState('https://i.pravatar.cc/150?img=3')

    useEffect(() => {
        fetch('https://source.unsplash.com/random/150x150').then((response) =>
            setAvatarSrc(response.url)
        )
    }, [])

    const { enqueueSnackbar } = useSnackbar()

    const { callApi, isLoading } = useApi({
        url: '/api/v1/profile',
        method: RequestMethod.PUT,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        callApi({
            body: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                profilePic: '',
            },
            token: token!,
            onSuccess: () => {
                enqueueSnackbar('Profile Updated', {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    preventDuplicate: true,
                })
                onClose()
            },
            onError: (error) => {
                console.log(error)
                enqueueSnackbar(error, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    preventDuplicate: true,
                })
            },
        })
    }

    return (
        <Drawer anchor={'right'} open={open} onClose={onClose}>
            <Container
                component='main'
                maxWidth='xs'
                sx={{
                    width: 500,
                }}>
                {isLoading ? (
                    <div className={'flex flex-col items-center justify-center h-screen'}>
                        <Loader />
                    </div>
                ) : (
                    <>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    sx={{
                                        m: 1,
                                        bgcolor: 'secondary.main',
                                        width: 150,
                                        height: 150,
                                    }}
                                    src={avatarSrc}></Avatar>
                                <Typography component='h1' variant='h4' gutterBottom sx={{ mt: 2 }}>
                                    {userData?.firstName} {userData?.lastName}
                                </Typography>
                                <Box sx={{ mt: 4 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label='First Name'
                                                {...register('firstName')}
                                                error={errors.firstName !== undefined}
                                                helperText={errors.firstName?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label='Last Name'
                                                {...register('lastName')}
                                                error={errors.lastName !== undefined}
                                                helperText={errors.lastName?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label='Email'
                                                {...register('email')}
                                                error={errors.email !== undefined}
                                                helperText={errors.email?.message}
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
                            <Box
                                sx={{
                                    marginTop: 4,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}>
                                <Button variant='outlined' color='error' sx={{ mr: 2 }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    startIcon={<Save />}
                                    type={'submit'}>
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Container>
        </Drawer>
    )
}

export default ProfileDrawer
