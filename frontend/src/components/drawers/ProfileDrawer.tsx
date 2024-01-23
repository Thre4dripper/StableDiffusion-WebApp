import React from 'react'
import { Drawer } from '@mui/material'
import ProfileFragment from '../../fragments/ProfileFragment.tsx'
import ImageCropFragment from '../../fragments/ImageCropFragment.tsx'

interface ProfileDrawerProps {
    open: boolean
    onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
    const [browsedImage, setBrowsedImage] = React.useState<string | null>(null)

    return (
        <Drawer anchor={'right'} open={open} onClose={onClose}>
            {browsedImage ? (
                <ImageCropFragment image={browsedImage} cropShape={'round'} aspect={1} />
            ) : (
                <ProfileFragment onClose={onClose} setBrowsedImage={setBrowsedImage} />
            )}
        </Drawer>
    )
}

export default ProfileDrawer
