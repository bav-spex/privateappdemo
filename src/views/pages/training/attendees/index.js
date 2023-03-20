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
import { updateBatch, resetBatch } from 'src/store/apps/schedule'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchTeachers } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button, FormHelperText } from '@mui/material'

// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

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

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'Teacher Name',
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
    field: 'id',
    headerName: 'Teacher ID',
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
    field: 'diet',
    minWidth: 150,
    headerName: 'Diet',
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
  } /*,
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
  } ,
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  } */
]

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { submitBatch } from 'src/store/apps/batches'

const AttendeesList = props => {
  const { handleBack } = props

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  const storeData = useSelector(state => state.schedule)
  const router = useRouter()

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchTeachers({ q: value }))
  }, [dispatch, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleNextBtn = () => {
    toast.success('Batch is submitted.');
    dispatch(submitBatch(storeData))

    dispatch(resetBatch())
    router.replace("/home");
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const [selectionModel, setSelectionModel] = useState(storeData.teachers?.map(item => item.userId))

  return (
    <Grid container spacing={6}>
      {console.log('selectionModel.length', selectionModel.length == storeData.batchSize)}

      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={store.teacherList}
            getRowId={(row) => row.userId}
            columns={columns}
            checkboxSelection
            loading={store.teacherList.length ? false : true}
            onSelectionModelChange={ids => {
              const selectedIDs = new Set(ids)
              const selectedRowData = store.teacherList.filter(row => selectedIDs.has(row.userId.toString()))
              console.log(selectedRowData)
              setSelectionModel(ids)
              dispatch(updateBatch({ teachers: selectedRowData }))
            }}
            isRowSelectable={params =>
              selectionModel.indexOf(params.row.userId) !== -1 || selectionModel.length < storeData.batchSize
            }
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
        <Button
          size='large'
          onClick={handleNextBtn}
          disabled={!selectionModel.length}
          variant='contained'
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default AttendeesList
