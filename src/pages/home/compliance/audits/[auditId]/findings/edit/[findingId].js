import React, { useState, useMemo, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Typography
} from '@mui/material'
import { Button, Divider, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'
import { getRisksByFindings } from 'src/store/apps/compliance/audits/FindingsServices'
import { getRisks } from 'src/store/apps/Risks/RiskService'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const EditFinding = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  const currentDate = moment().format('YYYY-MM-DD')

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [risksByFindings, setRisksByFindings] = useState([])
  const [risks, setRisks] = useState([])
  const [selectedRisks, setSelectedRisks] = useState([])
  const [tempSelectedRisks, setTempSelectedRisks] = useState([])

  const [singleFindingData, setSingleFindingData] = useState({
    findingid: null,
    auditId: router.query.auditId,
    finding: '',
    requirement: '',
    rootcause: '',
    correctiveaction: '',
    tagrgetdate: currentDate,
    status: null,
    actiontaken: ''
  })

  useEffect(() => {
    getRisksByFindings(router.query.findingId, setRisksByFindings)
    getRisks(setRisks)
    apiHelper(`${authConfig.mock_finidings_url}audit/finding/${router.query.findingId}`, 'get', null, {})
      .then(res => {
        setSingleFindingData({
          ...res.data.data,
          findingid: res.data.data.findingid,
          auditId: res.data.data.auditId,
          tagrgetdate: moment(res.data.data.tagrgetdate).format('YYYY-MM-DD')
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [router.query.findingId])

  // adding risksByFinding Ids to selected risks
  useEffect(() => {
    if (risksByFindings.length > 0) {
      const riskIds = []
      risksByFindings.map(risk => {
        if (!riskIds.includes(risk.id)) {
          riskIds.push(risk.id)
        }
      })
      setSelectedRisks(riskIds)
      setTempSelectedRisks(riskIds)
    }
  }, [risksByFindings])

  // finding
  // requirement
  // rootcause
  // correctiveaction
  // status
  // actiontaken
  const handleChange = (name, value) => {
    // console.log(name, value)
    setSingleFindingData({ ...singleFindingData, [name]: value })
  }

  // tagrgetdate
  const handleDateChange = (name, value) => {
    // console.log(name, value)
    setSingleFindingData({ ...singleFindingData, [name]: value })
  }

  //api to save the details of the mitigation
  const onSubmit = async values => {
    const payload = {
      ...singleFindingData,
      tagrgetdate: moment(singleFindingData.tagrgetdate).format('MM/DD/YYYY')
    }
    apiHelper(`${authConfig.mock_finidings_url}audit/findings`, 'post', payload, {})
      .then(res => {
        toast.success('Findings Updated')
        router.push(`/home/compliance/audits/${router.query.auditId}/findings`)
        setSingleFindingData({
          findingid: null,
          auditId: null,
          finding: '',
          requirement: '',
          rootcause: '',
          correctiveaction: '',
          tagrgetdate: currentDate,
          status: null,
          actiontaken: ''
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const readOnlyFindings = useMemo(() => {
    return [
      {
        flex: 0.1,
        width: 50,
        field: 'id',
        headerName: t('ID')
      },
      { flex: 0.8, width: 50, field: 'name', headerName: t('Name') },

      {
        field: 'action',
        headerName: t('Action'),
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 0.1,
        valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <IconButton
                sx={{ color: '#ed3700' }}
                onClick={() =>
                  router.push({
                    pathname: `/home/compliance/audits/${router.query.auditId}/findings/edit/${row.findingid}`
                  })
                }
              >
                <DeleteIcon titleAccess='Dlete Finding' />
              </IconButton>
            </>
          )
        }
      }
    ]
  }, [])

  const editOnlyFindings = useMemo(() => {
    return [
      {
        field: 'action',
        headerName: t('Action'),
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 0.1,
        valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <Checkbox onChange={() => handleRiskCheckBoxChange(row.id)} checked={selectedRisks.includes(row.id)} />
            </>
          )
        }
      },
      {
        flex: 0.1,
        width: 50,
        field: 'id',
        headerName: t('ID')
      },
      { flex: 0.8, width: 50, field: 'subject', headerName: t('Name') }
    ]
  }, [selectedRisks])

  const handleRiskCheckBoxChange = id => {
    if (selectedRisks.includes(id)) {
      setSelectedRisks(prevState => {
        return prevState.filter(existId => existId !== id)
      })
    } else {
      setSelectedRisks([...selectedRisks, id])
    }
  }

  const handleCancelModel = () => {
    setOpen(false)
    setSelectedRisks(tempSelectedRisks)
  }

  const handleSubmitFindingRisk = () => {
    const payload = {
      risk_ids: selectedRisks
    }
    apiHelper(`${authConfig.mock_finidings_url}audit/finding/${router.query.findingId}/risks`, 'post', payload, {})
      .then(res => {
        toast.success(res.data.data.result)
        setOpen(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>Edit Finding</h3>
        <Grid
          item
          sx={{
            marginLeft: 'auto',
            '@media screen and (max-width:600px)': {
              flexDirection: 'row',
              marginLeft: 0
            }
          }}
          xs={12}
          md={4}
          style={{ display: 'flex', justifyContent: 'right', marginBottom: 20 }}
        >
          <Button
            xs={2}
            variant='contained'
            size='medium'
            onClick={() => router.push(`/home/compliance/audits/${router.query.auditId}/findings`)}
          >
            Cancel
          </Button>
          <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={onSubmit}>
            Save Finding
          </Button>
        </Grid>
      </div>

      <Divider />
      {loading ? (
        <Box
          sx={{
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress disableShrink sx={{ mt: 6, color: '#060056' }} />
        </Box>
      ) : (
        risksByFindings.length > 0 &&
        selectedRisks.length > 0 && (
          <>
            <Grid container spacing={4} marginTop={'10px'}>
              <Grid item sx={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    type='date'
                    variant='outlined'
                    label={t('Target Date')}
                    name='tagrgetdate'
                    value={singleFindingData.tagrgetdate}
                    onChange={e => handleDateChange('tagrgetdate', e.target.value)}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
                <FormControl fullWidth>
                  <TextField
                    type='text'
                    style={{ width: '100%' }}
                    label={t('Finding Name')}
                    name='finding'
                    value={singleFindingData.finding}
                    onChange={e => handleChange('finding', e.target.value)}
                    required
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    type='text'
                    style={{ width: '100%' }}
                    label={t('Action Taken')}
                    name='actiontaken'
                    value={singleFindingData.actiontaken}
                    onChange={e => handleChange('actiontaken', e.target.value)}
                    required
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
                <FormControl fullWidth>
                  <TextField
                    type='text'
                    style={{ width: '100%' }}
                    label={t('Root Cause')}
                    name='rootcause'
                    value={singleFindingData.rootcause}
                    onChange={e => handleChange('rootcause', e.target.value)}
                    required
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    type='text'
                    style={{ width: '100%' }}
                    label={t('Correctiveaction')}
                    name='correctiveaction'
                    value={singleFindingData.correctiveaction}
                    onChange={e => handleChange('correctiveaction', e.target.value)}
                    required
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
                <FormControl fullWidth>
                  <TextField
                    type='text'
                    style={{ width: '100%' }}
                    label={t('Requirement')}
                    name='requirement'
                    value={singleFindingData.requirement}
                    onChange={e => handleChange('requirement', e.target.value)}
                    required
                    disabled={true}
                  />
                </FormControl>
              </Grid>

              <Grid item sx={{ width: '100%', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <h3>Finding Risks</h3>
                  <Grid
                    item
                    sx={{
                      marginLeft: 'auto',
                      '@media screen and (max-width:600px)': {
                        flexDirection: 'row',
                        marginLeft: 0
                      }
                    }}
                    xs={12}
                    md={4}
                    style={{ display: 'flex', justifyContent: 'right', marginBottom: 20 }}
                  >
                    <Button
                      type='submit '
                      size='medium'
                      variant='contained'
                      style={{ marginLeft: '10px' }}
                      onClick={() => setOpen(true)}
                    >
                      Add Risks
                    </Button>
                  </Grid>
                </div>
                <div style={{ height: 360 }}>
                  <DataGrid
                    rows={risksByFindings}
                    columns={readOnlyFindings}
                    rowsPerPageOptions={[10, 25, 50]}
                    className={classes.customBackground}
                    getRowId={row => row.id}
                    // onRowClick={data => handleRowClick(data.row.id)}
                  />
                </div>
              </Grid>
            </Grid>
            <Dialog fullWidth maxWidth='md' scroll='body' onClose={() => setOpen(false)} open={open}>
              <DialogTitle sx={{ textAlign: 'center' }}>
                <Typography variant='h5' component='span'>
                  Edit Risks
                </Typography>
              </DialogTitle>
              <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
                <div style={{ height: 500 }}>
                  <DataGrid
                    rows={risks}
                    columns={editOnlyFindings}
                    rowsPerPageOptions={[10, 25, 50]}
                    className={classes.customBackground}
                    getRowId={row => row.id}
                    // onRowClick={data => handleRowClick(data.row.id)}
                  />
                </div>
              </DialogContent>
              <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
                <Box className='demo-space-x'>
                  <Button size='large' type='submit' variant='contained' onClick={() => handleSubmitFindingRisk()}>
                    Submit
                  </Button>
                  <Button size='large' color='secondary' variant='outlined' onClick={() => handleCancelModel()}>
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </>
        )
      )}
    </>
  )
}

export default EditFinding
