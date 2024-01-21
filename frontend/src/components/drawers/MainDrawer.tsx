import React from 'react'
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { AutoAwesome, FaceRetouchingNatural, Info, Logout } from '@mui/icons-material'

interface MainDrawerProps {
    open: boolean
    onClose: () => void
}

const MainDrawer: React.FC<MainDrawerProps> = ({ open, onClose }) => {
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
                    <ListItemButton>
                        <ListItemIcon>
                            <FaceRetouchingNatural />
                        </ListItemIcon>
                        <ListItemText primary='AI Model' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AutoAwesome />
                        </ListItemIcon>
                        <ListItemText primary='Generated Images' />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default MainDrawer
