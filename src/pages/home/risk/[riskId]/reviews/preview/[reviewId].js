import React, { useState, useMemo, useEffect } from 'react'

import { CircularProgress, FormControl, InputLabel } from '@mui/material'
import { Button, Divider, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'
import { getAdditionlStakeHoldersDropDown, getNextStepsDropDown } from 'src/store/apps/common'

const PreviewReview = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])
  const [nextstep_dropdown, set_nextstep_dropdown] = useState([])

  const [singleReviewData, setSingleReviewData] = useState({
    id: 0,
    review: 0,
    reviewer: 0,
    next_step: 0,
    reviewdate: '',
    comment: '',
    nextreviewdate: ''
  })

  useEffect(() => {
    getNextStepsDropDown(set_nextstep_dropdown, () => {})
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown, () => {})
  }, [])

  useEffect(() => {
    apiHelper(`${authConfig.riskDevRakshitah_base_url}get/${router.query.reviewId}`, 'get', null, {})
      .then(res => {
        setSingleReviewData({
          ...res.data,
          reviewdate: moment(res.data.reviewdate).format('YYYY-MM-DD'),
          nextreviewdate: moment(res.data.nextreviewdate).format('YYYY-MM-DD')
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [router.query.reviewId])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>Review Preview</h3>
        <Grid
          item
          sx={{
            marginLeft: 'auto',
            '@media screen and (max-width:600px)': {
              flexDirection: 'row',
              marginLeft: 0
            }
          }}
          xs={12}
          md={4}
          style={{ display: 'flex', justifyContent: 'right', marginBottom: 20 }}
        >
          <Button
            xs={2}
            variant='contained'
            size='medium'
            onClick={() => router.push(`/home/risk/${router.query.riskId}/reviews`)}
          >
            Back
          </Button>
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
        <Grid container spacing={4} marginTop={'10px'}>
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                type='date'
                variant='outlined'
                label={t('Review Date')}
                name='reviewdate'
                value={singleReviewData.reviewdate}
                // onChange={e => handleDateChange('reviewdate', e.target.value)}
                disabled={true}
              />
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                {t('Reviewer')}
              </InputLabel>
              <Select
                value={singleReviewData.reviewer}
                fullWidth
                label={t('Reviewer')}
                //   onChange={e => {
                //     handleChange('reviewer', e.target.value)
                //   }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
              >
                {additionalstakeholders_dropdown.map(c => (
                  <MenuItem key={c.id} value={Number(c.id)}>
                    {c.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                type='number'
                style={{ width: '100%' }}
                label={t('Review')}
                name='review'
                value={singleReviewData.review}
                //   onChange={e => handleChange('review', e.target.value)}
                required
                disabled={true}
              />
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                {t('Next Step')}
              </InputLabel>
              <Select
                value={singleReviewData.next_step}
                fullWidth
                label={t('Next Step')}
                //   onChange={e => {
                //     handleChange('next_step', e.target.value)
                //   }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
              >
                {nextstep_dropdown.map(c => (
                  <MenuItem key={c.lookupId} value={Number(c.lookupId)}>
                    {c.lookupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                type='date'
                variant='outlined'
                label={t('Next Review Date')}
                name='reviewdate'
                value={singleReviewData.nextreviewdate}
                disabled={true}
              />
            </FormControl>
          </Grid>
          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <TextField
                type='text'
                style={{ width: '100%' }}
                label={t('Comments')}
                name='comment'
                value={singleReviewData.comment}
                required
                disabled={true}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default PreviewReview
