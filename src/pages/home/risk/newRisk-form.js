import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
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
  fetchTechnology,
  fetchOwner
} from 'src/pages/home/risk/RiskService'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addRisk } from 'src/store/apps/Risks/index'

//Third party imports
import toast from 'react-hot-toast'
import select from 'src/@core/theme/overrides/select'

const RiskList = () => {
  const data = useSelector(state => state.riskList)

  const dispatch = useDispatch()


  const fetch_owner_list= async()=>{

    const res= await fetch(`${authConfig.owner_list}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        });
        const data= await res.json();
        console.log("owner dropdown list is", data);
        setOwnerList(data.data.users);
  }

  const fetch_team_list= async()=>{

    const res= await fetch(`${authConfig.team_list}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        });
        const data= await res.json();
        console.log("team dropdown list is", data);
        setTeamList(data.data.users);
  }

  const fetch_risk_dropdown= async()=>{

    const res= await fetch(`${authConfig.risk_mapping_list}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        });
        const data= await res.json();
        console.log("risk dropdown list is", data);
        set_risk_dropdown(data);
  }

  const fetch_threat_dropdown= async()=>{

    const res= await fetch(`${authConfig.threat_mapping_list}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        });
        const data= await res.json();
        console.log("threat dropdown list is", data);
        set_threat_dropdown(data);
  }

  const fetch_regulation_dropdown= async()=>{

    const res= await fetch(`${authConfig.regulation_dropdown}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        });
        const data= await res.json();
        console.log("regulation dropdown list is", data);
        set_regulation_dropdown(data);
  }

  const submit_risk= async()=>{

    const res= await fetch(`${authConfig.saveAllRisk}`, {
        method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            subject: subject,
            riskmapping: risk_mapping,
            threatmapping: threat_mapping,
            reference_id: reference_id,
            regulation: regulation,
            control_number: control_number,
            source: rs,
            category: category_,
            owner: owner,
            manager: manager,
            assessment: assessment,
            additionalnotes: additional_notes,
            location: location,
            riskscoringmethod: score,
            currentlikelihood: current_likelihood,
            currentimpact: current_impact,
            affectedassets: aassets,
            technology: tech,
            supportingdocumentation: "yes",
            team: team,
            additionalstakeholders: additional_stakeholders,
            tag: tag

        })
        });
        const data= await res.json();
        console.log("save risk is", data);
        toast.success('Submitted Risk');

        // const formData = new FormData();
        // formData.append("file", file);
        // for (var key of formData.entries()) {
        //   console.log(key[0] + ', ' + key[1])
        // }
        // const res2= await fetch(``, {
        //   method:"POST",
        //     body: formData
        //   });
        // const data2= await res2.json();
  }

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

  //to fetch owners and additional stakeholders
  useEffect(() => {
    
    fetch_owner_list();
    fetch_team_list();
    fetch_risk_dropdown();
    fetch_threat_dropdown();
    fetch_regulation_dropdown();
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
  const [score, setScore] = useState(50)
  const [scoreList, setScoreList] = useState([])
  const [current, setCurrent] = useState({})
  const [currentList, setCurrentList] = useState([])
  const [impacts, setImpacts] = useState({})
  const [impactList, setImpactList] = useState([])
  const [aassets, setAssets] = useState([])
  const [assetsList, setAssetsList] = useState([])
  const [tech, setTech] = useState([])
  const [techList, setTechList] = useState([]);

  const [ownerList, setOwnerList] = useState([])
  const [teamList, setTeamList] = useState([]);

  const [team, setTeam] = useState([]);
  const [additional_stakeholders, set_additional_stakeholders] = useState([]);

  const [subject, set_subject]= useState('');

  const [reference_id, set_refernce_id]= useState('');
  const [regulation, set_regulation]= useState('');
  const [control_number, set_control_number]= useState('');
  const [owner, setOwner]= useState('');
  const [manager, setManager]= useState('');
  const [assessment, set_assessment]= useState('');
  const [tag, setTag]= useState('');
  const [additional_notes, set_additional_notes]= useState('');
  const [category_ ,set_category]= useState('');
  const [current_impact ,set_current_impact]= useState('');
  const [current_likelihood ,set_current_likelihood]= useState('');

  const [risk_dropdown ,set_risk_dropdown]= useState([]);
  const [risk_mapping ,set_risk_mapping]= useState([]);

  const [threat_dropdown ,set_threat_dropdown]= useState([]);
  const [threat_mapping ,set_threat_mapping]= useState([]);

  const [regulation_dropdown ,set_regulation_dropdown]= useState([]);

  const [file, set_file]= useState();

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


  const upload = async(e) => {
    // console.log("file uploaded is", e.target.files[0]);
    const selectedFile = e.target.files[0];
    set_file(selectedFile);
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
              // onClick={SubmitRisk}
              // onSubmit={handleSubmit(onSubmit)}
              onClick={submit_risk}
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
                // sx={{ p: 1.5 }}
                type='text'
                variant='outlined'
                name='suject'
                label='Subject'
                // value={allRisk?.data?.suject}
                value={subject}
                onChange={(e)=> set_subject(e.target.value)}
                //ends
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
                    // value={value}
                    value={risk_mapping}
                    multiple
                    fullWidth
                    label={'Training Course'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      set_risk_mapping(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {/* {allRisk.data?.riskmapping?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))} */}
                    {risk_dropdown.map((item, i) => (
                      <MenuItem value={item.lookupId} key={i}>
                        {item.lookupName}
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
                    // value={value}
                    value={threat_mapping}
                    multiple
                    fullWidth
                    label={'Threat Mapping'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      set_threat_mapping(e.target.value);
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value=''>None</MenuItem>
                    {/* {allRisk.data?.threatmapping?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))} */}
                    {threat_dropdown.map((item, i) => (
                      <MenuItem value={item.lookupId} key={i}>
                        {item.lookupName}
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
                      <MenuItem value='1'>All Sites</MenuItem>
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
                    label={'riskScore'}
                    disabled={true}
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
                    // value={value}
                    value={reference_id}
                    fullWidth
                    label={'External Refrence id'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      set_refernce_id(e.target.value)
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
                      set_current_likelihood(e.target.value);
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {Array.isArray(currentList) &&
                      currentList.map((c, i) => (
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
                    // value={value}
                    value={regulation}
                    fullWidth
                    label={'control regulation'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      set_regulation(e.target.value);
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None </MenuItem>
                    <MenuItem value={allRisk.data?.controlregulation}>{allRisk.data?.controlregulation}</MenuItem> */}
                    {Array.isArray(regulation_dropdown) &&
                      regulation_dropdown.map((c, i) => (
                        <MenuItem value={c.id}>
                          {c.framework_Name}
                        </MenuItem>
                      ))}
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
                      set_current_impact(e.target.value)
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
              <TextField type='text' variant='outlined' label='Control Number' value={control_number} onChange={(e)=> set_control_number(e.target.value)} />
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

              <TextField type='text' variant='outlined' label='Risk Assessment' value={assessment} onChange={(e)=> set_assessment(e.target.value)}/>
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
                    // value={value}
                    value={aassets}
                    multiple
                    // defaultValue={'Management'}
                    fullWidth
                    label={'affectedAssets'}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      // selectAssets(e.target.value)
                      setAssets(e.target.value)
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
              <TextField type='text' variant='outlined' label='Additional Notes' value={additional_notes} onChange={(e)=> set_additional_notes(e.target.value)}/>
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
                    // value={value}
                    value={tech}
                    // defaultValue={'Management'}
                    multiple
                    fullWidth
                    label={'ccurrentImpacts'}
                    onChange={e => {
                      selectTechno(e.target.value)
                      onChange(e)
                      //added mine
                      setTech(e.target.value)
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
                  multiple
                    // value={value}
                    value={team}
                    fullWidth
                    label={'technology'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                      //adding my
                      setTeam(e.target.value);
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None</MenuItem>
                    {allRisk.data?.team?.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))} */}
                    {teamList.map((item, i) => (
                      <MenuItem value={item.id}>
                        {item.name}
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
                  multiple
                    // value={value}
                    value={additional_stakeholders}
                    fullWidth
                    label={'technology'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      onChange(e)
                      //adding my
                      set_additional_stakeholders(e.target.value);
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None</MenuItem> */}
                    {ownerList.map((item, i) => (
                      <MenuItem value={item.id}>
                        {item.name}
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
                    // value={value}
                    value={owner}
                    fullWidth
                    label={'owner'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      setOwner(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.owner}>{allRisk.data?.owner}</MenuItem> */}
                    {ownerList.map((item, i) => (
                      <MenuItem value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
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
                    // value={value}
                    value={manager}
                    fullWidth
                    label={'owner'}
                    onChange={e => {
                      setSelectedRisk(e.target.value)
                      setManager(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None</MenuItem>
                    <MenuItem value={allRisk.data?.ownermanager}>{allRisk.data?.ownermanager}</MenuItem> */}
                    {ownerList.map((item, i) => (
                      <MenuItem value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
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
            <TextField type='text' fullWidth placeholder='Select/AddTag' value={tag} onChange={(e)=> setTag(e.target.value)}/>
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
