// // ** React Imports
import { useState, useEffect, useCallback, Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import authConfig from 'src/configs/auth'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { toast } from 'react-hot-toast'
import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { getControlDropDown } from 'src/store/apps/common'
import { getControlsByRequirenmentId } from 'src/store/apps/governance/framework/requirenmentsSections/RequirenmentsServices'
import apiHelper from 'src/store/apiHelper'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const Automation = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [controlIds, setControlIds] = useState([])
  const [control_dropdown, set_control_dropdown] = useState([])
  const [requirementControls, setRequirementControls] = useState([])
  const [selectedControls, setSelectedControls] = useState([])
  const [tempSelectedControls, setTempSelectedControls] = useState([])
  const [singleRequirementData, setSingleRequirementData] = useState(null)

  useEffect(() => {
    getControlsByRequirenmentId(router.query.requirementId, setControlIds)
    getControlDropDown(set_control_dropdown)
    apiHelper(
      `${authConfig.governanceDevRakshitah_base_url}requirement/id/${router.query.requirementId}`,
      'get',
      null,
      {}
    )
      .then(res => {
        setSingleRequirementData({
          ...res.data.data
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [router.query.requirementId])

  useEffect(() => {
    if (controlIds && control_dropdown) {
      const controls = control_dropdown
        .filter(control => {
          return controlIds.includes(control.id)
        })
        .sort((a, b) => a.id - b.id)
      setRequirementControls(controls)
      const controlsIds = controls.map(con => con.id)
      setSelectedControls(controlsIds)
      setTempSelectedControls(controlsIds)
    }
  }, [controlIds, control_dropdown])

  const handleCancelModel = () => {
    setOpen(false)
    setSelectedControls(tempSelectedControls)
  }

  const handleControlsCheckBoxChange = id => {
    if (selectedControls.includes(id)) {
      setSelectedControls(prevState => {
        return prevState.filter(existId => existId !== id)
      })
    } else {
      setSelectedControls([...selectedControls, id])
    }
  }

  const handleSubmitRequirement = () => {
    const payload = {
      ...singleRequirementData,
      controlIds: selectedControls
    }
    apiHelper(
      `${authConfig.governanceDevRakshitah_base_url}requirement/update/${singleRequirementData.id}`,
      'put',
      payload,
      {}
    )
      .then(res => {
        toast.success(res.data.data.msg)
        getControlsByRequirenmentId(router.query.requirementId, setControlIds)
        setOpen(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteControlFromRequirement = id => {
    const payload = {
      ...singleRequirementData,
      controlIds: selectedControls.filter(con => con != id)
    }
    apiHelper(
      `${authConfig.governanceDevRakshitah_base_url}requirement/update/${singleRequirementData.id}`,
      'put',
      payload,
      {}
    )
      .then(res => {
        toast.success(res.data.data.msg)
        getControlsByRequirenmentId(router.query.requirementId, setControlIds)
        setOpen(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const RequirementControlsColumns = useMemo(() => {
    return [
      {
        flex: 0.04,
        field: 'id',
        headerName: t('ID')
      },
      {
        flex: 0.1,
        field: 'control-number',
        headerName: t('Control Code'),
        renderCell: ({ row }) => {
          return (
            <p
              style={{ width: '100%', cursor: 'pointer', fontWeight: '600', color: '#060056' }}
              onClick={() =>
                router.push(
                  `/home/governance/framework/${router.query.frameworkId}/automation/requirement/${router.query.requirementId}/control/${row.id}`
                )
              }
            >
              {row['control-number']}
            </p>
          )
        }
      },
      {
        flex: 0.15,
        field: 'name',
        headerName: t('Name')
      },
      {
        flex: 0.25,
        field: 'description',
        headerName: t('Description')
      },
      {
        flex: 0.05,
        field: 'status',
        headerName: t('Status')
      },

      {
        headerName: t('unlink'),
        sortable: false,
        flex: 0.1,
        valueGetter: params => `${params.row.description || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <IconButton sx={{ color: '#ed3700' }}>
                <DeleteIcon onClick={() => deleteControlFromRequirement(row.id)} titleAccess='Delete Review' />
              </IconButton>
            </>
          )
        }
      }
    ]
  }, [])

  const ControlsColumns = useMemo(() => {
    return [
      {
        field: 'action',
        headerName: t('Action'),
        sortable: false,
        flex: 0.1,
        valueGetter: params => `${params.row.description || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <Checkbox
                onChange={() => handleControlsCheckBoxChange(row.id)}
                checked={selectedControls.includes(row.id)}
              />
            </>
          )
        }
      },
      {
        flex: 0.1,
        field: 'control-number',
        headerName: t('Control Code')
      },
      {
        flex: 0.15,
        field: 'name',
        headerName: t('Name')
      },
      {
        flex: 0.25,
        field: 'description',
        headerName: t('Description')
      }
    ]
  }, [handleControlsCheckBoxChange, selectedControls])

  return (
    <>
      {' '}
      {loading && !singleRequirementData ? (
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
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={600} fontSize={'24px'}>
                {singleRequirementData.description}
              </Typography>
              <Typography
                marginLeft={'20px'}
                backgroundColor={'#e1e1e1'}
                padding={'5px 10px'}
                fontWeight={600}
                fontSize={'16px'}
              >
                {singleRequirementData.code}
              </Typography>
            </Box>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button
                size='medium'
                variant='contained'
                onClick={() => router.push(`/home/governance/framework/${router.query.frameworkId}/automation`)}
              >
                {t('Back')}
              </Button>
              <Button size='medium' variant='contained' sx={{ marginLeft: '10px' }} onClick={() => setOpen(true)}>
                {t('Link Controls')}
              </Button>
            </Grid>
          </Box>
          <Divider />
          <DataGrid
            rows={requirementControls}
            columns={RequirementControlsColumns}
            rowsPerPageOptions={[10, 25, 50]}
            className={classes.customBackground}
          />
          <Dialog fullWidth maxWidth='md' scroll='body' onClose={() => setOpen(false)} open={open}>
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant='h5' component='span'>
                Link Controls
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <div style={{ height: 500 }}>
                <DataGrid
                  rows={control_dropdown}
                  columns={ControlsColumns}
                  rowsPerPageOptions={[10, 25, 50]}
                  className={classes.customBackground}
                  getRowId={row => row.id}
                  // onRowClick={data => handleRowClick(data.row.id)}
                />
              </div>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
              <Box className='demo-space-x'>
                <Button size='large' type='submit' variant='contained' onClick={() => handleSubmitRequirement()}>
                  Submit
                </Button>
                <Button size='large' color='secondary' variant='outlined' onClick={() => handleCancelModel()}>
                  Cancel
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  )
}

export default Automation
