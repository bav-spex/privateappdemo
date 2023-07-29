import React, { useState, useMemo, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Button, Divider, Select } from '@mui/material'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { getAdditionlStakeHoldersDropDown, getNextStepsDropDown } from 'src/store/apps/common'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import apiHelper from 'src/store/apiHelper'
import { toast } from 'react-hot-toast'

const NewReview = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const currentDate = moment().format('YYYY-MM-DD')
  const nextDayDate = moment(moment(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])
  const [nextstep_dropdown, set_nextstep_dropdown] = useState([])

  const [singleReviewData, setSingleReviewData] = useState({
    id: 0,
    review: 0,
    reviewer: 0,
    next_step: 0,
    reviewdate: currentDate,
    comment: 'string',
    nextreviewdate: nextDayDate
  })

  useEffect(() => {
    getNextStepsDropDown(set_nextstep_dropdown, () => {})
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown, () => {})
  }, [])

  // Review
  // Reviewer
  // next Step
  // Comments
  const handleChange = (name, value) => {
    // console.log(name, value)
    setSingleReviewData({ ...singleReviewData, [name]: value })
  }

  // nextreviewdate
  const handleDateChange = (name, value) => {
    // console.log(name, value)
    setSingleReviewData({ ...singleReviewData, [name]: value })
  }

  //api to save the details of the reviews
  const onSubmit = async values => {
    const payload = {
      ...singleReviewData,
      reviewdate: moment(singleReviewData.reviewdate).format('MM/DD/YYYY'),
      nextreviewdate: moment(singleReviewData.nextreviewdate).format('MM/DD/YYYY')
    }
    apiHelper(`${authConfig.riskDevRakshitah_base_url}risk/${router.query.riskId}/reviews/submit`, 'post', payload, {})
      .then(res => {
        toast.success('Review Created')
        router.push(`/home/risk/${router.query.riskId}/reviews`)
        setSingleReviewData({
          review: '',
          reviewer: 0,
          next_step: 0,
          reviewdate: currentDate,
          comment: '',
          nextreviewdate: nextDayDate
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>New Review</h3>
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
            Cancel
          </Button>
          <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={onSubmit}>
            Save Review
          </Button>
        </Grid>
      </div>

      <Divider />
      <Grid container spacing={4}>
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
              onChange={e => {
                handleChange('reviewer', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
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
              onChange={e => handleChange('review', e.target.value)}
              required
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
              onChange={e => {
                handleChange('next_step', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
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
              onChange={e => handleDateChange('nextreviewdate', e.target.value)}
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
              onChange={e => handleChange('comment', e.target.value)}
              required
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default NewReview
