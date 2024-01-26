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

const defaultTheme = createTheme()
const App: React.FC = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider maxSnack={4}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <ProtectiveRoute>
                                    <Wrapper>
                                        <HomeScreen />
                                    </Wrapper>
                                </ProtectiveRoute>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <Wrapper>
                                    <LoginScreen />
                                </Wrapper>
                            }
                        />
                        <Route
                            path='/register'
                            element={
                                <Wrapper>
                                    <RegisterScreen />
                                </Wrapper>
                            }
                        />
                        <Route
                            path='/about'
                            element={
                                <ProtectiveRoute>
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
