import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.tsx'
import NotFound404 from './screens/NotFound404.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import RegisterScreen from './screens/RegisterScreen.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme()
const App: React.FC = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
