import React, { useState, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Button, Divider, Select } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useRouter } from 'next/router'
import { allReview } from 'src/store/apps/Risks/RiskService'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import authConfig from 'src/configs/auth'

const review = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  const [review_date, set_review_date] = useState('')
  const [review, set_review] = useState('')
  const [next_review_date, set_next_review_date] = useState('')
  const [reviewer, set_reviewer] = useState('')
  const [next_step, set_next_step] = useState('')
  const [comments, set_comments] = useState('')

  const fetch_review = async () => {
    const res = await fetch(`${authConfig.getmanagmentReview}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('review is', data)
    set_review_date(data.data.reviewdate)
    set_review(data.data.review)
    set_next_review_date(data.data.nextreviewdate)
    set_reviewer(data.data.reviewer)
    set_next_step(data.data.nextstep)
    set_comments(data.data.comment)
    // set_team_dropdown(data.data.users);
  }

  useEffect(() => {
    allReview(() => {}, setAll)
  }, [])

  useEffect(() => {
    fetch_review()
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
            <TextField type='text' variant='outlined' id='outlined-basic' label='ReviewDate' value={review_date} />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              Reviewer
            </InputLabel> */}
            <TextField
              type='text'
              variant='outlined'
              label='Reviewer'
              //  value={all?.data?.reviewer}
              value={reviewer}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              Review
            </InputLabel> */}
            <TextField
              type='text'
              variant='outlined'
              label='Review'
              //  value={all?.data?.review}
              value={review}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              NextStep
            </InputLabel> */}
            <TextField
              type='text'
              variant='outlined'
              label='NextStep'
              //  value={all?.data?.nextstep}
              value={next_step}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              NextReviewDate
            </InputLabel> */}
            <TextField
              type='text'
              variant='outlined'
              label='NextReviewDate'
              //  value={all?.data?.nextreviewdate}
              value={next_review_date}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              comments
            </InputLabel> */}
            <TextField type='text' label='comments' value={comments} />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default review
