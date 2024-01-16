import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.tsx'
import NotFound404 from './screens/NotFound404.tsx'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
