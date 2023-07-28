// // ** React Imports
import { useState, useEffect, useCallback } from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport'

// // ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'

import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { makeStyles } from '@material-ui/core/styles'

import { useRouter } from 'next/router'

import { deleteSingleAudit, getAudits } from 'src/store/apps/compliance/audits/AuditsServices'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const Audits = () => {
  const user_data = JSON.parse(localStorage.getItem('userData'))
  const { t } = useTranslation()
  const router = useRouter()

  const classes = useStyles()
  const [audits, setAudits] = useState([])
  useEffect(() => {
    getAudits(setAudits)
  }, [])

  const columns = [
    {
      flex: 0.08,
      width: 50,
      field: 'id',
      headerName: t('ID')
    },
    { flex: 0.17, width: 50, field: 'auditName', headerName: t('Name') },
    { flex: 0.06, minWidth: 25, field: 'categoryId', headerName: t('Type') },
    { flex: 0.08, minWidth: 10, field: 'statusId', headerName: t('Status') },
    { flex: 0.08, minWidth: 10, field: 'ownerId', headerName: t('owner') },
    {
      field: 'auditDate',
      headerName: t('Audit Date'),
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
      field: 'frameworkId',
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
            <IconButton
              sx={{ color: 'blue' }}
              onClick={() =>
                router.push({
                  pathname: `/home/compliance/audits/edit/${row.id}`
                })
              }
            >
              <EditIcon titleAccess='Edit Audit' />
            </IconButton>
            <IconButton sx={{ color: 'green' }}>
              <ImportExportIcon titleAccess='Import/Export Audit' />
            </IconButton>
            <IconButton sx={{ color: 'red' }}>
              <DeleteIcon onClick={() => deleteSingleAudit(row.id, setAudits)} titleAccess='Delete Review' />
            </IconButton>
          </>
        )
      }
    }
  ]

  const handleRowClick = id => {
    router.push(`/home/compliance/audits/preview/${id}`)
  }

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Audits')}</h2>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}></Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button size='medium' variant='contained' onClick={() => router.push('/home/compliance/audits/new')}>
                {t('Add Audit')}
              </Button>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <DataGrid
          rows={audits}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          className={classes.customBackground}
          onRowClick={data => handleRowClick(data.row.id)}
        />
      </div>
    </>
  )
}

export default Audits
