// // ** React Imports
import { useState, useEffect, useMemo } from 'react'

// // ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'

import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'

import { makeStyles } from '@material-ui/core/styles'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress } from '@mui/material'
import { getFindings } from 'src/store/apps/compliance/audits/FindingsServices'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const FindingsAudits = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [findings, setFindings] = useState([])

  useEffect(() => {
    getFindings(router.query.auditId, setFindings, setLoading)
  }, [router.query.auditId])

  const columns = useMemo(() => {
    return [
      {
        flex: 0.02,
        width: 50,
        field: 'findingid',
        headerName: t('ID')
      },
      { flex: 0.1, width: 50, field: 'finding', headerName: t('Finding') },
      { flex: 0.1, minWidth: 25, field: 'actiontaken', headerName: t('Action Taken') },
      { flex: 0.1, minWidth: 10, field: 'correctiveaction', headerName: t('Correctiveaction') },
      { flex: 0.1, minWidth: 10, field: 'rootcause', headerName: t('Root Cause') },
      { flex: 0.09, minWidth: 10, field: 'requirement', headerName: t('Requirement') },
      { flex: 0.06, minWidth: 10, field: 'tagrgetdate', headerName: t('Tagrget Date') },
      {
        field: 'action',
        headerName: t('Action'),
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 0.06,
        valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <IconButton
                sx={{ color: 'blue' }}
                onClick={() =>
                  router.push({
                    pathname: `/home/compliance/audits/${router.query.auditId}/findings/edit/${row.findingid}`
                  })
                }
              >
                <EditIcon titleAccess='Edit Audit' />
              </IconButton>
            </>
          )
        }
      }
    ]
  }, [])

  const handleRowClick = id => {
    router.push(`/home/compliance/audits/preview/${id}`)
  }

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Findings')}</h2>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}></Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button size='medium' variant='contained' onClick={() => router.push('/home/compliance/audits')}>
                {t('Back')}
              </Button>
            </Grid>
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
          <DataGrid
            rows={findings}
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            className={classes.customBackground}
            getRowId={row => row.findingid}
            // onRowClick={data => handleRowClick(data.row.id)}
          />
        )}
      </div>
    </>
  )
}

export default FindingsAudits
