import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material'
import Image1 from '../../assets/text-to-image.png' // Replace with actual paths
import Image2 from '../../assets/image-to-image.png' // Replace with actual paths

interface AddCellDialogProps {
    openAddCellDialog: 'openedFromAbove' | 'openedFromBelow' | 'closed'
    onClose: () => void
    addCellAbove: (index: number) => void
    addCellBelow: (index: number) => void
    index: number
}

const options = [
    {
        label: 'Text to Image',
        value: 'image',
        image: Image1,
    },
    {
        label: 'Image to Image',
        value: 'text',
        image: Image2,
    },
]

const AddCellDialog: React.FC<AddCellDialogProps> = ({
    openAddCellDialog,
    onClose,
    addCellAbove,
    addCellBelow,
    index,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>('')

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
    }

    const handleDialogConfirm = () => {
        if (selectedOption === 'image') {
            // Add image cell
            if (openAddCellDialog === 'openedFromAbove') {
                //TODO specify cell type
                addCellAbove(index)
            } else if (openAddCellDialog === 'openedFromBelow') {
                addCellBelow(index)
            }
        } else if (selectedOption === 'text') {
            // Add text cell
            if (openAddCellDialog === 'openedFromAbove') {
                addCellAbove(index)
            } else if (openAddCellDialog === 'openedFromBelow') {
                addCellBelow(index)
            }
        }
        onClose()
    }

    useEffect(() => {
        setSelectedOption('')
        return () => {
            setSelectedOption('')
        }
    }, [])

    return (
        <Dialog
            open={
                openAddCellDialog === 'openedFromAbove' || openAddCellDialog === 'openedFromBelow'
            }
            onClose={onClose}
            maxWidth={'lg'}>
            <DialogContent>
                <FormControl component='fieldset'>
                    <FormLabel component='legend'>Select Option</FormLabel>
                    <RadioGroup
                        className={'mx-16 mt-8'}
                        aria-label='option'
                        name='option'
                        value={selectedOption}>
                        <Grid container spacing={4}>
                            {options.map((option, index) => (
                                <Grid item key={index}>
                                    <Paper
                                        elevation={selectedOption === option.value ? 3 : 0}
                                        onClick={() => handleOptionClick(option.value)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '1rem',
                                            borderRadius: '2rem',
                                            backgroundColor:
                                                selectedOption === option.value
                                                    ? '#e0eaff'
                                                    : 'white',
                                        }}>
                                        <IconButton>
                                            <img
                                                src={option.image}
                                                alt={`Option ${option.value}`}
                                                width='200'
                                                height='200'
                                            />
                                        </IconButton>
                                    </Paper>
                                    <Typography
                                        variant='body1'
                                        align='center'
                                        sx={{
                                            margin: '1rem 0.5rem',
                                        }}>
                                        {option.label}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDialogConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCellDialog
