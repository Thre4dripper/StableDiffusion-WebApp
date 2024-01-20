import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.tsx'
import NotFound404 from './screens/NotFound404.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import RegisterScreen from './screens/RegisterScreen.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import ProtectiveRoute from './components/ProtectiveRoute.tsx'
import ProfileScreen from './screens/ProfileScreen.tsx'

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
                                    <HomeScreen />
                                </ProtectiveRoute>
                            }
                        />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route
                            path='/profile'
                            element={
                                <ProtectiveRoute>
                                    <ProfileScreen />
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
