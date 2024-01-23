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
    const [profileImage, setProfileImage] = React.useState<string | null>(null)

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={() => {
                setBrowsedImage(null)
                setProfileImage(null)
                onClose()
            }}>
            {browsedImage ? (
                <ImageCropFragment
                    image={browsedImage}
                    cropShape={'round'}
                    aspect={1}
                    outputSize={{ width: 300, height: 300 }}
                    onCancel={() => setBrowsedImage(null)}
                    onConfirmed={(image) => {
                        setProfileImage(image)
                        setBrowsedImage(null)
                    }}
                />
            ) : (
                <ProfileFragment
                    onCancel={() => {
                        setProfileImage(null)
                        onClose()
                    }}
                    setBrowsedImage={setBrowsedImage}
                    profileImage={profileImage}
                />
            )}
        </Drawer>
    )
}

export default ProfileDrawer
