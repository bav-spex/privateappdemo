import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import {
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import toast from 'react-hot-toast'
import authConfig from 'src/configs/auth'

import { useTranslation } from 'react-i18next'

import {
  getAdditionlStakeHoldersDropDown,
  getTeamDropDown,
  getControlDropDown,
  getStrategyDropDown,
  getEffortsDropDown
} from 'src/store/apps/common'

import moment from 'moment'
import apiHelper from 'src/store/apiHelper'

const NewMitigation = () => {
  const data = useSelector(state => state.mitList)
  const router = useRouter()
  const { t } = useTranslation()
  const currentDate = moment().format('YYYY-MM-DD')

  const [efforts_dropdown, set_efforts_dropdown] = useState([])
  const [strategy_dropdown, set_strategy_dropdown] = useState([])
  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])

  const [team_dropdown, set_team_dropdown] = useState([])
  const [teamMappingName, setTeamMappingName] = useState([])
  const [teamDropdownIds, setTeamDropdownIds] = useState([])

  const [control_dropdown, set_control_dropdown] = useState([])
  const [controlMappingName, setControlMappingName] = useState([])
  const [controlDropdownIds, setControlDropdownIds] = useState([])

  const [singleMitigationData, setSingleMitigationData] = useState({
    id: 0,
    owner: 0,
    comments: 'string',
    submitted_by: 0,
    last_update: currentDate,
    riskId: 0,
    mitigationsubmissiondate: currentDate,
    currentsolution: 'string',
    plannedmitigationdate: currentDate,
    securityrequirements: 'string',
    securityrecommendations: 'string',
    planningstrategy: 100,
    mitigationeffort: 0,
    mitigationcost: 0,
    mitigationowner: 0,
    mitigationteam: [],
    mitigationpercent: 0,
    mitigationcontrols: [],
    supportingdocumentation: 'string',
    controlvalidationdetails: 'string',
    uploadartifact: 'string',
    audittrail: 'string'
  })

  useEffect(() => {
    getEffortsDropDown(set_efforts_dropdown, () => {})
    getStrategyDropDown(set_strategy_dropdown)
    getStrategyDropDown(set_control_dropdown)
    getControlDropDown(set_control_dropdown)
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown)
    getTeamDropDown(set_team_dropdown, () => {})
  }, [])

  // Current Solution
  // Security Requirments
  // Planning Strategy
  // Security Reccomendations
  // Mitigations Efforts
  // Mitigations Cost
  // Mitigation Percent
  // Mitigations Owner
  // Owner
  // Submitted By
  // Comments
  // Control Validation Details
  // Upload Artifact
  // Audit Trail
  const handleChange = (name, value) => {
    // console.log(name, value)
    setSingleMitigationData({ ...singleMitigationData, [name]: value })
  }

  // plannedmitigationdate
  const handleDateChange = (name, value) => {
    // console.log(name, value)
    setSingleMitigationData({ ...singleMitigationData, [name]: value })
  }

  // File Change
  const handleFileChange = async e => {
    const selectedFile = e.target.files[0]
    const formData = new FormData()
    console.log('selected file is', selectedFile)
    formData.append('file', selectedFile)
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1])
    }
  }

  // Team Change
  const handleTeamChange = event => {
    const {
      target: { value }
    } = event

    setTeamMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleMitigationData) {
      let teamIds = []

      teamMappingName.map(name => {
        team_dropdown.find(team => {
          if (team.name === name) {
            teamIds.push(Number(team.id))
          }
        })
      })
      setTeamDropdownIds([...singleMitigationData.mitigationteam, ...teamIds])
    }
  }, [teamMappingName])

  // Controls Change
  const handleControlChange = event => {
    const {
      target: { value }
    } = event

    setControlMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleMitigationData) {
      let controlIds = []

      teamMappingName.map(name => {
        team_dropdown.find(control => {
          if (control.name === name) {
            controlIds.push(Number(control.id))
          }
        })
      })
      setControlDropdownIds([...singleMitigationData.mitigationcontrols, ...controlIds])
    }
  }, [controlMappingName])

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: useMemo(() => {
      return data
    }, [data])
  })

  //api to save the details of the mitigation
  const onSubmit = async values => {
    const payload = {
      ...singleMitigationData,
      mitigationcontrols: controlDropdownIds,
      mitigationteam: teamDropdownIds,
      owner: Number(singleMitigationData.mitigationowner),
      riskId: Number(router.query.riskId),
      mitigationsubmissiondate: moment(singleMitigationData.mitigationsubmissiondate).format('MM/DD/YYYY'),
      last_update: moment(singleMitigationData.mitigationsubmissiondate).format('MM/DD/YYYY'),
      plannedmitigationdate: moment(singleMitigationData.plannedmitigationdate).format('MM/DD/YYYY')
    }
    apiHelper(`${authConfig.riskDevRakshitah_base_url}risks/${router.query.riskId}/mitigation/new`, 'post', payload, {})
      .then(res => {
        toast.success('res.data.data.msg')
        router.push(`/home/risk/${router.query.riskId}/mitigation`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{t('New Mitigation')}</h3>
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
        <Grid container spacing={2} marginTop={'10px'}>
          {/* Submisiion Date */}
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
              <TextField
                type='date'
                variant='outlined'
                label={t('Mitigation submission date')}
                defaultValue={currentDate}
                name='mitigationsubmissiondate'
                value={singleMitigationData.mitigationsubmissiondate}
                disabled={true}
              />
            </FormControl>
          </Grid>

          {/* Current Solution */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Current solution')}
                  name='currentsolution'
                  value={singleMitigationData.currentsolution}
                  onChange={e => handleChange('currentsolution', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Current Planned Mititgation Date */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <TextField
                type='date'
                variant='outlined'
                label={t('Planned mitigation Date')}
                defaultValue={currentDate}
                value={singleMitigationData.plannedmitigationdate}
                onChange={e => handleDateChange('plannedmitigationdate', e.target.value)}
                // disabled={true}
              />
            </FormControl>
          </Grid>

          {/* Security Requirments */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Security Requirments')}
                  name='securityrequirements'
                  value={singleMitigationData.securityrequirements}
                  onChange={e => handleChange('securityrequirements', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Planning Strategy */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Planning stratergy')}
              </InputLabel>
              <Controller
                name='planningstrategy'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.planningstrategy}
                    fullWidth
                    label={t('Planning Strategy')}
                    onChange={e => {
                      handleChange('planningstrategy', e.target.value)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {strategy_dropdown.map(c => (
                      <MenuItem key={c.id} value={c.lookupId}>
                        {c.lookupName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Planning Stratergy
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Security Reccomendations */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Security Reccomendations')}
                  name='securityrecommendations'
                  value={singleMitigationData.securityrecommendations}
                  onChange={e => handleChange('securityrecommendations', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Mitigations Efforts */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigations Efforts')}
              </InputLabel>
              <Controller
                name='mitigationeffort'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.mitigationeffort}
                    fullWidth
                    label={t('Mitigations Efforts')}
                    onChange={e => {
                      handleChange('mitigationeffort', e.target.value)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {efforts_dropdown.map(c => (
                      <MenuItem key={c.id} value={c.lookupId}>
                        {c.lookupName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigations Efforts
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* File upload */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <TextField
                type='file'
                bg-color='primary'
                onChange={e => handleFileChange(e)}
                name='img'
                variant='outlined'
              />
            </FormControl>
          </Grid>

          {/* Mitigations Cost */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigations Cost')}
              </InputLabel>
              <Controller
                name='mitigationeffort'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.mitigationcost}
                    fullWidth
                    label={t('Mitigations Cost')}
                    onChange={e => {
                      handleChange('mitigationcost', e.target.value)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value={0}>None is Selected</MenuItem>
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigations Costs
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Mitigation Percent */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <TextField
                type='number'
                style={{ width: '100%' }}
                variant='outlined'
                name='mitigationpercent'
                label={t('Mitigation Percent')}
                value={singleMitigationData.mitigationpercent}
                onChange={e => handleChange('mitigationpercent', Number(e.target.value))}
              />
            </FormControl>
          </Grid>

          {/* Mitigation Owner */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigations Owner')}
              </InputLabel>
              <Controller
                name='mitigationowner'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.mitigationowner}
                    fullWidth
                    label={t('Mitigations Owner')}
                    onChange={e => {
                      handleChange('mitigationowner', Number(e.target.value))
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {additionalstakeholders_dropdown.map(c => (
                      <MenuItem key={c.id} value={Number(c.id)}>
                        {c.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigations Owner
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Owner */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Owner')}
              </InputLabel>
              <Controller
                name='owner'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.owner}
                    fullWidth
                    label={t('Owner')}
                    onChange={e => {
                      handleChange('owner', e.target.value)
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {additionalstakeholders_dropdown.map(c => (
                      <MenuItem key={c.id} value={Number(c.id)}>
                        {c.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Owner
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Team */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Team')}
              </InputLabel>
              <Controller
                name='team'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    multiple
                    value={teamMappingName}
                    fullWidth
                    label={t('Team')}
                    onChange={handleTeamChange}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {team_dropdown.map((item, i) => (
                      <MenuItem key={item.id} value={item.name}>
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

          {/* Mitigation Control */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Mitigation Control')}
              </InputLabel>
              <Controller
                name='mitigationcontrols'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    multiple
                    value={controlMappingName}
                    fullWidth
                    label={t('Mitigation Control')}
                    onChange={handleControlChange}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {control_dropdown.map(c => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Mitigation Control
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* submitted_by */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                {t('Submitted By')}
              </InputLabel>
              <Controller
                name='submitted_by'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={singleMitigationData.submitted_by}
                    fullWidth
                    label={t('Submitted By')}
                    onChange={e => {
                      handleChange('submitted_by', Number(e.target.value))
                    }}
                    error={Boolean(errors?.msg)}
                    labelId='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {additionalstakeholders_dropdown.map(c => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.msg && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  Submitted By
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Comments */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Comments')}
                  name='comments'
                  value={singleMitigationData.comments}
                  onChange={e => handleChange('comments', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Control Validation Details */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Control Validation Details')}
                  name='controlvalidationdetails'
                  value={singleMitigationData.controlvalidationdetails}
                  onChange={e => handleChange('controlvalidationdetails', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Upload Artifact */}
          <Grid item sx={{ width: '40%', marginLeft: 'auto', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Upload Artifact')}
                  name='uploadartifact'
                  value={singleMitigationData.uploadartifact}
                  onChange={e => handleChange('uploadartifact', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>

          {/* Audit Trail */}
          <Grid item sx={{ width: '40%', marginTop: 8 }}>
            <FormControl fullWidth>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  type='text'
                  style={{ width: '100%' }}
                  label={t('Audit Trail')}
                  name='audittrail'
                  value={singleMitigationData.audittrail}
                  onChange={e => handleChange('audittrail', e.target.value)}
                />
              </div>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default NewMitigation
