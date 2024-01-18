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
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState({
        value: '',
        error: '',
    })
    const [lastName, setLastName] = useState({
        value: '',
        error: '',
    })
    const [email, setEmail] = useState({
        value: '',
        error: '',
    })
    const [password, setPassword] = useState({
        value: '',
        error: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (firstName.value === '') {
            setFirstName((prevState) => {
                return {
                    ...prevState,
                    error: 'First name is required',
                }
            })
        }

        if (lastName.value === '') {
            setLastName((prevState) => {
                return {
                    ...prevState,
                    error: 'Last name is required',
                }
            })
        }

        if (email.value === '') {
            setEmail((prevState) => {
                return {
                    ...prevState,
                    error: 'Email is required',
                }
            })
        } else if (!email.value.includes('@')) {
            setEmail((prevState) => {
                return {
                    ...prevState,
                    error: 'Invalid email address',
                }
            })
        }

        if (password.value.length < 6) {
            setPassword((prevState) => {
                return {
                    ...prevState,
                    error: 'Password must be at least 6 characters',
                }
            })
        }

        if (
            [firstName.value, lastName.value, email.value, password.value].some(
                (item) => item === ''
            )
        ) {
            return
        }

        console.log(firstName.value, lastName.value, email.value, password.value)
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
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='given-name'
                                name='firstName'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                autoFocus
                                value={firstName.value}
                                onChange={(e) =>
                                    setFirstName((prevState) => {
                                        const value = e.target.value
                                        return {
                                            ...prevState,
                                            value,
                                            touched: true,
                                            error: value === '' ? 'First name is required' : '',
                                        }
                                    })
                                }
                                error={firstName.error !== ''}
                                helperText={firstName.error}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoComplete='family-name'
                                value={lastName.value}
                                onChange={(e) =>
                                    setLastName((prevState) => {
                                        const value = e.target.value
                                        return {
                                            ...prevState,
                                            value,
                                            touched: true,
                                            error: value === '' ? 'Last name is required' : '',
                                        }
                                    })
                                }
                                error={lastName.error !== ''}
                                helperText={lastName.error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                value={email.value}
                                onChange={(e) => {
                                    setEmail((prevState) => {
                                        const value = e.target.value
                                        let error: string
                                        if (value === '') {
                                            error = 'Email is required'
                                        } else if (!value.includes('@')) {
                                            error = 'Invalid email address'
                                        } else {
                                            error = ''
                                        }
                                        return {
                                            ...prevState,
                                            value,
                                            touched: true,
                                            error,
                                        }
                                    })
                                }}
                                error={email.error !== ''}
                                helperText={email.error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
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
                                value={password.value}
                                onChange={(e) =>
                                    setPassword((prevState) => {
                                        const value = e.target.value
                                        return {
                                            ...prevState,
                                            value,
                                            touched: true,
                                            error:
                                                value.length < 6
                                                    ? 'Password must be at least 6 characters'
                                                    : '',
                                        }
                                    })
                                }
                                error={password.error !== ''}
                                helperText={password.error}
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
