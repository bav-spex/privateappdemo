// // ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TopicRoundedIcon from '@mui/icons-material/TopicRounded'
import { Box, Button, CircularProgress } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { getFrameworkDropDown } from 'src/store/apps/common'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const FrameWorkList = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const [loading, setLoading] = useState(true)
  const [frameworks, setFrameworks] = useState([])
  const classes = useStyles()

  useEffect(() => {
    getFrameworkDropDown(setFrameworks, setLoading)
  }, [])

  const columns = [
    {
      flex: 0.5,
      width: 50,
      field: 'framework_Name',
      headerName: t('FrameWork Name'),
      renderCell: params => {
        const handleRowClick = () => {
          const id = params.row.id
          // router.push({
          //   pathname: '/home/framework/Framework_info',
          //   query: { keyword: id }
          // })
        }

        return <div onClick={handleRowClick}>{params.value}</div>
      }
    },

    { flex: 0.5, width: 80, field: 'framework_Details', headerName: t('FrameWork Description') },

    {
      field: 'id',
      headerName: t('Action'),
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 0.15,
      renderCell: params => {
        return (
          <>
            <IconButton
              sx={{ color: '#ffae00' }}
              onClick={() => router.push(`/home/governance/framework/${params.row.id}/automation`)}
            >
              <TopicRoundedIcon titleAccess='Requirenments Sections' />
            </IconButton>
          </>
        )
      }
    }
  ]

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Frameworks')}</h2>
          <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
            <Button size='medium' variant='contained' sx={{ marginLeft: '10px' }}>
              {t('Import Framework')}
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
          <DataGrid
            rows={frameworks}
            getRowId={row => row.framework_Name + row.framework_Details + row.id}
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            className={classes.customBackground}
            // onRowClick={handleRowClick}
          />
        )}
      </div>
    </>
  )
}

export default FrameWorkList
