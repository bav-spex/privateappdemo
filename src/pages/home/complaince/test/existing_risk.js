import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import auth from 'src/configs/auth'

import { useRouter } from 'next/router'
import {
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { allRisk } from 'src/store/apps/Risks/RiskService'
import { saveExistingRisks } from 'src/pages/home/complaince/test/complaince_service'

function SimpleDialog(props) {
  const { onClose, selectedValue, open, test_assessment_id } = props

  const [existing_risk_list, set_existing_risk_list] = useState([])
  const [available_risk_list, set_available_risk_list] = useState([])

  const handleClose = () => {
    onClose(selectedValue)
  }

  const save_existing_list = async () => {
    let successCallback = response => {
      handleClose()
    }
    let errorCallback = response => {
      toast.error('Something went wrong')
    }
    let request_data = {
      test_assessment_id: test_assessment_id,
      risk_id: existing_risk_list
    }
    saveExistingRisks(request_data, errorCallback, successCallback)
  }

  const fetch_existing_risk_list = () => {
    let successCallback = response => {
      set_available_risk_list(response.data.risk)
    }
    let errorCallback = response => {
      toast.error('Something went wrong')
    }

    allRisk(errorCallback, successCallback)
  }

  useEffect(() => {
    fetch_existing_risk_list()
  }, [])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '650px',
            height: '440px',
            padding: '20px'
          }
        }
      }}
    >
      <DialogTitle>Existing Risk</DialogTitle>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Available Risks</InputLabel>
          <Select
            value={existing_risk_list}
            onChange={e => set_existing_risk_list(e.target.value)}
            labelId='demo-simple-select-label'
            label='Tester'
            inputProps={{
              name: 'selectedValues',
              id: 'selected-values'
            }}
          >
            {available_risk_list.map(item =>
              item !== null ? <MenuItem value={item.id}>{item.subject}</MenuItem> : ''
            )}
          </Select>
        </FormControl>
      </div>

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
        <Button xs={2} variant='contained' size='medium'>
          cancel
        </Button>
        <Button
          type='submit '
          size='medium'
          variant='contained'
          style={{ marginLeft: '10px' }}
          onClick={save_existing_list}
        >
          Save
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
