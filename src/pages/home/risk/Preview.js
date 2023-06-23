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

//  ** Icon Imports
import Icon from 'src/@core/components/icon'

//  ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import { Button, ToggleButtonGroup } from '@mui/material'

//  ** Next Import
import { useRouter } from 'next/router'

// //*axios import

import { allReview } from 'src/store/apps/Risks/RiskService'

const Preview = () => {
  const dispatch = useDispatch()

  const fdelete = () => {
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
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success')

        Swal.fire('Deleted!', 'Your file has not been deleted.', 'error')
      }
    })
  }

  const data = useSelector(state => state.selectRisk)

  useEffect(() => {
    allReview(() => {}, setAll)
    console.log('get all review:', all)
  }, [])

  const openEdit = () => {
    router.push('/home/Document/editDocument')
  }

  const router = useRouter()
  const [all, setAll] = useState([])

  //   const documentArray = all?.data?.documents
  //   console.log('docArrray:', documentArray)

  const review = all?.data
  console.log('review:', review)

  const gotoCancel = () => {
    router.push(`/home/risk`)
  }

  const columns = [
    { flex: 0.15, field: 'id', headerName: 'ID' },
    { flex: 0.15, field: 'reviewdate', headerName: 'ReviewDate' },
    { flex: 0.15, field: 'reviewer', headerName: 'Reviewer' },
    { flex: 0.15, field: 'review', headerName: 'Review' },
    { flex: 0.15, field: 'nextstep', headerName: 'NextStep' },
    { flex: 0.15, field: 'nextreviewdate', headerName: 'NextReviewDate' },
    { flex: 0.15, field: 'comment', headerName: 'Comment' }

    // {
    //   filed: 'action',
    //   headerName: 'Actions',
    //   renderCell: ({ rows }) => {
    //     return (
    //       <>
    //         {Array.isArray(documentArray) &&
    //           documentArray.map((r, i) =>
    //             i == 0 ? (
    //               <IconButton sx={{ color: 'blue' }} onClick={openEdit}>
    //                 <ModeEditIcon />
    //               </IconButton>
    //             ) : null
    //           )}
    //         <IconButton sx={{ color: 'red' }} onClick={fdelete}>
    //           <DeleteIcon />
    //         </IconButton>
    //       </>
    //     )
    //   }
    // }
  ]

  const rows = [{ ...review }]
  //object print

  //   Array.isArray(review) && review.map(r => rows.push(r))

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
              <Button size='medium' variant='contained' onClick={gotoCancel}>
                cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={row => row.id + row.comment}
        />
      </div>
    </>
  )
}
export default Preview
