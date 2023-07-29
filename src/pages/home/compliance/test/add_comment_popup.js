import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { FormControl, TextField, Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import authConfig from 'src/configs/auth'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core/styles'
import { addComment, getAssessmentInfoById } from 'src/pages/home/complaince/test/complaince_service'

function SimpleDialog(props) {
  const { onClose, selectedValue, open, assessment_id, set_comment_list_state } = props

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const handleClose = () => {
    onClose(selectedValue)
  }

  const [new_comment, set_new_comment] = useState('')

  const add_comment = async () => {
    let successCallback = response => {
      handleClose()
      toast.success('Comment added Successfully')
      getAssessmentInfoById(
        assessment_id,
        'comments',
        () => {},
        response => {
          set_comment_list_state(response.data)
        }
      )
    }
    let errorCallback = response => {
      toast.error('Something went wrong.')
    }
    const user_data = JSON.parse(localStorage.getItem('userData'))
    let request_data = {
      test_assessment_id: assessment_id,
      comment: new_comment,
      user_id: 0, //user_data.id,
      comment_date: new Date().toISOString()
    }
    addComment(request_data, errorCallback, successCallback)
    set_new_comment('')
  }

  let errorCallback = response => {
    toast.error('Something went wrong.')
  }

  let request_data = JSON.stringify({
    test_assessment_id: assessment_id,
    comments: [new_comment]
  })
  addComment(request_data, errorCallback, successCallback)
  set_new_comment('')

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '650px'
          }
        }
      }}
    >
      <DialogTitle>{t('Add New Comment')}</DialogTitle>

      <FormControl>
        <TextField
          id='outlined-multiline-flexible'
          multiline
          rows={5}
          value={new_comment}
          onChange={e => set_new_comment(e.target.value)}
        />
      </FormControl>

      <Grid
        item
        sx={{
          marginLeft: 'auto',
          margin: '10px',
          '@media screen and (max-width:600px)': {
            flexDirection: 'row',
            marginLeft: 0
          }
        }}
        xs={12}
        style={{ display: 'flex', justifyContent: 'right' }}
      >
        <Button xs={2} variant='contained' size='medium' onClick={handleClose}>
          {t('Cancel')}
        </Button>
        <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={add_comment}>
          {t('Save')}
        </Button>
      </Grid>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}

export default SimpleDialog
