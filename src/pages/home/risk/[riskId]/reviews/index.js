// // ** React Imports
import { useState, useEffect, useCallback } from 'react'
//  ** Next Import
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

// //*axios import
import { deleteSingleReview, getReviews } from 'src/store/apps/Risks/reviews/ReviewsServices'
import { useTranslation } from 'react-i18next'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const router = useRouter()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    getReviews(router.query.riskId, setReviews)
  }, [router.query.riskId])

  const columns = [
    // { flex: 0.05, field: 'id', headerName: 'ID' },
    { flex: 0.15, field: 'reviewdate', headerName: 'ReviewDate' },
    {
      flex: 0.15,
      field: 'comment',
      headerName: 'Comment',
      renderCell: ({ row }) => {
        return (
          <p style={{ width: '100%', cursor: 'pointer' }} onClick={() => handleRowClick(row.id)}>
            {row.comment}
          </p>
        )
      }
    },
    { flex: 0.15, field: 'reviewer', headerName: 'Reviewer' },
    { flex: 0.15, field: 'review', headerName: 'Review' },
    { flex: 0.15, field: 'next_step', headerName: 'NextStep' },
    { flex: 0.15, field: 'nextreviewdate', headerName: 'NextReviewDate' },
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
            <IconButton
              onClick={() =>
                router.push({
                  pathname: `/home/risk/${router.query.riskId}/reviews/edit/${row.id}`
                })
              }
              sx={{ color: 'blue' }}
            >
              <EditIcon titleAccess='edit' />
            </IconButton>
            <IconButton sx={{ color: 'red' }}>
              <DeleteIcon
                onClick={() => deleteSingleReview(row.id, router.query.riskId, setReviews)}
                titleAccess='Delete Review'
              />
            </IconButton>
          </>
        )
      }
    }
  ]

  const handleRowClick = id => {
    router.push(`/home/risk/${router.query.riskId}/reviews/preview/${id}`)
  }

  return (
    <>
      <div style={{ height: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Reviews')}</h2>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}></Grid>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button size='medium' variant='contained' onClick={() => router.push(`/home/risk`)}>
                Back
              </Button>
              <Button
                size='medium'
                variant='contained'
                sx={{ marginLeft: '10px' }}
                onClick={() => router.push(`/home/risk/${router.query.riskId}/reviews/new`)}
              >
                Add Review
              </Button>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <DataGrid
          rows={reviews}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={row => row.id + row.comment}
          // onRowClick={data => handleRowClick(data.row.id)}
        />
      </div>
    </>
  )
}

export default Reviews
