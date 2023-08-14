import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import { Button, Grid, Icon, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
// ** Icon Imports
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
// ** Actions Imports
import { getBatchList } from 'src/store/apps/batches'
import { updateBatch } from 'src/store/apps/schedule'
import { deleteUser } from 'src/store/apps/user'
// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'

// ** Next Import

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
  fontSize: '0.9rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

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

const BatchList = () => {
  // ** State

  const [value, setValue] = useState('')
  const [bathcStatus, setBatchStatus] = useState('Active')

  const [pageSize, setPageSize] = useState(10)

  const batchList = useSelector(state => state.batches.batchList)
  const [tableData, setTableData] = useState(batchList)
  const [statusList, setStatusList] = useState(Array.from(new Set(batchList.map(item => item.status))))

  const router = useRouter()

  const gotoEditMode = rowId => {
    let rowItem = batchList.filter(item => item.batchId == rowId)
    let batch = { ...rowItem[0] }

    if (batch.startDate) {
      batch.startDate = new Date(rowItem[0].startDate)
    }
    if (batch.endDate) {
      batch.endDate = new Date(rowItem[0].endDate)
    }
    console.log('BATCH', batch)

    dispatch(updateBatch({ ...batch }))
    router.push('/home/batch/create')
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'batchName',
      headerName: 'Batch Name',
      renderCell: ({ row }) => {
        const { batchName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{batchName}</Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 250,
      field: 'venue',
      headerName: 'Venue',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2' sx={{ fontSize: '0.9rem' }}>
            {row.venue}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'startDate',
      minWidth: 150,
      headerName: 'start Date',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
            <Typography noWrap sx={{ fontSize: '0.9rem', color: 'text.secondary', textTransform: 'capitalize' }}>
              {new Date(row.startDate).toLocaleDateString('en-US')}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Course Name',
      field: 'Course Name',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>
            {row.course.courseName}
          </Typography>
        )
      }
    },
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
            sx={{ textTransform: 'capitalize', fontSize: '0.9rem' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.batchId} />
    }
  ]

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBatchList({ q: value }))
  }, [dispatch, value])

  useEffect(() => {
    const tableData = batchList.filter(item => item.status == bathcStatus)
    setTableData(tableData)
    const newSet = new Set(batchList.map(item => item.status))
    setStatusList(Array.from(newSet))
  }, [batchList])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleCreateClick = () => {
    router.push('/home/batch/create')
  }

  const handleToggle = (event, newStatus) => {
    const tableData = batchList.filter(item => item.status == newStatus || item.status == null)
    console.log(
      'NUL Values ',
      batchList.filter(item => item.status == null)
    )
    setTableData(tableData)
    setBatchStatus(newStatus)
  }

  return (
    <Grid container spacing={6}>
      {console.log('statusList', statusList)}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Batches' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <ToggleButtonGroup exclusive value={bathcStatus} onChange={handleToggle} aria-label='batch status'>
                  {/* <ToggleButton value='active' aria-label='left aligned'>
                    <Typography sx={{fontSize: '12px', lineHeight: '18px', fontWeight: 500}}>Active</Typography>
                  </ToggleButton>
                  <ToggleButton value='inactive' aria-label='left aligned'>
                    <Typography sx={{fontSize: '12px', lineHeight: '18px', fontWeight: 500}}>Completed</Typography>
                  </ToggleButton>
                </ToggleButtonGroup> */}
                  {statusList.map(item =>
                    item !== null ? (
                      <ToggleButton key={item} value={item} aria-label='left aligned'>
                        <Typography sx={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500 }}>{item}</Typography>
                      </ToggleButton>
                    ) : (
                      ''
                    )
                  )}
                </ToggleButtonGroup>
              </Grid>
              <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
                <Button size='medium' onClick={handleCreateClick} variant='contained'>
                  Create Batch
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={tableData}
            getRowId={row => row.batchId}
            loading={false}
            columns={columns}
            onRowClick={rows => {
              gotoEditMode(rows.id)
            }}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default BatchList
