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
import toast from 'react-hot-toast'
import authConfig from 'src/configs/auth'
import { comment } from 'stylis'

import { useTranslation } from 'react-i18next';
import withRoot from '../withRoot'
import { useTheme } from '@material-ui/core/styles';

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

  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const dispatch = useDispatch()

  useEffect(() => {
    fetchMit(() => {}, setAllMit)
  }, [])


  //creating useStates for different fields
  const [submission_date, set_submission_date]= useState('');
  const [planned_date, set_planned_date]= useState('');
  const [planning_strategy, set_planning_strategy]= useState('');
  const [effort, set_effort]= useState('');
  const [cost, set_cost]= useState('');
  const [percent, set_percent]= useState('');
  const [current_solution, set_current_solution]= useState('');
  const [security_requirements, set_security_requirements]= useState('');
  const [security_recommendations, set_security_recommendations]= useState('');
  const [owner, set_owner]= useState('');
  const [team, set_team]= useState([]);
  const [controls, set_controls]= useState([]);


  //creating useStates for different dropdowns
  const [effort_dropdown, set_effort_dropdown]= useState([]);
  const [strategy_dropdown, set_strategy_dropdown]= useState([]);
  const [owner_dropdown, set_owner_dropdown]= useState([]);
  const [team_dropdown, set_team_dropdown]= useState([]);
  const [control_dropdown, set_control_dropdown]= useState([]);


  //api fetch to display efforts dropdown
  const fetch_efforts= async()=>{

    const res= await fetch(`${authConfig.mitigation_effort}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          },
    })
    const data= await res.json();
    console.log("mitgation efforts list is", data);
    set_effort_dropdown(data);
}


//api fetch to display startegy dropdown
const fetch_strategy= async()=>{

  const res= await fetch(`${authConfig.planning_strategy}`, {
      method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
  })
  const data= await res.json();
  console.log("strategy list is", data);
  set_strategy_dropdown(data);
}


//api fetch to display owner dropdown
const fetch_owner= async()=>{

  const res= await fetch(`${authConfig.owner_list}`, {
      method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
  })
  const data= await res.json();
  console.log("owner list is", data);
  set_owner_dropdown(data.data.users);
}


//api fetch to display team dropdown
const fetch_team= async()=>{

  const res= await fetch(`${authConfig.team_list}`, {
      method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
  })
  const data= await res.json();
  console.log("team list is", data);
  set_team_dropdown(data.data.users);
}

//api fetch to display control dropdown
const fetch_control= async()=>{

  const res= await fetch(`${authConfig.control_dropdown}`, {
      method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
  })
  const data= await res.json();
  console.log("team list is", data);
  set_control_dropdown(data);
}

//api fetch to prefill the fields in mitigation
  const fetch_mitigation= async()=>{

      const res= await fetch(`${authConfig.mitigation}/${router.query.keyword}/mitigation`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      console.log("specified mitgation data is", data);
      set_submission_date("01-02-2023");
      set_planned_date(data.data.plannedmitigationdate);
      set_planning_strategy(data.data.planningstrategy);
      set_effort(data.data.mitigationeffort);
      set_cost(data.data.mitigationcost);
      set_percent(data.data.mitigationpercent);
      set_current_solution(data.data.currentsolution);
      set_security_requirements(data.data.securityrequirements);
      set_security_recommendations(data.data.securityrecommendations);
      set_owner(data.data.mitigationowner);
      set_team(data.data.mitigationteam);
      set_controls(data.data.mitigationcontrols);
  }

//to call these functions when the page gets rendered
  useEffect(() => {

    fetch_mitigation();

    fetch_efforts();

    fetch_strategy();

    fetch_owner();

    fetch_team();
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

  const SubmitMiti = () => {
    toast.success('Saved Mitigation')
  }

  //api to save the details of the mitigation
  const save_mitigation= async()=>{

    const res= await fetch(`${authConfig.mitigation_update}/${router.query.keyword}`, {
      method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

          mitigationsubmissiondate: submission_date,
          currentsolution: current_solution,
          plannedmitigationdate: planned_date,
          securityrequirements: security_requirements,
          securityrecommendations: security_recommendations,
          planningstrategy: planning_strategy,
          mitigationeffort: effort,
          mitigationcost: cost,
          mitigationowner: owner,
          mitigationteam: team,
          mitigationpercent: percent,
          mitigationcontrols: controls,
          supportingdocumentation: "yes",
          comments : "some comment"
      })
  })
  const data= await res.json();
  console.log("mitigation is saved", data);
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
          <h3>{t('Mitigation')}</h3>
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
            {t('Cancel')}
            </Button>
            <Button
              type='submit '
              size='medium'
              variant='contained'
              style={{ marginLeft: '10px' }}
              // onClick={SubmitRisk}
              // onSubmit={handleSubmit(onSubmit)}
              // onClick={SubmitMiti}
              onClick={save_mitigation}
              onSubmit={handleSubmit(saveMitigations)}
            >
              {t('Save')}
            </Button>
          </Grid>
        </div>
        <Divider />
        <Grid container spacing={2}>
          <Grid
            item
            sx={{
              width: '40%',
              marginTop: 8,
              '@media screen and (max-width:600px)': {
                flexDirection: 'row',
                marginLeft: 0
              }
            }}
          >
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                Mitigation submission.date
              </InputLabel> */}
              <TextField
                type='date'
                variant='outlined'
                // value={allMit?.data?.mitigationsubmissiondate}
                label={t('Mitigation submission date')}
                value={submission_date}
                disabled={true}
              />
            </FormControl>
          </Grid>
          {/* submisiion date */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* <h5>Current solution:</h5> */}
                <TextField type='text' style={{ width: '100%' }} label={t('Current solution')} value={current_solution} onChange={(e)=> set_current_solution(e.target.value)}/>
              </div>
            </FormControl>
          </Grid>
          {/* current solution  */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                planned mitigation Date
              </InputLabel> */}
              <TextField variant='outlined' 
              type='date' 
              // value={allMit?.data?.plannedmitigationdate} 
              label={t('Planned mitigation Date')}
              value={planned_date}
              onChange={(e)=> set_planned_date(e.target.value)}
             />
            </FormControl>
          </Grid>
          {/* planned mitigation date */}

          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* <h5>Security Requirments:</h5> */}

                <TextField type='text' label={t('Security Requirments')} style={{ width: '100%' }} value={security_requirements} onChange={(e)=> set_security_requirements(e.target.value)}/>
              </div>
            </FormControl>
          </Grid>
          {/* end of security Requirments */}

          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              {t('Planning stratergy')}
              </InputLabel>
              <Controller
                name='planning stratergy'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    // value={value}
                    value={planning_strategy}
                    fullWidth
                    label={t('Planning Strategy')}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                    onChange={e => {
                      setMit(e.target.value)
                      set_planning_strategy(e.target.value)
                      onChange(e)
                    }}
                  >
                    {/* <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.planningstrategy}>{allMit?.data?.planningstrategy}</MenuItem> */}

                    {strategy_dropdown.map((item) => (item !== null ?
                      <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
                      ))}
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

          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>
                {/* <h5 style={{ marginLeft: '20px' }}>Security Reccomendations:</h5> */}
                <TextField type='text' style={{ width: '100%' }} label={t('Security Reccomendations')} value={security_recommendations} onChange={(e)=> set_security_recommendations(e.target.value)}/>
              </div>
            </FormControl>
          </Grid>
          {/* //end of externalreferenceid */}
          <Grid item sx={{ width: '40%', marginTop: 8}}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              {t('Mitigation Effort')}:
              </InputLabel>
              <Controller
                name='mitigation Effort'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    // value={value}
                    value={effort}
                    fullWidth
                    label={t('Mitigation Effort')}
                    onChange={e => {
                      setMit(e.target.value)
                      set_effort(e.target.value)
                      onChange(e)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationeffort}>{allMit?.data?.mitigationeffort}</MenuItem> */}

                    {effort_dropdown.map((item) => (item !== null ?
                      <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
                      ))}
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
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* <h5>Supporting Documentation:</h5> */}
                <TextField type='file' style={{ width: '100%' }}/>
              </div>
            </FormControl>
          </Grid>
          {/* / end of Document/ */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
              {t('Mitigation Cost')}:
              </InputLabel>
              <Controller
                name='mitigation cost'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                    // value={value}
                    value={cost}
                    fullWidth
                    label={t('Mitigation Cost')}
                    onChange={e => {
                      // setSelectedRisk(e.target.value)
                      // onChange(e)
                      set_cost(e.target.value)
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
                {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Percent:
                </InputLabel> */}

                <TextField type='number' 
                variant='outlined'
                // value={allMit?.data?.mitigationpercent}
                label={t('Mitigation Percent')}
                value={percent}
                onChange={(e)=> set_percent(e.target.value)}
                 />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Percent
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* new fields adding */}

            <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
                {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Percent:
                </InputLabel> */}
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigation Owner')}
              </InputLabel>
                <Controller
                name='mitigation cost'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                     
                    value={owner}
                    fullWidth
                    label={t('Mitigation Owner')}
                    onChange={(e)=> set_owner(e.target.value)}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem> */}

                    {owner_dropdown.map((item) => (item !== null ?
                      <MenuItem value={item.id}>{item.name}</MenuItem>: ""
                      ))}
                  </Select>
                )}
              />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Percent
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
                {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Percent:
                </InputLabel> */}

                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigation Team')}
              </InputLabel>
                <Controller
                name='mitigation cost'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                     
                    value={team}
                    fullWidth
                    multiple
                    label={t('Mitigation Team')}
                    onChange={(e)=> set_team(e.target.value)}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem> */}

                    {team_dropdown.map((item) => (item !== null ?
                      <MenuItem value={item.id}>{item.name}</MenuItem>: ""
                      ))}
                  </Select>
                )}
              />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Percent
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
                {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Mitigation Percent:
                </InputLabel> */}

                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigation Control')}
              </InputLabel>
                <Controller
                name='mitigation cost'
                control={control}
                rules={{ required: true }}
                defaultValue={data}
                render={({ field: { value, onChange } }) => (
                  <Select
                     
                    value={controls}
                    multiple
                    fullWidth
                    label={t('Mitigation Control')}
                    onChange={(e)=> set_controls(e.target.value)}
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
