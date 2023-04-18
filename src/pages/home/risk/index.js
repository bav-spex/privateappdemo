// // ** React Imports
import { useState, useEffect, useCallback } from 'react'

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

//  ** Icon Imports
import Icon from 'src/@core/components/icon'

//  ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button, ToggleButtonGroup } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// //*axios import

import { allRisk } from 'src/pages/home/risk/RiskService'

import { addRisk, getriskList, reviewRisk } from 'src/store/apps/Risks'

const RiskList = () => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.selectRisk)

  const reviewSubmit = values => {
    dispatch(reviewRisk(values))
    console.log('values:', values)
    // setRisk(console.log('data', risk))
  }

  useEffect(() => {
    allRisk(() => {}, setAll)
  }, [])

  const router = useRouter()
  const [all, setAll] = useState([])

  const risksArray = all?.data?.risk

  const columns = [
    { flex: 0.08, width: 50, field: 'id', headerName: 'ID' },
    { flex: 0.11, width: 50, field: 'suject', headerName: 'Subject' },
    { flex: 0.12, minWidth: 25, field: 'inherentscore', headerName: 'Inherent Score' },
    { flex: 0.08, minWidth: 10, field: 'status', headerName: 'Status' },
    {
      field: 'submissiondate',
      headerName: 'SUbmission Date ',
      type: 'number',
      flex: 0.14,
      minWidth: 25
    },
    {
      field: 'mitigation',
      headerName: 'mitigation ',
      type: 'number',
      flex: 0.1,
      minWidth: 25,
      textAlign: 'center'
    },
    {
      field: 'managementreview',
      headerName: 'managment review ',
      type: 'number',
      flex: 0.15,
      minWidth: 25,
      allignItems: 'center',
      textAlign: 'center'
    },

    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      // width: 300,
      flex: 0.15,
      valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: ({ rows }) => {
        return (
          <>
            {Array.isArray(risksArray) &&
              risksArray.map((r, i) =>
                i == 0 ? (
                  <IconButton onClick={handleCreateClick} sx={{ color: 'blue' }}>
                    <VisibilityIcon />
                  </IconButton>
                ) : null
              )}
            <IconButton onClick={openMitigation} sx={{ color: 'green' }}>
              <ContactSupportIcon />
            </IconButton>
            <IconButton onClick={openPreview} sx={{ color: 'red' }}>
              <PreviewIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  const rows = []

  Array.isArray(risksArray) && risksArray.map(r => rows.push(r))

  const [value, setValue] = useState('')

  const handleCreateClick = () => {
    console.log('into handle create')
    router.push('/home/risk/newRisk')
    // dispatch(reviewRisk(data))
  }

  const openNewForm = () => {
    router.push('/home/risk/newRisk-form')
  }
  const openMitigation = () => {
    router.push('/home/mitigation/mitigation')
  }

  const openPreview = () => {
    router.push('/home/risk/LastReview')
  }
  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
      <div style={{ height: 400 }}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}></Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button size='medium' variant='contained' onClick={openNewForm}>
                Create Risk
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* <TableHeader value={value} handleFilter={handleFilter} sx={{ textAlign: 'center' }} /> */}
        <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[10, 25, 50]} />
      </div>
    </>
  )
}
export default RiskList
