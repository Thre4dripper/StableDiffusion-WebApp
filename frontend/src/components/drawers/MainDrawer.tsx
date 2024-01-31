import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { AutoAwesome, FaceRetouchingNatural, Info } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface MainDrawerProps {
    open: boolean
    onClose: () => void
}

const MainDrawer: React.FC<MainDrawerProps> = ({ open, onClose }) => {
    const navigate = useNavigate()

    const navigateToModel = () => {
        navigate('/model')
        onClose()
    }

    const navigateToGeneratedImages = () => {
        navigate('/generated-images')
        onClose()
    }

    const navigateToAbout = () => {
        navigate('/about')
        onClose()
    }

    return (
        <Drawer
            anchor={'left'}
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={navigateToModel}>
                        <ListItemIcon>
                            <FaceRetouchingNatural />
                        </ListItemIcon>
                        <ListItemText primary='AI Model' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={navigateToGeneratedImages}>
                        <ListItemIcon>
                            <AutoAwesome />
                        </ListItemIcon>
                        <ListItemText primary='Generated Images' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={navigateToAbout}>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MainDrawer
