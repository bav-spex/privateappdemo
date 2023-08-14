// // ** React Imports
import { useState, useEffect, useMemo } from 'react'

//  ** Next Import

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, CircularProgress } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
// //*axios import
import { useTranslation } from 'react-i18next'
import { deleteSingleReview, getReviews } from 'src/store/apps/Risks/reviews/ReviewsServices'

const Reviews = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews(router.query.riskId, setReviews, setLoading)
  }, [router.query.riskId])

  const columns = useMemo(() => {
    return [
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
              <IconButton sx={{ color: '#ed3700' }}>
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
  }, [])

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
        {loading ? (
          <Box
            sx={{
              height: '20vh',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <CircularProgress disableShrink sx={{ mt: 6, color: '#060056' }} />
          </Box>
        ) : (
          <DataGrid
            rows={reviews}
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={row => row.id + row.comment}
            // onRowClick={data => handleRowClick(data.row.id)}
          />
        )}
      </div>
    </>
  )
}

export default Reviews
