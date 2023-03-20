// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { updateBatch } from 'src/store/apps/schedule'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchEmployees } from 'src/store/apps/user'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button, FormHelperText } from '@mui/material'


const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar && row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}


const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'Employee Name',
    renderCell: ({ row }) => {
      const { fullName, username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <StyledLink href=''>{fullName}</StyledLink>
            {/* <Typography noWrap variant='caption'>
              {`@${username}`}
            </Typography> */}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'userId',
    headerName: 'Employee ID',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.userId}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'city',
    minWidth: 150,
    headerName: 'Location',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: 'primary.main' } }}>
          {/*  <Icon icon={userRoleObj[row.city].icon} fontSize={20} /> */}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.city}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Contact',
    field: 'currentPlan',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.countryCode + ' ' + row.mobileNumber}
        </Typography>
      )
    }
  }/*,
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  }  ,
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  } */
]

const FacilitatorList = props => {
  const { handleNext, handleBack, name } = props

  const storeData = useSelector(state => state.schedule);
  

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  useEffect(() => {
    dispatch(
      fetchEmployees({
       q:value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleNextBtn = () => {
    if (!selectionModel.length) {
      setError(true)
    } else {
      handleNext()
    }
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const [selectionModel, setSelectionModel] = useState(storeData.facilitators.map(item => item.userId))

  return (
    <Grid container spacing={6}>
      {console.log('store.data', storeData)}

      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={store.employeesList ?? []}
            getRowId={(row) => row.userId}
            columns={columns}
            checkboxSelection
            loading={store.employeesList.length ? false : true}
            onSelectionModelChange={ids => {
              const selectedIDs = new Set(ids)
              const selectedRowData = store.employeesList.filter(row => selectedIDs.has(row.userId))
              console.log(selectedRowData)
              setSelectionModel(ids)
              dispatch(updateBatch({ facilitators: selectedRowData }))
            }}
            keepNonExistentRowsSelected
            selectionModel={selectionModel}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      {/*  <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button size='large' onClick={handleNextBtn} disabled={!selectionModel.length} variant='contained'>
          Next
        </Button>
      </Grid>
    </Grid>
  )
}

export default FacilitatorList
