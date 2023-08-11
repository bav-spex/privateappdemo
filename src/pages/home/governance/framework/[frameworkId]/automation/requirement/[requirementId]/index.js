// // ** React Imports
import { useState, useEffect, useCallback, Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import { makeStyles } from '@material-ui/core/styles'
import { getControlDropDown, getFrameworkDropDown } from 'src/store/apps/common'
import {
  createRequirenmentSections,
  getAllControls,
  getAllRequirenment,
  getAllRequirenmentSections,
  getControlsByRequirenmentId,
  getRequirenmentSectionsByFrameworkId,
  getSingleRequirenment
} from 'src/store/apps/governance/framework/requirenmentsSections/RequirenmentsServices'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const Automation = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  const [requirement, setRequirement] = useState([])
  const [controlIds, setControlIds] = useState([])
  const [control_dropdown, set_control_dropdown] = useState([])
  const [requirementControls, setRequirementControls] = useState([])

  useEffect(() => {
    getSingleRequirenment(router.query.requirementId, setRequirement)
    getControlsByRequirenmentId(router.query.requirementId, setControlIds, setLoading)
    getControlDropDown(set_control_dropdown)
  }, [])

  useEffect(() => {
    if (controlIds && control_dropdown) {
      const controls = control_dropdown
        .filter(control => {
          return controlIds.includes(control.id)
        })
        .sort((a, b) => a.id - b.id)
      setRequirementControls(controls)
      setLoading(false)
    }
  }, [controlIds, control_dropdown])
  console.log(requirementControls)

  const columns = useMemo(() => {
    return [
      {
        flex: 0.04,
        field: 'id',
        headerName: t('ID')
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
      },
      {
        flex: 0.05,
        field: 'status',
        headerName: t('Status')
      },

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
              {/* <IconButton onClick={() => router.push(`/home/risk/edit/${row.id}`)} sx={{ color: 'blue' }}>
                <EditIcon titleAccess='Edit Risk' />
              </IconButton>
              <IconButton onClick={() => openMitigation(row.id, row.mitigation)} sx={{ color: 'green' }}>
                <VerifiedUserIcon titleAccess='Plan Mitigate' />
              </IconButton>
              <IconButton
                onClick={() =>
                  router.push({
                    pathname: `/home/risk/${row.id}/reviews`
                  })
                }
                sx={{ color: 'blue' }}
              >
                <AddCommentIcon titleAccess='Add Comment' />
              </IconButton>
              <IconButton sx={{ color: '#ed3700' }}>
                <DeleteIcon onClick={() => deleteSingleRisk(row.id, setRisks)} titleAccess='Delete Review' />
              </IconButton> */}
            </>
          )
        }
      }
    ]
  }, [])

  return (
    <>
      {' '}
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
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={600} fontSize={'24px'}>
                {requirement.description}
              </Typography>
              <Typography
                marginLeft={'20px'}
                backgroundColor={'#e1e1e1'}
                padding={'5px 10px'}
                fontWeight={600}
                fontSize={'16px'}
              >
                {requirement.code}
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
            </Grid>
          </Box>

          <Divider />
          <DataGrid
            rows={requirementControls}
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            className={classes.customBackground}
          />
        </>
      )}
    </>
  )
}

export default Automation
