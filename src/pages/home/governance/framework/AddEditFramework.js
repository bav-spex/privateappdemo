import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import EditFrame from './edit'

const AddEditFrameWorks = ({ open, handleClose, operation }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add FrameWorks</DialogTitle>
        <DialogContent operation={operation}>
          <EditFrame />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddEditFrameWorks
