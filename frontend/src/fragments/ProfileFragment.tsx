import React from 'react'
import Loader from '../components/Loader.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Badge, Container, IconButton, InputAdornment } from '@mui/material'
import { Edit, Mail, Save } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useSnackbar } from 'notistack'
import useApi, { RequestMethod } from '../hooks/useApi.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
import { AuthInitialState } from '../redux/reducers/authReducer.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { fileToBase64 } from '../utils/Utils.ts'

interface ProfileFragmentProps {
    onCancel: () => void
    setBrowsedImage: React.Dispatch<React.SetStateAction<string | null>>
    profileImage: string | null
}

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
})

type FormValues = z.infer<typeof schema>
const ProfileFragment: React.FC<ProfileFragmentProps> = ({
    onCancel,
    setBrowsedImage,
    profileImage,
}) => {
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

    const { enqueueSnackbar } = useSnackbar()

    const { callApi, isLoading } = useApi({
        url: '/api/v1/profile',
        method: RequestMethod.PUT,
    })

    const browseProfilePic = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (event) => {
            const target = event.target as HTMLInputElement
            const file: File = (target.files as FileList)[0]
            const base64 = await fileToBase64(file)
            setBrowsedImage(base64)
        }
        input.click()
    }

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
                onCancel()
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
                            'flex flex-col items-center bg-orange-400 rounded-3xl mx-16 mt-4 ' +
                            'shadow-md shadow-black/40 select-none'
                        }>
                        <Typography
                            component='h1'
                            variant='h5'
                            sx={{
                                padding: 1,
                                color: 'white',
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
                            <Badge
                                overlap={'circular'}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <div className={'bg-white rounded-full'}>
                                        <IconButton
                                            color='warning'
                                            aria-label='upload picture'
                                            component='span'
                                            sx={{
                                                borderRadius: '50%',
                                                padding: 1,
                                                boxShadow: 2,
                                            }}
                                            onClick={browseProfilePic}>
                                            <Edit />
                                        </IconButton>
                                    </div>
                                }>
                                <Avatar
                                    sx={{
                                        m: 1,
                                        width: 150,
                                        height: 150,
                                    }}
                                    src={profileImage ?? userData?.profilePic ?? ''}
                                />
                            </Badge>
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
                            <Button
                                variant='outlined'
                                color='warning'
                                sx={{ mr: 2 }}
                                onClick={onCancel}>
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
    )
}

export default ProfileFragment