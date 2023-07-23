import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {
  SiteLocations,
  fetchRisk,
  RiskScore,
  currentlikehood,
  currentImpacts,
  fetchAssets,
  fetchTechnology
} from 'src/store/apps/Risks/RiskService'
import { category } from 'src/store/apps/Risks/RiskService'
import { riskSourceA } from 'src/store/apps/Risks/RiskService'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { addRisk, selectAllRisks, selectReviewRisk } from 'src/store/apps/Risks/index'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import authConfig from 'src/configs/auth'

const NewRisk = () => {
  const [def, setDef] = useState({
    additionalnotes: 'none',
    additionalstakeholders: 'none',
    affectedassets: 'none',
    affectedassetsnew: 'none',
    category: 'none',
    controlnumber: 'none',
    controlregulation: 'none',
    currentimpact: 'none',
    currentlikelihood: 'none',
    externalreferenceid: 'none',
    id: 'none',
    owner: 'none',
    ownermanager: 'none',
    riskassessment: 'none',
    riskmapping: 'none',
    riskscoringmethod: 'none',
    risksource: 'none',
    site: 'none',
    subject: '',
    supportingdocumentation: 'none',
    tag: 'none',
    team: 'none',
    technology: 'none',
    threatmapping: 'none'
  })

  const fetch_risk_by_id = async () => {
    const res = await fetch(`${authConfig.riskListEndPoint}/${router.query.keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('specified risk data is', data)
  }

  const data = useSelector(addRisk)
  console.log('newData :', data)

  const dispatch = useDispatch()
  //!for selecting Risk
  // useEffect(() => {
  //   fetchRisk(1234, () => {}, setAllRisk)
  // }, [])

  useEffect(() => {
    fetch_risk_by_id()
  }, [])

  //!to fetch categories
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

  //! toast button
  const SubmitRisk = () => {
    toast.success('Submitted Risk')
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

  const [ownerList, setOwnerList] = useState([])
  const [teamList, setTeamList] = useState([])

  const [team, setTeam] = useState([])
  const [additional_stakeholders, set_additional_stakeholders] = useState([])

  const [subject, set_subject] = useState('')

  const [reference_id, set_refernce_id] = useState('')
  const [regulation, set_regulation] = useState('')
  const [control_number, set_control_number] = useState('')
  const [owner, setOwner] = useState('')
  const [manager, setManager] = useState('')
  const [assessment, set_assessment] = useState('')
  const [tag, setTag] = useState('')
  const [additional_notes, set_additional_notes] = useState('')
  const [category_, set_category] = useState('')
  const [current_impact, set_current_impact] = useState('')
  const [current_likelihood, set_current_likelihood] = useState('')

  const [risk_dropdown, set_risk_dropdown] = useState([])
  const [risk_mapping, set_risk_mapping] = useState([])

  const [threat_dropdown, set_threat_dropdown] = useState([])
  const [threat_mapping, set_threat_mapping] = useState([])

  const [regulation_dropdown, set_regulation_dropdown] = useState([])

  //! to select categories
  const setCatRisk = value => {
    let category = catList.filter(item => item.id == value)
    if (category) {
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

  const selectTechno = value => {
    let Techn = techList.filter(item => item.id == value)
    if (Techn) {
      setCurrent(Techn)
    }
    console.log('Technolgies', tech)
  }

  //!to select assets
  const selectAssets = value => {
    let asse = assetsList.filter(item => item.id == value)
    if (asse) {
      setAssets(asse)
    }
    console.log('assets:', aassets)
  }
  //!for selecting risk
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

  const onSubmit = values => {
    dispatch(addRisk(values))
    console.log('values:', values)
    setRisk(console.log('data', risk))
  }

  const router = useRouter()
  const upload = e => {
    console.log(e.target.files)
  }
  const gotoCancel = () => {
    router.push(`/home/risk`)
  }

  return (
    <CardContent>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Risk</h3>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{ padding: 4, display: 'flex', marginLeft: '2%' }}
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
              <Button xs={2} variant='contained' size='medium' style={{ margin: 'auto' }} onClick={gotoCancel}>
                cancel
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: 'auto' }}
                onClick={SubmitRisk}
              >
                Submit Risk
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              width: '100%',
              '@media screen and (max-width:600px)': {
                flexDirection: 'row',
                marginLeft: 0
              }
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              <TextField
                id='outlined-basic'
                sx={{ p: 1.5 }}
                type='text'
                variant='outlined'
                name='subject'
                label='Subject'
                // value={allRisk?.data?.subject}
                value={subject}
                onChange={e => set_subject(e.target.value)}
                placeholder='select a subject or start typing search ...'
              />
            </FormControl>
          </Grid>
          {/* subject end */}
          <Grid item sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              <TextField
                id='outlined-basic'
                sx={{ p: 1.5 }}
                type='text'
                variant='outlined'
                name='subject'
                label='RiskMapping'
                // value={allRisk?.data?.riskmapping}
                value={risk_mapping}
                onChange={e => set_risk_mapping(e.target.value)}
                placeholder='select a subject or start typing search ...'
              />
            </FormControl>
          </Grid>
          {/* Risk mapping  */}
          <Grid item sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              <TextField
                id='outlined-basic'
                sx={{ p: 1.5 }}
                type='text'
                variant='outlined'
                name='subject'
                label='ThreatMapping'
                // value={allRisk?.data?.threatmapping}
                value={threat_mapping}
                onChange={e => set_threat_mapping(e.target.value)}
                placeholder='select a subject or start typing search ...'
              />
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
                    // value={value}
                    value={category_}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'category'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      setCatRisk(e.target.value)
                      set_category(e.target.value)
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
                    // value={value}
                    value={rs}
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
                    // value={value}
                    value={score}
                    // defaultValue={'Management'}
                    fullWidth
                    disabled={true}
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
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
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
              /> */}
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  External Refrence Id is must
                </FormHelperText>
              )}
              <TextField
                type='number'
                variant='outlined'
                label='Control Number'
                value={control_number}
                onChange={e => set_control_number(e.target.value)}
              />
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
                    // value={value}
                    value={current_likelihood}
                    // defaultValue={'Management'}
                    fullWidth
                    label={'currentLikelihood'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      selectCurrent(e.target.value)
                      set_current_likelihood(e.target.value)
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
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
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
                      // setCatRisk(e.target.value)
                      // onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None </MenuItem>
                    <MenuItem value={allRisk.data?.controlregulation}>{allRisk.data?.controlregulation}</MenuItem>
                    {/* {Array.isArray(cat.data?.lookups) &&
                      cat.data?.lookups.map((c, i) => (
                        <MenuItem key={c + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))} */}
              {/* </Select>
                )}
              /> */}
              <TextField
                sx={{ p: 1.5 }}
                type='text'
                variant='filled'
                name='controlRegulation'
                value={allRisk?.data?.controlregulation}
                label='Control Regulation'
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
              <TextField
                type='file'
                accept='pdf'
                bg-color='primary'
                helperText='upto 5mb'
                name='img'
                variant='outlined'
              />
            </FormControl>
          </Grid>
          {/* end of Document*/}
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
                name='team'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={def.team != 'none' ? def.team : value}
                    fullWidth
                    label={'team'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                      // setCatRisk(e.target.value)
                      // onChange(e)
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

                    {/* {Array.isArray(cat.data?.lookups) &&
                      cat.data?.lookups.map((c, i) => (
                        <MenuItem key={c + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))} */}
              {/* </Select>
                )}
              /> */}
              <TextField
                sx={{ p: 1.5 }}
                type='text'
                variant='filled'
                name='team'
                value={allRisk?.data?.team}
                label='Team'
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
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
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
                      // setCatRisk(e.target.values)
                      // onChange(e)
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
                    {/* {Array.isArray(cat.data?.lookups) &&
                      cat.data?.lookups.map((c, i) => (
                        <MenuItem key={c + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))} */}
              {/* </Select>
                )}
              /> */}
              <TextField
                sx={{ p: 1.5 }}
                type='text'
                variant='filled'
                name='additionalStakeHolder'
                value={allRisk?.data?.additionalstakeholders}
                label='Additional Stake Holder'
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
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
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
                      // setCatRisk(e.target.value)
                      // onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.owner}>{allRisk.data?.owner}</MenuItem>
                    {/* {Array.isArray(cat.data?.lookups) &&
                      cat.data?.lookups.map((c, i) => (
                        <MenuItem key={c + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))} */}
              {/* </Select>
                )}
              /> */}
              <TextField
                sx={{ p: 1.5 }}
                type='text'
                variant='filled'
                name='owner'
                value={allRisk?.data?.owner}
                label='Owner'
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
              <InputLabel
                id='validation-basic-select'
                error={Boolean(errors.msg)}
                htmlFor='validation-basic-select'
              ></InputLabel>
              {/* <Controller
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
                      // setCatRisk(e.target.value)
                      // onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.ownermanager}>{allRisk.data?.ownermanager}</MenuItem>
                    {/* {Array.isArray(cat.data?.lookups) &&
                      cat.data?.lookups.map((c, i) => (
                        <MenuItem key={c + i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))} */}
              {/* </Select>
                )}
              /> */}
              <TextField
                sx={{ p: 1.5 }}
                type='text'
                variant='filled'
                name='ownerManager'
                value={allRisk?.data?.ownermanager}
                label='OwnerManager'
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Owner's Manger is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* end of owner manager */}
          <Grid container xs={12}>
            <h3>Tags</h3>
            <TextField type='text' fullWidth placeholder='Select/AddTag' />
          </Grid>
          {/* end of tags */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default NewRisk
