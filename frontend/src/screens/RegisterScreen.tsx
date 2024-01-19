import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../components/Copyright.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import Loader from '../components/Loader.tsx'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { setToken, setUserData } from '../redux/actions/authActions.ts'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof schema>
const Register: React.FC = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const { callApi: registerUser, isLoading } = useApi({
        url: '/api/v1/user/register',
        method: RequestMethod.POST,
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        registerUser({
            body: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            },
            onSuccess: (response) => {
                enqueueSnackbar('Successfully registered', {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    preventDuplicate: true,
                })
                const token = response?.data?.data?.tokens?.accessToken
                const user = {
                    firstName: response?.data?.data?.firstName,
                    lastName: response?.data?.data?.lastName,
                    email: response?.data?.data?.email,
                    id: response?.data?.data?._id,
                }

                dispatch(setToken(token))
                dispatch(setUserData(user))
                localStorage.setItem('token', token)
                navigate('/login')
            },
            onError: (error) => {
                console.log(error)
                enqueueSnackbar('Email Already Used', {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
            },
        })
    }

    if (isLoading) {
        return (
            <div className={'flex h-screen w-screen justify-center items-center'}>
                <Loader />
            </div>
        )
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='given-name'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                autoFocus
                                {...register('firstName')}
                                error={errors.firstName !== undefined}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                autoComplete='family-name'
                                {...register('lastName')}
                                error={errors.lastName !== undefined}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                autoComplete='email'
                                {...register('email')}
                                error={errors.email !== undefined}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                autoComplete='new-password'
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge='end'>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                {...register('password')}
                                error={errors.password !== undefined}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link to={'/login'} className={'underline'}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default Register
