import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import {
  saveRisk,
  fetchRisk,
  category,
  riskSourceA,
  SiteLocations,
  RiskScore,
  currentlikehood,
  currentImpacts,
  fetchAssets,
  fetchTechnology
} from 'src/pages/home/risk/RiskService'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addRisk } from 'src/store/apps/Risks/index'

//Third party imports
import toast from 'react-hot-toast'

const RiskList = () => {
  const data = useSelector(state => state.riskList)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchRisk(1234, () => {}, setAllRisk)
  }, [])
  //!to save risks
  useEffect(() => {}, [])
  const [allSave, setSaveRisk] = useState([])
  //! to fetch categories
  useEffect(() => {
    category(() => {}, setCatList)
  }, [])
  //! to fetch riskSource
  useEffect(() => {
    riskSourceA(() => {}, setRsList)
    console.log('setRs:', rsList)
  }, [])

  //!to fetch sitelocations
  useEffect(() => {
    SiteLocations(1234, () => {}, setSlList)
    console.log('setLocation:', location)
  }, [])
  //!to fetch riskScore
  useEffect(() => {
    RiskScore(() => {}, setScoreList)
    console.log('setScore:', score)
  }, [])
  //! to fetch currentlikehood
  useEffect(() => {
    currentlikehood(() => {}, setCurrentList)
    console.log('setCurrent:', current)
  }, [])

  //!to fetch currentImpact
  useEffect(() => {
    currentImpacts(() => {}, setImpactList)
    console.log('currentImpact:', impacts)
  }, [])
  //!to fetch assets
  useEffect(() => {
    fetchAssets(() => {}, setAssetsList)
    console.log('setAssets:', aassets)
  }, [])
  //!to fetch technology
  useEffect(() => {
    fetchTechnology(() => {}, setTechList)
    console.log('setTech:', tech)
  }, [])
  //! to select categories
  const setCatRisk = value => {
    let category = catList.filter(item => item.id == value)
    if (category) {
      // setValue('cat', catArray[0])
      setCat(category)
    }
    console.log('catArray:', category)
  }
  //! to select impacts

  const setImpactss = value => {
    let imp = impactList.filter(item => item.id == value)
    if (imp) {
      setImpacts(imp)
    }
    console.log('impacts:', imp)
  }
  //! to select riskSource
  const setRiskSource = value => {
    let riskSource = rsList.filter(item => item.id == value)
    if (riskSource) {
      // setValue('rs:', riskSourceArray[0])
      setRs(riskSource)
    }
    console.log('riskSourceArray:', riskSource)
  }

  //!to select sitelocation
  const siteLocation = value => {
    let sites = slList.filter(item => item.id == value)
    if (sites) {
      setlocation(sites)
    }
    console.log('siteLocations:', sites)
  }
  //!to select riskScore
  const riskScore = value => {
    let scores = scoreList.filter(item => item.id == value)
    if (scores) {
      setScore(scores)
    }
    console.log('riskScore:', score)
  }

  //!to select currentlikehood

  const selectCurrent = value => {
    let currents = currentList.filter(item => item.id == value)
    if (currents) {
      setCurrent(currents)
    }

    console.log('currentlikelhood:', current)
  }

  //!to select assets
  const selectAssets = value => {
    let asse = assetsList.filter(item => item.id == value)
    if (asse) {
      setAssets(asse)
    }
    console.log('assets:', aassets)
  }
  const selectTechno = value => {
    let Techn = techList.filter(item => item.id == value)
    if (Techn) {
      setCurrent(Techn)
    }
    console.log('Technolgies', tech)
  }

  const [catList, setCatList] = useState([])
  const [cat, setCat] = useState({})
  const [rsList, setRsList] = useState([])
  const [rs, setRs] = useState({})
  const [allRisk, setAllRisk] = useState([])
  const [risk, setRisk] = useState([])
  const [slList, setSlList] = useState([])
  const [location, setlocation] = useState({})
  const [score, setScore] = useState({})
  const [scoreList, setScoreList] = useState([])
  const [current, setCurrent] = useState({})
  const [currentList, setCurrentList] = useState([])
  const [impacts, setImpacts] = useState({})
  const [impactList, setImpactList] = useState([])
  const [aassets, setAssets] = useState({})
  const [assetsList, setAssetsList] = useState([])
  const [tech, setTech] = useState({})
  const [techList, setTechList] = useState([])

  // console.log('allrisk :', allRisk)
  const setSelectedRisk = value => {
    let riskArray = allRisk.data?.riskmapping?.filter(item => item.id == value)
    if (riskArray.length) {
      setValue('risk', riskArray[0])
      setRisk(riskArray[0])
    } else {
      setValue('risk', {})
      setRisk({})
    }

    console.log('riskArray', riskArray)
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

  const router = useRouter()
  const onSubmit = values => {
    dispatch(addRisk(values))
    saveRisk(values, () => {}, setSaveRisk)
    // dispatch(allSave(values))
    console.log('values:', values)
    // setRisk(console.log('data', risk))
  }
  const SubmitRisk = () => {
    toast.success('Submitted Risk')
  }
  const gotoCancel = () => {
    router.push(`/home/risk`)
  }

  const upload = e => {
    console.log(e.target.files)
  }

  return (
    <CardContent>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>New Risk</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5>Complete the form below to document a risk for consideration in Risk Managment Process </h5>

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
              onClick={SubmitRisk}
              onSubmit={handleSubmit(onSubmit)}
            >
              SubmitRisk
            </Button>
          </Grid>
        </div>
        {/* <Grid
          item
          xs={12}
          style={{ padding: 4, display: 'flex' }}
          sx={{
            '@media screen and (max-width:600px)': {
              flexDirection: 'column'
            }
          }}
        >
          <h5>Complete the form below to document a risk for consideration in Risk Managment Process </h5>
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
            style={{ justifyContent: 'space-between', display: 'flex' }}
          >
            <Button xs={2} variant='contained' size='medium' style={{ marginRight: '-1%' }} onClick={gotoCancel}>
              cancel
            </Button>
            <Button
              type='submit '
              size='medium'
              variant='contained'
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginLeft: '' }}
              onClick={SubmitRisk}
            >
              Submit Risk
            </Button>
          </Grid>
        </Grid> */}

        <Grid container spacing={2}>
          <Grid item sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
                name='Subject'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label='subject'
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''> None</MenuItem>

                    <MenuItem value={allRisk.data?.suject}>{allRisk.data?.suject}</MenuItem>
                  </Select>
                )}
              /> */}
              <TextField
                id='outlined-basic'
                sx={{ p: 1.5 }}
                type='text'
                variant='outlined'
                name='suject'
                label='Subject'
                value={allRisk?.data?.suject}
                placeholder='select a subject or start typing search ...'
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  subject is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* subject end */}
          <Grid item sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                select a Risk mapping or start typing to search
              </InputLabel>
              <Controller
                name='riskMapping'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Training Course'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.riskmapping?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Risk mapping is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* Risk mapping  */}
          <Grid item sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Select a Threat Mapping or start typing to search
              </InputLabel>
              <Controller
                name='threatmapping'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Threat Mapping'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.threatmapping?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Threat mapping is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* threat mapping */}
          <Grid
            item
            sx={{
              width: '40%',
              '@media screen and (max-width:600px)': {
                flexDirection: 'column',
                marginLeft: 0
              }
            }}
          >
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Category
              </InputLabel>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'category'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      setCatRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(catList) &&
                      catList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  category
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of category  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Risk Source
              </InputLabel>
              <Controller
                name='Risk Source'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Risk Source'}
                    onChange={e => {
                      setRiskSource(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>

                    {Array.isArray(rsList) &&
                      rsList.map((r, i) => (
                        <MenuItem key={r + i} value={r.lookupId}>
                          {r.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Risk Source
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of risk source */}

          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                site location
              </InputLabel>

              <Controller
                name='siteLocation'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'siteLocation'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      siteLocation(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(slList) &&
                      slList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {/* <TextField sx={{ p: 1.5 }} type='text' variant='filled' name='sitelocation' value={allRisk?.data?.site} /> */}

              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  site location must be selected
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of Site Location  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {' '}
                Risk Score
              </InputLabel>

              <Controller
                name='riskScore'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'riskScore'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      riskScore(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(scoreList) &&
                      scoreList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />

              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Risk Scoring is Required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* //end of risk scoring  */}

          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                External Refrence id:
              </InputLabel>
              <Controller
                name='External Refrence id'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'External Refrence id'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allRisk.data?.externalreferenceid}>{allRisk.data?.externalreferenceid}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  External Refrence Id is must
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* //end of externalreferenceid */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {' '}
                currentlikelihood
              </InputLabel>

              <Controller
                name='currentlikelihood'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'currentLikelihood'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      selectCurrent(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(currentList) &&
                      catList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />

              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Current Likelihood must
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of likelihood */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Control Regulation
              </InputLabel>
              <Controller
                name='control Regulation'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'control regulation'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None </MenuItem>
                    <MenuItem value={allRisk.data?.controlregulation}>{allRisk.data?.controlregulation}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Control Regulation
                </FormHelperText>
              )}
            </FormControl>
            {/* end of Control Regulation  */}
          </Grid>
          {/* end of control regulation  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {' '}
                currentImpact
              </InputLabel>
              <Controller
                name='currentImpacts'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'ccurrentImpacts'}
                    onChange={e => {
                      setImpactss(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(impactList) &&
                      impactList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />

              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  current Impact
                </FormHelperText>
              )}
            </FormControl>
            {/* end of Control Regulation  */}
          </Grid>
          {/* end of Current Impact */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Control Number
              </InputLabel>
              <Controller
                name='Control Number'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                     value={value}
                    fullWidth
                    label={'Current Impact'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None </MenuItem>
                    <MenuItem value={allRisk.data?.controlnumber}>{allRisk.data?.controlnumber}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Control Number
                </FormHelperText>
              )} */}
              <TextField type='text' variant='outlined' label='Control Number' />
            </FormControl>
          </Grid>
          {/* end of Control Number  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Risk Assesment
              </InputLabel>
              <Controller
                name='Risk assesment'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Current Impact'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None </MenuItem>
                    <MenuItem value={allRisk.data?.riskassessment}>{allRisk.data?.riskassessment}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Control Number
                </FormHelperText>
              )} */}

              {/* //DropDown Fetch */}

              <TextField type='text' variant='outlined' label='Risk Assessment' />
            </FormControl>
          </Grid>
          {/* end of risk assesment */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {' '}
                Affected Assets
              </InputLabel>
              <Controller
                name='affectedAssets'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'affectedAssets'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      selectAssets(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(assetsList) &&
                      assetsList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />

              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Aasets are required
                </FormHelperText>
              )}
              <h6 style={{ color: 'red' }}>
                select an assets or assets Group you can create a new Assets by adding its name to the list
                <br />
              </h6>
            </FormControl>
          </Grid>
          {/* end of selection assets  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Additional Notes
              </InputLabel>
              <Controller
                name='additionalNotes'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'Additional Notes'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.affectedassets?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Aasets are required
                </FormHelperText>
              )}
              <h6 style={{ color: 'red' }}>
                select an assets or assets Group you can create a new Assets by adding its name to the list
                <br />
              </h6> */}
              <TextField type='text' variant='outlined' label='Additional Notes' />
            </FormControl>
          </Grid>
          {/* // end of additionalNotes */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Technology
              </InputLabel>
              <Controller
                name='currentImpacts'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'ccurrentImpacts'}
                    onChange={e => {
                      selectTechno(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(techList) &&
                      techList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  please select Technology
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of technology */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Technology
              </InputLabel>
              <Controller
                name='technology'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'technology'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.technology?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  please select Technology
                </FormHelperText>
              )} */}

              <TextField type='file' bg-color='primary' onChange={e => upload(e)} name='img' variant='outlined' />
            </FormControl>
          </Grid>
          {/* end of technology */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Team
              </InputLabel>
              <Controller
                name='technology'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'technology'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.team?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  please select Team
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of Team  */}
          <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Additional Stakeholders:
              </InputLabel>
              <Controller
                name='technology'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'technology'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.additionalstakeholders?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  please select additionalstakeholders
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of additionalstakeholders */}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                owner
              </InputLabel>
              <Controller
                name='owner'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'owner'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.owner}>{allRisk.data?.owner}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Owner is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/*end of owner  */}
          <Grid container xs={12} />
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Owner's Manager:
              </InputLabel>
              <Controller
                name='owner'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    fullWidth
                    label={'owner'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.ownermanager}>{allRisk.data?.ownermanager}</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Owner's Manger is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid container xs={12}>
            <h3>Tags</h3>
            <TextField type='text' fullWidth placeholder='Select/AddTag' />
          </Grid>

          {/* <Grid item xs={12} style={{ padding: 4, display: 'flex' }}>
            <h6>Complete the form above to document a risk for consideration in Risk Managment Process </h6>
            <Grid item xs={4} style={{ marginLeft: 'auto', justifyContent: 'space-between', display: 'flex' }}>
              <Button
                // xs={2}
                type='submit '
                variant='contained'
                size='medium'
                color='primary'
                onSubmit={reset}
                style={{ margin: 'auto' }}
              >
                clear Form
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                color='primary'
                onSubmit={handleSubmit(onSubmit)}
                onClick={SubmitRisk}
                style={{ margin: 'auto' }}
              >
                Submit Risk
              </Button>
            </Grid>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default RiskList
