// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'

/* import FormControl from '@mui/material/FormControl' */
// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

import { useDispatch, useSelector } from 'react-redux'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import CustomInput from 'src/@core/layouts/components/shared-components/PickersCustomInput'

import { useForm, Controller } from 'react-hook-form'
import { updateBatch } from 'src/store/apps/schedule'
import { FormHelperText, TextField } from '@mui/material'
import { fetchCourse, fetchTrainingLocations } from 'src/configs/services'
import { submitBatch } from 'src/store/apps/batches'

const Schedule = props => {
  const { handleNext, handleBack } = props

  // ** Hooks
  const auth = useAuth()

  const data = useSelector(state => state.schedule)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    fetchCourse({}, () => {}, setAllCourses)
    fetchTrainingLocations({}, () => {}, setTrainingLocations)
  }, [])

  const [allCourses, setAllCourses] = useState([])
  const [trainingLocations, setTrainingLocations] = useState([])
  const [course, setCourse] = useState({})
  const [trainLocation, setTrainLocation] = useState({})

  const setSelectedCourse = value => {
    let courseArray = allCourses.filter(item => item.id == value)
    if (courseArray.length) {
      setValue('course', courseArray[0])
      setCourse(courseArray[0])
    } else {
      setValue('course', {})
      setCourse({})
    }

    console.log('courseArray', courseArray)
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: useMemo(() => {
      return data
    }, [data])
  })

  useEffect(() => {
    reset(props.data)
  }, [props.data, reset])

  const setSelectedLocation = value => {
    let locArray = trainingLocations.filter(item => item.id == value)
    if (locArray.length) {
      setValue('venue', 'Delhi')
      setTrainLocation('Delhi')
    } else {
      setValue('venue', '')
      setTrainLocation('')
    }
  }

  const onSubmit = () => {
    dispatch(updateBatch({ ...getValues() }))
    handleNext()
  }

  const handleSave = () => {
    if (!errors.length) {
      toast.success('Schedule information is saved.')
      dispatch(updateBatch({ ...getValues() }))
      dispatch(submitBatch({ ...getValues() }))
    } else {
      toast.error('Fix Schedule information Errors.')
    }
  }

  return (
    <CardContent>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.courseName)}
                htmlFor='validation-basic-select'
              >
                Training Course
              </InputLabel>
              <Controller
                name='courseName'
                control={control}
                rules={{ required: true }}
                defaultValue={data?.course?.courseName}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label={'Training Course'}
                    onChange={e => {
                      setSelectedCourse(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors.courseName)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allCourses.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.courseName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.courseName && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Training course is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='batchName'
                control={control}
                rules={{ required: true }}
                defaultValue={data.batchName}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label={'Batch name'}
                    onChange={onChange}
                    error={Boolean(errors.batchName)}
                    type={'text'}
                  />
                )}
              />
              {errors.batchName && (
                <FormHelperText sx={{ color: 'error.main' }} id='batchName-error'>
                  Batch Name is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='batchSize'
                control={control}
                rules={{ required: true }}
                defaultValue={data.batchSize}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label={'Batch Size'}
                    onChange={onChange}
                    error={Boolean(errors.batchSize)}
                    type={'number'}
                  />
                )}
              />
              {errors.batchSize && (
                <FormHelperText sx={{ color: 'error.main' }} id='batchSize-error'>
                  Batch size is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl>
              <p>
                Course ID : {getValues().course?.courseName} <br /> Course Description :{' '}
                {getValues().course?.courseDescription}
              </p>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant={'outlined'}>
              <InputLabel id='training-center-label'>Training Center</InputLabel>
              <Controller
                name='training_center_id'
                control={control}
                rules={{ required: true }}
                defaultValue={data.training_center_id}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label={'Training Course'}
                    onChange={e => {
                      setSelectedLocation(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors.training_center_id)}
                    id='training-center-select'
                    labelId='training-center-label'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {trainingLocations.map(item => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.training_center_id && (
                <FormHelperText sx={{ color: 'error.main' }}>Training center is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant={'outlined'}>
              <InputLabel id='training-location-label'>Training Location : {getValues().venue}</InputLabel>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={4}>
            <DatePickerWrapper>
              <FormControl fullWidth variant={'outlined'}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                  <div>
                    <Controller
                      name='trainingDate'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data.trainingDate}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          selected={value}
                          onChange={e => onChange(e)}
                          id='basic-input'
                          popperPlacement={'bottom-start'}
                          placeholderText='Training Date'
                          customInput={
                            <CustomInput
                              value={value}
                              name='trainingDate'
                              onChange={onChange}
                              label='Training Date'
                              error={Boolean(errors.trainingDate)}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </Box>
                {errors.trainingDate && (
                  <FormHelperText sx={{ color: 'error.main' }}>Training date is required</FormHelperText>
                )}
              </FormControl>
            </DatePickerWrapper>
          </Grid> */}

          <Grid item xs={12} sm={12}>
            <DatePickerWrapper>
              <FormControl fullWidth variant={'outlined'}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                  <div>
                    <Controller
                      name='startDate'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data.startDate}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          showTimeSelect
                          timeIntervals={15}
                          dateFormat='MM/dd/yyyy h:mm aa'
                          id='time-only-picker'
                          popperPlacement={'bottom-start'}
                          selected={value}
                          onChange={e => onChange(e)}
                          customInput={
                            <CustomInput
                              value={value}
                              onChange={onChange}
                              label='Start Time'
                              error={Boolean(errors.startDate)}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='endDate'
                      control={control}
                      rules={{ required: true }}
                      defaultValue={data.endDate}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          showTimeSelect
                          timeIntervals={15}
                          dateFormat='MM/dd/yyyy h:mm aa'
                          id='time-only-picker'
                          popperPlacement={'bottom-start'}
                          selected={value}
                          onChange={e => onChange(e)}
                          customInput={
                            <CustomInput
                              value={value}
                              onChange={onChange}
                              label='End Time'
                              error={Boolean(errors.endDate)}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </Box>
                {(errors.startDate || errors.endDate) && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.startDate && 'Training start time is required'}
                    {errors.endDate && '  Training end time is required'}
                  </FormHelperText>
                )}
              </FormControl>
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size='large' variant='outlined' color='secondary' disabled={true} onClick={handleBack}>
              Back
            </Button>
            <div>
              <Button size='large' onClick={handleSave} variant='contained' sx={{ marginRight: '20px' }}>
                Save
              </Button>
              <Button size='large' type='submit' variant='contained'>
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default Schedule
