import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Paper,
    RadioGroup,
    Typography,
} from '@mui/material'
import Image1 from '../../assets/text-to-image.png' // Replace with actual paths
import Image2 from '../../assets/image-to-image.png'
import { AddCellDialogState } from '../../enums/AddCellDialogState.ts'
import { CellType } from '../../enums/CellType.ts' // Replace with actual paths

interface AddCellDialogProps {
    openAddCellDialog: AddCellDialogState
    onClose: () => void
    addCellAbove: (index: number, cellType: CellType) => void
    addCellBelow: (index: number, cellType: CellType) => void
    index: number
}

const options = [
    {
        label: 'Text to Image',
        value: CellType.TEXT_TO_IMAGE,
        image: Image1,
    },
    {
        label: 'Image to Image',
        value: CellType.IMAGE_TO_IMAGE,
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
    const [selectedOption, setSelectedOption] = useState<CellType | null>(null)

    const handleOptionClick = (option: CellType) => {
        setSelectedOption(option)
    }

    const handleDialogConfirm = () => {
        if (selectedOption === CellType.TEXT_TO_IMAGE) {
            // Add image cell
            if (openAddCellDialog === AddCellDialogState.OPENED_FROM_ABOVE) {
                addCellAbove(index, CellType.TEXT_TO_IMAGE)
            } else if (openAddCellDialog === AddCellDialogState.OPENED_FROM_BELOW) {
                addCellBelow(index, CellType.TEXT_TO_IMAGE)
            }
        } else if (selectedOption === CellType.IMAGE_TO_IMAGE) {
            // Add text cell
            if (openAddCellDialog === AddCellDialogState.OPENED_FROM_ABOVE) {
                addCellAbove(index, CellType.IMAGE_TO_IMAGE)
            } else if (openAddCellDialog === AddCellDialogState.OPENED_FROM_BELOW) {
                addCellBelow(index, CellType.IMAGE_TO_IMAGE)
            }
        }
        onClose()
    }

    useEffect(() => {
        setSelectedOption(null)
        return () => {
            setSelectedOption(null)
        }
    }, [openAddCellDialog])

    return (
        <Dialog
            open={
                openAddCellDialog === AddCellDialogState.OPENED_FROM_ABOVE ||
                openAddCellDialog === AddCellDialogState.OPENED_FROM_BELOW
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
