import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Copyright from '../components/Copyright.tsx'
import { Link } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import image1 from '../assets/login-page-images/login_image1.webp'
import image2 from '../assets/login-page-images/login_image2.webp'
import image3 from '../assets/login-page-images/login_image3.png'
import image4 from '../assets/login-page-images/login_image4.png'
import image5 from '../assets/login-page-images/login_image5.jpg'
import image6 from '../assets/login-page-images/login_image6.jpg'
import image7 from '../assets/login-page-images/login_image7.png'
import image8 from '../assets/login-page-images/login_image8.webp'


const images = [image1, image2, image3, image4, image5, image6, image7, image8]
const LoginScreen: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false)

    const image = images[Math.floor(Math.random() * images.length)]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            autoComplete='current-password'
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={''} className={'underline'}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/register'} className={'underline'}>
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LoginScreen