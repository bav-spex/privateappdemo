import { useState } from 'react'

import { useTheme } from '@material-ui/core/styles'
import { FormControl, TextField, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import auth from 'src/configs/auth'
import 'react-toastify/dist/ReactToastify.css'

function SimpleDialog(props) {
  const { onClose, open, category_id } = props

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [new_lookup_name, set_new_lookup_name] = useState('')

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  const save_new_lookup = async () => {
    const res = await fetch(`${auth.add_lookup}/${category_id}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lookupName: new_lookup_name,
        lookupDesc: new_lookup_name,
        status: 'active'
      })
    })
    const data = await res.json()
    console.log('new look up added is', data)
    toast.success('Look Up Added Successfully')
    handleClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '650px',
            height: '310px',
            padding: '20px'
          }
        }
      }}
    >
      <DialogTitle>{t('Add New Lookup')}</DialogTitle>

      <FormControl fullWidth>
        <TextField
          id='outlined-flexible'
          label='Look Up Name'
          value={new_lookup_name}
          onChange={e => set_new_lookup_name(e.target.value)}
        />
      </FormControl>

      <Grid
        item
        sx={{
          marginLeft: 'auto',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
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
        <Button
          type='submit '
          size='medium'
          variant='contained'
          style={{ marginLeft: '10px' }}
          onClick={save_new_lookup}
        >
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
