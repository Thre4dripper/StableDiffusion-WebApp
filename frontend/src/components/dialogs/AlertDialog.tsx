import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'

interface AlertDialogProps {
    title: string
    description: string
    open: boolean
    positiveButtonText: string
    negativeButtonText: string
    positiveAction: () => void
    negativeAction: () => void
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    title,
    description,
    open,
    positiveButtonText,
    negativeButtonText,
    positiveAction,
    negativeAction,
}) => {
    return (
        <Dialog
            open={open}
            onClose={negativeAction}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={negativeAction}>{negativeButtonText}</Button>
                <Button onClick={positiveAction} autoFocus>
                    {positiveButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
