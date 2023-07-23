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

import { useTranslation } from 'react-i18next'
import withRoot from '../withRoot'
import { useTheme } from '@material-ui/core/styles'

import {
  getControlDropDown,
  getEffortsDropDown,
  getStrategyDropDown
} from 'src/store/apps/Risks/mitigation/MitigationServices'
import { getAdditionlStakeHoldersDropDown, getTeamDropDown } from 'src/store/apps/common'

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
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const [efforts_dropdown, set_efforts_dropdown] = useState([])
  const [strategy_dropdown, set_strategy_dropdown] = useState([])
  const [control_dropdown, set_control_dropdown] = useState([])
  const [team_dropdown, set_team_dropdown] = useState([])
  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])

  const [singleMitigationData, setSingleMitigationData] = useState({
    id: 0,
    owner: 0,
    comments: 'string',
    submitted_by: 0,
    last_update: '2023-07-23T19:52:40.207Z',
    riskId: 0,
    mitigationsubmissiondate: '2023-07-23T19:52:40.207Z',
    currentsolution: 'string',
    plannedmitigationdate: '2023-07-23T19:52:40.207Z',
    securityrequirements: 'string',
    securityrecommendations: 'string',
    planningstrategy: 0,
    mitigationeffort: 0,
    mitigationcost: 0,
    mitigationowner: 0,
    mitigationteam: [0],
    mitigationpercent: 0,
    mitigationcontrols: [0],
    supportingdocumentation: 'string',
    controlvalidationdetails: 'string',
    uploadartifact: 'string',
    audittrail: 'string'
  })

  useEffect(() => {
    getEffortsDropDown(set_efforts_dropdown, () => {})
    getStrategyDropDown(set_strategy_dropdown)
    getControlDropDown(set_control_dropdown)
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown)
    getTeamDropDown(set_team_dropdown, () => {})
  }, [])

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

  //api to save the details of the mitigation
  const onSubmit = async values => {
    const payload = {
      ...singleRiskData,
      riskmapping: riskDropdownIds,
      threatmapping: threatDropdownIds,
      location_ids: sitelocationDropdownIds,
      affectedassets: affectedassetsDropdownIds,
      technology: technologyDropdownIds,
      team: teamDropdownIds,
      additionalstakeholders: additionalstakeholdersDropdownIds
    }
    apiHelper(`${authConfig.saveAllRisk}`, 'post', payload, {})
      .then(res => {
        toast.success(res.data.data.msg)
        router.push('/home/risk')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const upload = e => {
    console.log(e.target.files)
  }

  return (
    <CardContent>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button xs={2} variant='contained' size='medium' onClick={() => router.push(`/home/risk`)}>
              {t('Cancel')}
            </Button>
            <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={onSubmit}>
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
                // value={submission_date}
                disabled={true}
              />
            </FormControl>
          </Grid>
          {/* submisiion date */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* <h5>Current solution:</h5> */}
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Current solution')}
                  // value={current_solution}
                  // onChange={e => set_current_solution(e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>
          {/* current solution  */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              {/* <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                planned mitigation Date
              </InputLabel> */}
              <TextField
                variant='outlined'
                type='date'
                // value={allMit?.data?.plannedmitigationdate}
                label={t('Planned mitigation Date')}
                // value={planned_date}
                // onChange={e => set_planned_date(e.target.value)}
              />
            </FormControl>
          </Grid>
          {/* planned mitigation date */}

          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* <h5>Security Requirments:</h5> */}

                <TextField
                  type='text'
                  label={t('Security Requirments')}
                  style={{ width: '100%' }}
                  // value={security_requirements}
                  // onChange={e => set_security_requirements(e.target.value)}
                />
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
                    fullWidth
                    label={t('Planning Strategy')}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.planningstrategy}>{allMit?.data?.planningstrategy}</MenuItem> */}

                    {strategy_dropdown.map(item =>
                      item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                    )}
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
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Security Reccomendations')}
                  // value={security_recommendations}
                  // onChange={e => set_security_recommendations(e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>
          {/* //end of externalreferenceid */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
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
                    // value={effort}
                    fullWidth
                    label={t('Mitigation Effort')}
                    // onChange={e => {
                    //   setMit(e.target.value)
                    //   set_effort(e.target.value)
                    //   onChange(e)
                    // }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {/* <MenuItem value=''>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationeffort}>{allMit?.data?.mitigationeffort}</MenuItem> */}

                    {efforts_dropdown.map(item =>
                      item !== null ? (
                        <MenuItem key={item.lookupId} value={item.lookupId}>
                          {item.lookupName}
                        </MenuItem>
                      ) : (
                        ''
                      )
                    )}
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
                <TextField type='file' style={{ width: '100%' }} />
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
                    // value={cost}
                    fullWidth
                    label={t('Mitigation Cost')}
                    // onChange={e => {
                    //   // setSelectedRisk(e.target.value)
                    //   // onChange(e)
                    //   set_cost(e.target.value)
                    // }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    {/* <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem> */}
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

                <TextField
                  type='number'
                  variant='outlined'
                  // value={allMit?.data?.mitigationpercent}
                  label={t('Mitigation Percent')}
                  // value={percent}
                  // onChange={e => set_percent(e.target.value)}
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
                      // value={owner}
                      fullWidth
                      label={t('Mitigation Owner')}
                      // onChange={e => set_owner(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {/* <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem> */}

                      {additionalstakeholders_dropdown.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
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
                  {t('Mitigation Team')}
                </InputLabel>
                <Controller
                  name='mitigation cost'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      // value={team}
                      fullWidth
                      multiple
                      label={t('Mitigation Team')}
                      // onChange={e => set_team(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value='$0 to $100,000'>None is Selected</MenuItem>
                    <MenuItem value={allMit?.data?.mitigationcost}>{allMit?.data?.mitigationcost}</MenuItem>

                      {team_dropdown.map(item =>
                        item !== null ? <MenuItem value={item.id}>{item.name}</MenuItem> : ''
                      )}
                    </Select>
                  )}
                />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Mitigation Percent
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}

            {/* <Grid item sx={{ width: '40%', marginTop: 8, marginLeft: 1 }}>
              <FormControl fullWidth>
            

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
                      // value={controls}
                      multiple
                      fullWidth
                      label={t('Mitigation Control')}
                      // onChange={e => set_controls(e.target.value)}
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
            </Grid> */}

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
