// // ** React Imports
import { useState, useEffect, useCallback } from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
// ** Next Imports
import Link from 'next/link'

// // ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { makeStyles } from '@material-ui/core/styles'

//  ** Icon Imports
import Icon from 'src/@core/components/icon'

//  ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button, ToggleButtonGroup } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// //*axios import

// import { allRisk } from 'src/pages/home/risk/RiskService'
import { allRisk, getRisks } from 'src/store/apps/Risks/RiskService'

import { useTranslation } from 'react-i18next'
import withRoot from '../withRoot'
import { useTheme } from '@material-ui/core/styles'

import { addRisk, getriskList, reviewRisk } from 'src/store/apps/Risks'
import { date } from 'yup/lib/locale'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const RiskList = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  // const theme = useTheme()
  // document.body.dir = i18n.dir();

  const classes = useStyles()

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const [risks, setRisks] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    getRisks(() => {}, setRisks)
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

  const editRisk = id => {
    router.push({
      pathname: '/home/risk/edit',
      query: { id: id }
    })
  }

  const reviewSubmit = values => {
    dispatch(reviewRisk(values))
    console.log('values:', values)
    // setRisk(console.log('data', risk))
  }

  const handleCreateClick = id => {
    console.log('into handle create')
    console.log('editing id is', id)
    // router.push('/home/risk/EditRisk')
    router.push({
      pathname: '/home/risk/edit',
      query: { id: id }
    })
    // dispatch(reviewRisk(data))
  }

  // function handleRowClick(params) {
  //   // The `params` argument contains information about the clicked row
  //   const id = params.id;
  //   // Redirect the user to the desired page
  //   router.push({
  //     pathname: '/home/risk/Risk_info',
  //     query: { keyword: id },
  //   });
  // }

  const openNewForm = () => {
    router.push('/home/risk/newRisk-form')
  }

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

  const openPreview = () => {
    router.push('/home/risk/LastReview')
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const columns = [
    {
      flex: 0.08,
      width: 50,
      field: 'id',
      headerName: t('ID'),
      renderCell: ({ row }) => {
        const handleRowClick = () => {
          const id = row.id

          // Redirect the user to the desired page
          // router.push({
          //   pathname: '/home/risk/Risk_info',
          //   query: { keyword: id }
          // })
        }

        return <div onClick={handleRowClick}>{row.id}</div>
      }
    },
    { flex: 0.15, width: 50, field: 'subject', headerName: t('Subject') },
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
            <IconButton onClick={() => editRisk(row.id)} sx={{ color: 'blue' }}>
              <EditIcon titleAccess='Edit Risk' />
            </IconButton>
            <IconButton onClick={() => openMitigation(row.id, row.mitigation)} sx={{ color: 'green' }}>
              <VerifiedUserIcon titleAccess='Plan Mitigate' />
            </IconButton>

            {/* <IconButton onClick={openMitigation(r.id)} sx={{ color: 'green' }}>
              <ContactSupportIcon />
            </IconButton> */}
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
          </>
        )
      }
    }
  ]

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
        {/* <TableHeader value={value} handleFilter={handleFilter} sx={{ textAlign: 'center' }} /> */}
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          className={classes.customBackground}
        />
      </div>
    </>
  )
}

export default RiskList
