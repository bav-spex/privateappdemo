import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import { SaveAllM, fetchMit } from 'src/pages/home/mitigation/mit_service'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch } from 'react-redux'
// import { addMits } from 'src/store/apps/mitigation'
import { saveMitigation } from 'src/pages/home/mitigation/mit_service'
import toast from 'react-hot-toast'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Mitigation = () => {
  const data = useSelector(state => state.mitList)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchMit(() => {}, setAllMit)
  }, [])

  // useEffect(() => {}, [])
  // const [saveMit, setSavemit] = useState([])

  const [allMit, setAllMit] = useState([])
  const [mit, setMit] = useState([])
  const [save, setSave] = useState({})

  const setMiti = value => {
    let mitArray = allMit.data?.filter(item => item.id == value)
    if (mitArray.length) {
      setValue('risk', mitArray[0])
      setRisk(mitArray[0])
    } else {
      setValue('mit', {})
      setMit({})
    }
    console.log('mitkArray', mitArray)
  }
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
  const MitSub = values => {
    console.log('values:', values)
    saveMitigation(values, () => {}, setSave)
  }
  const SubmitMiti = () => {
    toast.success('Saved Mitigation')
  }

  const saveMitigations = values => {
    console.log('values:', values)
    // SaveAllM(values, () => {}, setSave)
  }

  const upload = e => {
    console.log(e.target.files)
  }
  const [tabvalue, setTabValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const router = useRouter()
  const gotoCancel = () => {
    router.push(`/home/risk`)
  }
  return (
    <CardContent>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={handleSubmit(saveMitigations)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Mitegation</h3>
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
              // onClick={SubmitRisk}
              // onSubmit={handleSubmit(onSubmit)}
              onClick={SubmitMiti}
              onSubmit={handleSubmit(saveMitigations)}
            >
              save
            </Button>
          </Grid>
        </div>
        <Divider />
        <Grid container spacing={2}>
          <Grid
            item
            sx={{
              width: '40%',
              '@media screen and (max-width:600px)': {
                flexDirection: 'row',
                marginLeft: 0
              }
            }}
          >
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Mitigation submission.date
              </InputLabel>
              <TextField
                type='text'
                variant='outlined'
                value={allMit?.data?.mitigationsubmissiondate}
                sx={{ p: 3.5 }}
              />
            </FormControl>
          </Grid>
          {/* submisiion date */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <h5>Current solution:</h5>
                <TextField type='text' />
              </div>
            </FormControl>
          </Grid>
          {/* current solution  */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                planned mitigation Date
              </InputLabel>
              <TextField variant='filled' type='text' value={allMit?.data?.plannedmitigationdate} sx={{ p: 2.5 }} />
            </FormControl>
          </Grid>
          {/* planned mitigation date */}

          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <h5>Security Requirments:</h5>

                <TextField type='text' />
              </div>
            </FormControl>
          </Grid>
          {/* end of security Requirments */}

          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Planning stratergy
              </InputLabel>
              <Controller
                name='planning stratergy'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'site location'}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                    onChange={e => {
                      setMit(e.target.value)
                      onChange(e)
                    }}
                  >
                    <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.planningstrategy}>{allMit?.data?.planningstrategy}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  planning Stratergy
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of Planing stratergy  */}

          <Grid item sx={{ width: '42%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>
                <h5 style={{ marginLeft: '20px' }}>Security Reccomendations:</h5>
                <TextField type='text' style={{ width: '65%' }} />
              </div>
            </FormControl>
          </Grid>
          {/* //end of externalreferenceid */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Mitigation Effort:
              </InputLabel>
              <Controller
                name='mitigation Effort'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Mitigation Effort'}
                    onChange={e => {
                      setMit(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationeffort}>{allMit?.data?.mitigationeffort}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigation Effort is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of mitigation effort */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <h5>Supporting Documentation:</h5>
                <TextField type='file' />
              </div>
            </FormControl>
          </Grid>
          {/* / end of Document/ */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Mitigation Cost:
              </InputLabel>
              <Controller
                name='mitigation cost'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Mitigation Cost'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigation Cost
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* /end of mitigation cost/ */}

          <Grid xs={12}>
            {/* end of mitigation team */}
            <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Percent:
                </InputLabel>

                <TextField type='number' variant='filled' sx={{ p: 2.5 }} value={allMit?.data?.mitigationpercent} />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Percent
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Controls:
                </InputLabel>
                <Controller
                  name='mitigation owner'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      fullWidth
                      label={'Mitigation Owner'}
                      onChange={e => {
                        setMit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None is Selected</MenuItem>
                      <MenuItem value={allMit?.data?.mitigationcontrols}>{allMit?.data?.mitigationcontrols}</MenuItem>
                    </Select>
                  )}
                />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Owner
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}
            {/* end of mitigation controls */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default Mitigation
