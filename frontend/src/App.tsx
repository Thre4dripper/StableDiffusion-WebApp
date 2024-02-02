import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.tsx'
import NotFound404 from './screens/NotFound404.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import RegisterScreen from './screens/RegisterScreen.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import ProtectiveRoute from './components/ProtectiveRoute.tsx'
import Wrapper from './components/Wrapper.tsx'
import AboutScreen from './screens/AboutScreen.tsx'
import ImagesScreen from './screens/ImagesScreen.tsx'
import ModelScreen from './screens/ModelScreen.tsx'
import axios from 'axios'

const defaultTheme = createTheme()
const App: React.FC = () => {
    axios.defaults.baseURL = import.meta.env.PROD
        ? import.meta.env.VITE_REMOTE_API_URL
        : import.meta.env.VITE_LOCAL_API_URL
    return (
        <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider maxSnack={4}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <ProtectiveRoute requireAuth>
                                    <Wrapper>
                                        <HomeScreen />
                                    </Wrapper>
                                </ProtectiveRoute>
                            }
                        />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route
                            path='/generated-images'
                            element={
                                <ProtectiveRoute requireAuth>
                                    <Wrapper>
                                        <ImagesScreen />
                                    </Wrapper>
                                </ProtectiveRoute>
                            }
                        />
                        <Route
                            path='/model'
                            element={
                                <ProtectiveRoute requireAuth>
                                    <Wrapper>
                                        <ModelScreen />
                                    </Wrapper>
                                </ProtectiveRoute>
                            }
                        />
                        <Route
                            path='/about'
                            element={
                                <ProtectiveRoute requireAuth={false}>
                                    <Wrapper>
                                        <AboutScreen />
                                    </Wrapper>
                                </ProtectiveRoute>
                            }
                        />
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
