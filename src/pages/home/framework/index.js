// // ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

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
import Swal from 'sweetalert2'
import axios from 'axios'
//!list import
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useTranslation } from 'react-i18next'
import withRoot from '../withRoot'
import { useTheme } from '@material-ui/core/styles'

//  ** Icon Imports
import Icon from 'src/@core/components/icon'

//  ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button, ToggleButtonGroup } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// //*axios import
// import { allFrameWorks, fwa } from 'src/pages/home/frameworks/frameworkService'
import { allFrameWorks, fwa, deleteFramework } from './frameworkService'
// console.log('allFrameworks:', allFrameWorks)

import { addRisk, getriskList, reviewRisk } from 'src/store/apps/Risks'
import AddEditFrameWorks from './AddEditFramework'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const FrameWorkList = () => {
  const dispatch = useDispatch()

  // const data = useSelector(state => state.selectRisk)

  const { t, i18n } = useTranslation()
  const theme = useTheme()
  // document.body.dir = i18n.dir();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const classes = useStyles()

  const fdelete = frameworkId => {
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
          fwa(() => {}, setAll)
        }
        const errorCallback = response => {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success')
          // Swal.fire('Deleted!', 'Your file has not been deleted.', 'error')
        }
        deleteFramework(frameworkId, errorCallback, successCallback)
      }
    })
  }

  const user_data = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    fwa(() => {}, setAll)
  }, [])

  const router = useRouter()
  const [all, setAll] = useState([])
  console.log('allf:', all)

  const handleCreateClick = id => {
    console.log('editing framework :', id)
    router.push({
      pathname: '/home/framework/edit',
      query: { keyword: id }
    })
  }

  // function handleRowClick(params) {
  //   // The `params` argument contains information about the clicked row
  //   const id = params.row.id;

  //   router.push({
  //     pathname: '/home/framework/Framework_info',
  //     query: { keyword: id },
  //   });
  // }

  const createNew = () => {
    router.push(`/home/framework/CreateFrameWork`)
  }

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const frameWorksArray = [...all]
  console.log('frameWorksArray is', frameWorksArray)

  const columns = [
    {
      flex: 0.5,
      width: 50,
      field: 'framework_Name',
      headerName: t('FrameWork Name'),
      renderCell: params => {
        const handleRowClick = () => {
          console.log('framework row clicked')
          const id = params.row.id

          router.push({
            pathname: '/home/framework/Framework_info',
            query: { keyword: id }
          })
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
      // width: 300,
      flex: 0.15,
      renderCell: params => {
        const id = params.row.id
        return (
          <>
            {user_data.role == 'admin' ? (
              <>
                <IconButton sx={{ color: 'blue' }} onClick={() => handleCreateClick(id)}>
                  <ModeEditIcon titleAccess='Edit Framework' />
                </IconButton>
                <IconButton sx={{ color: 'red' }} onClick={() => fdelete(id)}>
                  <DeleteIcon titleAccess='Delete Framework' />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </>
        )
        // return (
        //   <>
        //     {Array.isArray(frameWorksArray) &&
        //       frameWorksArray.map((r, i) =>
        //         i >= 0 ? (
        //           <>
        //           <IconButton sx={{ color: 'blue' }} onClick={()=> handleCreateClick(r.id)}>
        //             <ModeEditIcon />
        //           </IconButton>
        //           <h1>{r.id}</h1>
        //           </>
        //         ) : null
        //       )}
        //     <IconButton sx={{ color: 'red' }} onClick={fdelete}>
        //       <DeleteIcon />
        //     </IconButton>
        //   </>
        // )
      }
    }
  ]

  const rows = []

  Array.isArray(frameWorksArray) && frameWorksArray.map(r => rows.push(r))

  console.log('rows:', rows)

  const [value, setValue] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const [operation, setOperation] = useState('add')

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const addFrame = () => {
    setOpenDialog(true)
    setOperation('edit')
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Frameworks')}</h2>
          <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
            {user_data.role == 'admin' ? (
              <Button size='medium' variant='contained' onClick={createNew}>
                {t('Create framework')}
              </Button>
            ) : (
              ''
            )}
            ,
            {user_data.role == 'admin' ? (
              <Button size='medium' variant='contained'>
                {t('Import Framework')}
              </Button>
            ) : (
              ''
            )}
          </Grid>
        </div>
        <AddEditFrameWorks open={openDialog} handleClose={handleClose} />

        <Divider />
        <DataGrid
          rows={rows}
          getRowId={row => row.framework_Name + row.framework_Details + row.id}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          className={classes.customBackground}
          // onRowClick={handleRowClick}
        />
      </div>
    </>
  )
}

export default FrameWorkList
