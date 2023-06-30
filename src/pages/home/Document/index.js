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
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';


import { useTranslation } from 'react-i18next';
import withRoot from '../withRoot'
import { useTheme } from '@material-ui/core/styles';

//  ** Icon Imports
import Icon from 'src/@core/components/icon'

//  ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import { Button, ToggleButtonGroup } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// //*axios import

import { getDocument, deleteDocument } from 'src/pages/home/Document/DocService'


const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white', // Replace with your desired background color
  },
});


const DocumentList = () => {
  const dispatch = useDispatch()

  const user_data=JSON.parse(localStorage.getItem('userData'));
  console.log("userdata is", user_data);

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  // document.body.dir = i18n.dir();

  const classes = useStyles();

  const changeLanguage = (lng) => { 
    i18n.changeLanguage(lng)
  //   document.body.dir = i18n.dir();
  //   theme.direction = i18n.dir();
  }

  const fdelete = (id) => {
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
        const successCallback = (response) => {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
          getDocument(() => {}, setAll);
        }
        const errorCallback = (response) => {
          Swal.fire('Deleted!', 'Your file has not been deleted.', 'error')
        }
        deleteDocument(id, errorCallback, successCallback);
      }
    })
  }

  const data = useSelector(state => state.selectRisk)

  useEffect(() => {
    getDocument(() => {}, setAll)
    console.log('getDocument:', all)
  }, [])

  const openEdit = () => {
    router.push('/home/Document/editDocument')
  }

  // function handleRowClick(params) {
  //   // The `params` argument contains information about the clicked row
  //   // const rowId = params.id;

  //   // Redirect the user to the desired page
  //   router.push('/home/Document/Document_info')
  // }

  const router = useRouter()
  const [all, setAll] = useState([])

  const documentArray = all?.data?.controls
  
  const goToEdit = (id) => {
    console.log("goToEdit in:", id);
    router.push({
      pathname: '/home/Document/SaveDocument/',
      query: { keyword: id },
    });
    console.log("goToEdit out:", id);
  }

  const columns = [
    { flex: 0.15, field: 'doc_name', headerName: t('Document Name'),
    renderCell: (params) => {
      return (
        <div onClick={()=> goToEdit(params.row.doc_id)}>
          {params.value}
        </div>
      );
    } },
    { flex: 0.15, field: 'doc_type', headerName: t('Document Type') },
    { flex: 0.15, field: 'framework', headerName: t('Control FrameWorks') },
    { flex: 0.15, field: 'control', headerName: t('Controls') },
    { flex: 0.15, field: 'creation_date', headerName: t('Creation Date') },
    { flex: 0.15, field: 'approval_date', headerName: t('Approval Date') },
    { flex: 0.15, field: 'status', headerName: t('Status') },

    {
      field: 'action',
      headerName: t('Action'),
      renderCell: (params) => {
        return (
          <>
          {
            user_data.role=='admin'?
            <>
            <IconButton sx={{ color: 'blue' }} onClick={()=> goToEdit(params.row.doc_id)}>
              <ModeEditIcon />
            </IconButton>
            <IconButton sx={{ color: 'red' }} onClick={()=> fdelete(params.row.doc_id)}>
              <DeleteIcon />
            </IconButton>
            </>
            : ''
          }
          </>
        )
      }
    }
  ]

  const rows = []

  Array.isArray(documentArray) && documentArray.map(r => rows.push(r))

  const [value, setValue] = useState('')

  const AddDoc = () => {
    router.push('/home/Document/SaveDocument')
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
      <div style={{ height: 500 }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>{t('Documents')}</h2>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}>
            </Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
            {
            user_data.role=='admin'?
              <Button size='medium' variant='contained' onClick={AddDoc}>
                {t('Create Document')}
              </Button>
              : ''
            }
            </Grid>
          </Grid>
        </div>
        <Divider />
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={row => row.doc_name + row.framework}
          className={classes.customBackground}
          // onRowClick={handleRowClick}
        />
      </div>
    </>
  )
}
export default DocumentList
