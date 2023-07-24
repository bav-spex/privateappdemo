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
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import auth from 'src/configs/auth'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import ContactSupportIcon from '@mui/icons-material/ContactSupport'
// import PreviewIcon from '@mui/icons-material/Preview'

import { makeStyles } from '@material-ui/core/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteUser } from 'src/store/apps/user'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button } from '@mui/material'

// ** Next Import
import { useRouter } from 'next/router'
// import { getBatchList } from 'src/store/apps/batches'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { updateBatch } from 'src/store/apps/schedule'
import { left } from '@popperjs/core'

import { useTranslation } from 'react-i18next'
import withRoot from '../../withRoot'
import { useTheme } from '@material-ui/core/styles'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify'
import { deleteControl, getControlList } from 'src/pages/home/governance/controls/controlService'

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

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const ControlList = () => {
  // ** State

  const [value, setValue] = useState('')
  const [bathcStatus, setBatchStatus] = useState('Active')

  const [pageSize, setPageSize] = useState(10)

  // const batchList = useSelector(state => state.batches.batchList)
  // const [tableData, setTableData] = useState(batchList);
  // const [statusList, setStatusList ] = useState(Array.from(new Set(batchList.map(item => item.status))));

  const [controlList, setControlList] = useState([])

  const user_data = JSON.parse(localStorage.getItem('userData'))
  console.log('userdata is', user_data)

  const router = useRouter()

  const classes = useStyles()

  const { t, i18n } = useTranslation()
  const theme = useTheme()
  // document.body.dir = i18n.dir();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const columns = [
    {
      flex: 0.11,
      width: 50,
      field: 'name',
      headerName: t('Name'),
      renderCell: params => {
        const handleRowClick = () => {
          const id = params.row.id

          // Redirect the user to the desired page
          router.push({
            pathname: '/home/governance/controls/edit_control/',
            query: { keyword: 3 }
          })
        }
        return <div onClick={handleRowClick}>{params.value}</div>
      }
    },
    { flex: 0.11, width: 50, field: 'frameworks', headerName: t('Framework ID') },
    { flex: 0.12, minWidth: 5, field: 'control-number', type: 'number', headerName: t('Control Number') },
    { flex: 0.08, minWidth: 10, field: 'status', headerName: t('Status') },
    // {
    //   field: 'submissiondate',
    //   headerName: 'SUbmission Date ',
    //   type: 'number',
    //   flex: 0.14,
    //   minWidth: 25
    // },
    // {
    //   field: 'mitigation',
    //   headerName: 'mitigation ',
    //   type: 'number',
    //   flex: 0.1,
    //   minWidth: 25,
    //   textAlign: 'center'
    // },
    // {
    //   field: 'managementreview',
    //   headerName: 'managment review ',
    //   type: 'number',
    //   flex: 0.15,
    //   minWidth: 25,
    //   allignItems: 'center',
    //   textAlign: 'center'
    // },

    {
      field: 'action',
      headerName: t('Action'),
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      // width: 300,
      flex: 0.15,
      valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: params => {
        const id = params.row.id
        return (
          <>
            {user_data.role == 'admin' ? (
              <>
                <IconButton onClick={() => handleEditClick(id)} sx={{ color: 'green' }}>
                  <EditIcon titleAccess='Edit Control' />
                </IconButton>

                <IconButton onClick={() => deleteControlId(id)} sx={{ color: 'red' }}>
                  <DeleteIcon titleAccess='Delete Control' />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </>
        )
        // return (
        //   <>
        //     {Array.isArray(controlList) &&
        //       controlList.map((r, i) =>
        //         i == 0 ? (
        //             <>
        //           <IconButton onClick={()=> handleEditClick(r.id)} sx={{ color: 'green' }}>
        //             <EditIcon />
        //           </IconButton>

        //           <IconButton  sx={{ color: 'red' }}>
        //             <DeleteIcon />
        //           </IconButton>
        //           </>
        //         ) : null
        //       )}
        //     {/* <IconButton onClick={openMitigation} sx={{ color: 'green' }}>
        //       <ContactSupportIcon />
        //     </IconButton>
        //     <IconButton onClick={handleCreateClick} sx={{ color: 'red' }}>
        //       <PreviewIcon />
        //     </IconButton> */}
        //   </>
        // )
      }
    }
  ]

  // ** Hooks
  const dispatch = useDispatch()

  const fetch_control_data = async () => {
    let successCallback = (response) => {
      setControlList(response.data.controls)
    }
    let errorCallback = (response) => {
      toast.error('Something went wrong')
    }
    getControlList(errorCallback, successCallback);
  }

  // useEffect(() => {
  //   dispatch(getBatchList({ q: value }))
  // }, [dispatch, value])

  //   useEffect(() => {

  //     fetch_control_data();
  //     const tableData = batchList.filter(item => item.status == bathcStatus)
  //     setTableData(tableData);
  //     const newSet = new Set(batchList.map(item => item.status))
  //     setStatusList(Array.from(newSet))
  //   }, [batchList])

  useEffect(() => {
    fetch_control_data()
  }, [])

  const handleEditClick = id => {
    // router.push(`/home/governance/controls/edit_control/${id}`);
    router.push({
      pathname: '/home/governance/controls/edit_control/',
      query: { keyword: 3 }
    })
  }

  function handleRowClick(params) {
    // The `params` argument contains information about the clicked row
    const id = params.row.id

    // Redirect the user to the desired page
    router.push({
      pathname: '/home/governance/controls/edit_control/',
      query: { keyword: id }
    })
  }

  function handleCellClick(params) {
    console.log(params)
    console.log(`Clicked on Age ${params.field}`)
  }

  function deleteControlId(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        const successCallback = response => {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success')
        }
        const errorCallback = response => {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success')
          // Swal.fire('Deleted!', 'Your file has not been deleted.', 'error');
        }
        deleteControl(id, errorCallback, successCallback)
      }
    })
  }

  const new_control = () => {
    router.push('/home/governance/controls/new_control')
  }

  return (
    <>
      <div style={{ height: 500 }}>
        {/* <Grid container spacing={6}> */}
        {/* <Grid item xs={12}> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardHeader title={t('Controls')} />
          <CardContent>
            <Grid container spacing={6}>
              {user_data.role == 'admin' ? (
                <Grid item sm={12} xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button variant='contained' onClick={new_control}>
                      {t('New Control')}
                    </Button>
                  </div>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </CardContent>
        </div>
        <Divider />
        <DataGrid
          rows={controlList}
          getRowId={row => row.id}
          loading={true}
          columns={columns}
          // onRowClick={(rows)=>{gotoEditMode(rows.id)}}
          // checkboxSelection
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          onCellClick={handleCellClick}
          className={classes.customBackground}
          // onRowClick={handleRowClick}
        />
        {/* </Grid> */}
        {/* </Grid> */}
      </div>
    </>
  )
}

export default ControlList
