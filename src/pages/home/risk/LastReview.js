import React, { useState, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Button, Divider, Select } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useRouter } from 'next/router'
import { allReview } from 'src/pages/home/risk/RiskService'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const review = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  useEffect(() => {
    allReview(() => {}, setAll)
  }, [])

  const [all, setAll] = useState([])
  console.log('allr:', all)

  const reviewsArray = all?.data
  console.log('reviewsArray:', reviewsArray)

  const setReview = value => {
    let reviewsArray = all.data?.filter(item => item.id == value)
    if (reviewsArray.length) {
      setValue('reviews', reviewsArray[0])
    } else {
      setValue('review', {})
      setAll({})
    }
    console.log('revieArray', reviewsArray)
  }

  // !button methods
  const gotoCancel = () => {
    router.push(`/home/risk`)
  }

  const gotoAllReviews = () => {
    router.push('/home/risk/Preview')
  }
  //!states
  const [fwList, setFwList] = useState([])
  const [cat, setCat] = useState({})

  // ** Hooks
  const {
    control,
    handleSubmit,
    values,
    getValues,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: useMemo(() => {
      return data
    }, [data])
  })

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>Last Review</h3>
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
          <Button xs={2} variant='contained' size='medium' onClick={gotoCancel}>
            cancel
          </Button>
          <Button
            type='submit '
            size='medium'
            variant='contained'
            style={{ marginLeft: '10px' }}
            onClick={gotoAllReviews}
          >
            view AllReview
          </Button>
        </Grid>
      </div>

      <Divider />
      <Grid container spacing={4}>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              ReviewDate
            </InputLabel> */}
            <TextField type='text' variant='outlined' label='ReviewDate' value={all?.data?.reviewdate} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              Reviewer
            </InputLabel> */}
            <TextField type='text' variant='outlined' label='Reviewer' value={all?.data?.reviewer} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              Review
            </InputLabel> */}
            <TextField type='text' variant='outlined' label='Review' value={all?.data?.review} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              NextStep
            </InputLabel> */}
            <TextField type='text' variant='outlined' label='NextStep' value={all?.data?.nextstep} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              NextReviewDate
            </InputLabel> */}
            <TextField type='text' variant='outlined' label='NextReviewDate' value={all?.data?.nextreviewdate} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              comments
            </InputLabel> */}
            <TextField type='text' label='comments' />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default review
