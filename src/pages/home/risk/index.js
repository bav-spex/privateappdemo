// // ** React Imports
import { useState, useEffect, useMemo } from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
// // ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, CircularProgress } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// import { allRisk } from 'src/pages/home/risk/RiskService'
import { deleteSingleRisk, getRisks } from 'src/store/apps/Risks/RiskService'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const RiskList = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [risks, setRisks] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    getRisks(setRisks, setLoading)
  }, [])

  useEffect(() => {
    if (risks) {
      setRows(
        risks.map(row => {
          const dateObj = new Date(row.submissiondate) // Replace this with your actual Date object
          const year = dateObj.getFullYear()
          const month = String(dateObj.getMonth() + 1).padStart(2, '0')
          const day = String(dateObj.getDate()).padStart(2, '0')

          const submissiondate = `${year}-${month}-${day}`

          return {
            ...row,
            submissiondate
          }
        })
      )
    }
  }, [risks])

  const openMitigation = (id, mitigation) => {
    if (mitigation) {
      router.push({
        pathname: `/home/risk/${id}/mitigation`
      })
    } else {
      router.push({
        pathname: `/home/risk/${id}/mitigation/new`
      })
    }
  }

  const columns = useMemo(() => {
    return [
      {
        flex: 0.08,
        width: 50,
        field: 'id',
        headerName: t('ID')
      },
      {
        flex: 0.15,
        width: 50,
        field: 'subject',
        headerName: t('Subject')
        // renderCell: ({ row }) => {
        //   return (
        //     <p style={{ width: '100%', cursor: 'pointer' }} onClick={() => handleRowClick(row.id)}>
        //       {row.subject}
        //     </p>
        //   )
        // }
      },
      { flex: 0.08, minWidth: 25, field: 'inherentscore', headerName: t('Inherent Score') },
      { flex: 0.08, minWidth: 10, field: 'status', headerName: t('Status') },
      {
        field: 'submissiondate',
        headerName: t('Submission Date'),
        type: 'date',
        flex: 0.14,
        minWidth: 25,
        sortComparator: (v1, v2, cellParams1, cellParams2) => {
          const timestamp1 = new Date(v1).getTime()
          const timestamp2 = new Date(v2).getTime()
          if (timestamp1 < timestamp2) {
            return -1
          }
          if (timestamp1 > timestamp2) {
            return 1
          }

          return 0
        }
      },
      {
        field: 'framework',
        headerName: t('Framework'),
        type: 'text',
        flex: 0.14,
        minWidth: 25
      },
      {
        field: 'action',
        headerName: t('Action'),
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 0.15,
        valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: ({ row }) => {
          return (
            <>
              <IconButton onClick={() => router.push(`/home/risk/edit/${row.id}`)} sx={{ color: 'blue' }}>
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
              </IconButton>
            </>
          )
        }
      }
    ]
  }, [])

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Risk')}</h2>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}></Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button size='medium' variant='contained' onClick={() => router.push('/home/risk/new')}>
                {t('Create Risk')}
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
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            className={classes.customBackground}
          />
        )}
      </div>
    </>
  )
}

export default RiskList
