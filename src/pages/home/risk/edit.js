import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import {
  getSingleRisk,
  getRiskDropDown,
  getThreatDropDown,
  getCategoryDropDown,
  getSiteLocationDropDown,
  getRiskScoreDropDown,
  getRiskSourceDropDown,
  getCurrentLikelyHoodDropDown,
  getControlRegulationDropDown,
  getCurrentImpactDropDown,
  getAffectedAssetsDropDown,
  getTechnologyDropDown,
  updateRisk
} from 'src/store/apps/Risks/RiskService'

import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core/styles'

//Third party imports
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import { getAdditionlStakeHoldersDropDown, getTeamDropDown } from 'src/store/apps/common'

const EditRisk = () => {
  const data = useSelector(state => state.riskList)
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const dispatch = useDispatch()

  const [risk_dropdown, set_risk_dropdown] = useState([])
  const [riskMappingName, setRiskMappingName] = useState([])
  const [riskDropdownIds, setRiskDropdownIds] = useState([])

  const [threat_dropdown, set_threat_dropdown] = useState([])
  const [threatMappingName, setThreatMappingName] = useState([])
  const [threatDropdownIds, setThreatDropdownIds] = useState([])

  const [cat_dropdown, set_cat_dropdown] = useState([])
  const [risksource_dropdown, set_risksource_dropdown] = useState([])

  const [sitelocation_dropdown, set_sitelocation_dropdown] = useState([])
  const [sitelocationMappingName, setSitelocationMappingName] = useState([])
  const [sitelocationDropdownIds, setSitelocationDropdownIds] = useState([])

  const [riskscore_dropdown, set_riskscore_dropdown] = useState([])
  const [currentlikelyhood_dropdown, set_currentlikelyhood_dropdown] = useState([])
  const [controlregulation_dropdown, set_controlregulation_dropdown] = useState([])
  const [currentimpact_dropdown, set_currentimpact_dropdown] = useState([])

  const [affectedassets_dropdown, set_affectedassets_dropdown] = useState([])
  const [affectedassetsMappingName, setAffectedassetsMappingName] = useState([])
  const [affectedassetsDropdownIds, setAffectedassetsDropdownIds] = useState([])

  const [technology_dropdown, set_technology_dropdown] = useState([])
  const [technologyMappingName, setTechnologyMappingName] = useState([])
  const [technologyDropdownIds, setTechnologyDropdownIds] = useState([])

  const [team_dropdown, set_team_dropdown] = useState([])
  const [teamMappingName, setTeamMappingName] = useState([])
  const [teamDropdownIds, setTeamDropdownIds] = useState([])

  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])
  const [additionalstakeholdersMappingName, setAdditionalstakeholdersMappingName] = useState([])
  const [additionalstakeholdersDropdownIds, setAdditionalstakeholdersDropdownIds] = useState([])

  const [singleRiskData, setSingleRiskData] = useState()

  useEffect(() => {
    getSingleRisk(router.query.id, () => {}, setSingleRiskData)
  }, [router.query.id])

  useEffect(() => {
    getRiskDropDown(set_risk_dropdown, () => {})
    getThreatDropDown(set_threat_dropdown, () => {})
    getCategoryDropDown(set_cat_dropdown, () => {})
    getRiskSourceDropDown(set_risksource_dropdown, () => {})
    getSiteLocationDropDown(set_sitelocation_dropdown, () => {})
    getRiskScoreDropDown(set_riskscore_dropdown, () => {})
    getCurrentLikelyHoodDropDown(set_currentlikelyhood_dropdown, () => {})
    getControlRegulationDropDown(set_controlregulation_dropdown, () => {})
    getCurrentImpactDropDown(set_currentimpact_dropdown, () => {})
    getAffectedAssetsDropDown(set_affectedassets_dropdown, () => {})
    getTechnologyDropDown(set_technology_dropdown, () => {})
    getTeamDropDown(set_team_dropdown, () => {})
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown, () => {})
  }, [])

  // Change Events for
  // Subject
  // Category
  // Risk Source
  // Risk Score
  // External Reference Id
  // Current Likely Hood
  // Control Regulation
  // Current Impact
  // Control Number
  // Risk Assessment
  // Additional Notes
  // Owner
  // Owner Manager
  // Tags
  const handleChange = (name, value) => {
    console.log(name, value)
    setSingleRiskData({ ...singleRiskData, [name]: value })
  }

  // Risk Change
  const handleRiskChange = event => {
    const {
      target: { value }
    } = event

    setRiskMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let riskIds = []

      riskMappingName.map(name => {
        risk_dropdown.find(risk => {
          if (risk.lookupName === name) {
            riskIds.push(risk.lookupId)
          }
        })
      })

      setRiskDropdownIds([...singleRiskData.riskmapping, ...riskIds])
    }
  }, [riskMappingName])

  // Threat Change
  const handleThreatChange = event => {
    const {
      target: { value }
    } = event

    setThreatMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let threatIds = []

      threatMappingName.map(name => {
        threat_dropdown.find(threat => {
          if (threat.lookupName === name) {
            threatIds.push(threat.lookupId)
          }
        })
      })
      setThreatDropdownIds([...singleRiskData.threatmapping, ...threatIds])
    }
  }, [threatMappingName])

  // SiteLocation Change
  const handleSiteLocationChange = event => {
    const {
      target: { value }
    } = event

    setSitelocationMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let sitelocationtIds = []

      sitelocationMappingName.map(name => {
        sitelocation_dropdown.find(sitelocation => {
          if (sitelocation.lookupName === name) {
            sitelocationtIds.push(sitelocation.lookupId)
          }
        })
      })
      setSitelocationDropdownIds([...singleRiskData.location_ids, ...sitelocationtIds])
    }
  }, [sitelocationMappingName])

  // Affected Assets Change
  const handleAffectedAssetsChange = event => {
    const {
      target: { value }
    } = event

    setAffectedassetsMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let assetsIds = []

      affectedassetsMappingName.map(name => {
        affectedassets_dropdown.find(asset => {
          if (asset.lookupName === name) {
            assetsIds.push(asset.lookupId)
          }
        })
      })
      setAffectedassetsDropdownIds([...singleRiskData.affectedassets, ...assetsIds])
    }
  }, [affectedassetsMappingName])

  // Technology Change
  const handleTechnologyChange = event => {
    const {
      target: { value }
    } = event

    setTechnologyMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let technologyIds = []

      technologyMappingName.map(name => {
        technology_dropdown.find(techno => {
          if (techno.lookupName === name) {
            technologyIds.push(techno.lookupId)
          }
        })
      })
      setTechnologyDropdownIds([...singleRiskData.technology, ...technologyIds])
    }
  }, [technologyMappingName])

  // Team Change
  const handleTeamChange = event => {
    const {
      target: { value }
    } = event

    setTeamMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let teamIds = []

      teamMappingName.map(name => {
        team_dropdown.find(team => {
          if (team.name === name) {
            teamIds.push(Number(team.id))
          }
        })
      })
      setTeamDropdownIds([...singleRiskData.team, ...teamIds])
    }
  }, [teamMappingName])

  // Additional Stake Holders Change
  const handleAdditionalStakeHoldersChange = event => {
    const {
      target: { value }
    } = event

    setAdditionalstakeholdersMappingName(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    if (singleRiskData) {
      let stakeHolderIds = []

      additionalstakeholdersMappingName.map(name => {
        additionalstakeholders_dropdown.find(stake => {
          if (stake.name === name) {
            stakeHolderIds.push(Number(stake.id))
          }
        })
      })
      setAdditionalstakeholdersDropdownIds([...singleRiskData.additionalstakeholders, ...stakeHolderIds])
    }
  }, [additionalstakeholdersMappingName])

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

  const onSubmit = values => {
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
    console.log(payload)
    updateRisk(payload)
    toast.success('Submitted Risk')
  }

  if (!singleRiskData) {
    return <FallbackSpinner />
  }

  console.log('singleRiskData====>', singleRiskData)
  if (singleRiskData) {
    return (
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>{t('Edit Risk')}</h3>
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
              <Button xs={2} variant='contained' size='medium' onClick={() => router.push(`/home/risk`)}>
                {t('Cancel')}
              </Button>
              <Button type='submit' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={onSubmit}>
                {t('Submit Risk')}
              </Button>
            </Grid>
          </div>

          <Grid container spacing={2}>
            {/* Subject  */}
            <Grid item sx={{ width: '100%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>

                <TextField
                  id='outlined-basic'
                  type='text'
                  variant='outlined'
                  label={t('Subject')}
                  name='subject'
                  value={singleRiskData.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  placeholder='select a subject or start typing search ...'
                />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    subject is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* Risk mapping  */}
            <Grid item sx={{ width: '100%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Select a Risk Mapping or start typing to search
                </InputLabel>
                <Controller
                  name='riskmapping'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      fullWidth
                      value={riskMappingName}
                      label={'Select a Risk mapping or start typing to search'}
                      onChange={handleRiskChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {risk_dropdown.map((item, i) => (
                        <MenuItem value={item.lookupName} key={i}>
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
            {/* Threat mapping  */}
            <Grid item sx={{ width: '100%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Select a Threat Mapping or start typing to search
                </InputLabel>
                <Controller
                  name='threatMapping'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      // value={value}
                      value={threatMappingName}
                      multiple
                      fullWidth
                      label={'Select a Threat Mapping or start typing to search'}
                      onChange={handleThreatChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None</MenuItem>
                      {threat_dropdown.map((item, i) => (
                        <MenuItem value={item.lookupName} key={i}>
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
            {/* Catrgory  */}
            <Grid
              item
              sx={{
                width: '40%',
                marginBottom: '3vh',
                '@media screen and (max-width:600px)': {
                  flexDirection: 'column',
                  marginLeft: 0
                }
              }}
            >
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Category')}
                </InputLabel>
                <Controller
                  name='category'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.category}
                      // defaultValue={'Management'}
                      fullWidth
                      label={t('Category')}
                      onChange={e => {
                        handleChange('category', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {cat_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupId}>
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
            {/* Risk Source  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Risk Source')}
                </InputLabel>
                <Controller
                  name='risksource'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.risksource}
                      fullWidth
                      label={t('Risk Source')}
                      onChange={e => {
                        handleChange('risksource', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {risksource_dropdown.map(r => (
                        <MenuItem key={r.id} value={r.lookupId}>
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
            {/* Site Location  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Site location')}
                </InputLabel>
                <Controller
                  name='sitelocation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      fullWidth
                      value={sitelocationMappingName}
                      label={'Select location'}
                      onChange={handleSiteLocationChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {sitelocation_dropdown.map(item => (
                        <MenuItem value={item.lookupName} key={item.id}>
                          {item.lookupName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    Site location must be selected
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* Risk Score  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Risk Score')}
                </InputLabel>
                <Controller
                  name='riskscoringmethod'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.riskscoringmethod}
                      fullWidth
                      label={t('Risk Score')}
                      onChange={e => {
                        handleChange('riskscoringmethod', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {riskscore_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupId}>
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
            {/* External Reference Id  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('External Refrence id')}:
                </InputLabel>
                <Controller
                  name='externalreferenceid'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.externalreferenceid}
                      fullWidth
                      label={t('Risk Score')}
                      onChange={e => {
                        handleChange('externalreferenceid', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value={singleRiskData.externalreferenceid}>{'String Data'}</MenuItem>
                    </Select>
                  )}
                />
                {errors.msg && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    {' '}
                    External Refrence Id is must
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* Current Likely Hood  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Current likelihood')}
                </InputLabel>

                <Controller
                  name='currentlikelihood'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.currentlikelihood}
                      fullWidth
                      label={t('Current likelihood')}
                      onChange={e => {
                        handleChange('currentlikelihood', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {currentlikelyhood_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupId}>
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
            {/* Control Regulation  */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Control Regulation')}
                </InputLabel>
                <Controller
                  name='controlregulation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.controlregulation}
                      fullWidth
                      label={t('Control regulation')}
                      onChange={e => {
                        handleChange('controlregulation', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {controlregulation_dropdown.map((c, i) => (
                        <MenuItem key={c.id} value={c.id}>
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
            {/* Current Impact */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Current Impact')}
                </InputLabel>
                <Controller
                  name='currentimpact'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={singleRiskData.currentimpact}
                      fullWidth
                      label={t('Current Impact')}
                      onChange={e => {
                        handleChange('currentimpact', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {currentimpact_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupId}>
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
            </Grid>
            {/* Control Number */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <TextField
                  type='text'
                  variant='outlined'
                  label={t('Control Number')}
                  name='controlnumber'
                  value={singleRiskData.controlnumber}
                  onChange={e => handleChange('controlnumber', e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* Risk Assessment */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <TextField
                  type='text'
                  variant='outlined'
                  label={t('Risk Assessment')}
                  name='riskassessment'
                  value={singleRiskData.riskassessment}
                  onChange={e => handleChange('riskassessment', e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* Affected Assets */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Affected Assets')}
                </InputLabel>
                <Controller
                  name='affectedAssets'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      fullWidth
                      label={t('Affected Assets')}
                      value={affectedassetsMappingName}
                      onChange={handleAffectedAssetsChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {affectedassets_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupName}>
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
              </FormControl>
            </Grid>
            {/* Additional Notes */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <TextField
                  type='text'
                  variant='outlined'
                  label={t('Additional Notes')}
                  name='additionalnotes'
                  value={singleRiskData.additionalnotes}
                  onChange={e => handleChange('additionalnotes', e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Technology */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Technology')}
                </InputLabel>
                <Controller
                  name='technology'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      fullWidth
                      label={t('Technology')}
                      value={technologyMappingName}
                      onChange={handleTechnologyChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {technology_dropdown.map(c => (
                        <MenuItem key={c.id} value={c.lookupName}>
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

            {/* File Upload */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
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

            {/* Team */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
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

            {/* Additional Stakeholders */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Additional Stakeholders')}
                </InputLabel>
                <Controller
                  name='additionalstakeholders'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      // value={value}
                      value={additionalstakeholdersMappingName}
                      fullWidth
                      label={t('Additional Stakeholders')}
                      onChange={handleAdditionalStakeHoldersChange}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {/* <MenuItem value=''>None</MenuItem> */}
                      {additionalstakeholders_dropdown.map(item => (
                        <MenuItem key={item.id} value={item.name}>
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

            {/* Owner */}
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
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
                      value={singleRiskData.owner}
                      fullWidth
                      label={t('Owner')}
                      onChange={e => {
                        handleChange('owner', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {/* additionalstakeholders_dropdown & ownerlist is same */}
                      {additionalstakeholders_dropdown.map(item => (
                        <MenuItem key={item.id} value={Number(item.id)}>
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

            {/* Owner Manager  */}
            <Grid container xs={12} />
            <Grid item sx={{ width: '40%', marginBottom: '3vh' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {t('Owner Manager')}:
                </InputLabel>
                <Controller
                  name='ownermanager'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      fullWidth
                      label={t('Owners Manager')}
                      value={singleRiskData.ownermanager}
                      onChange={e => {
                        handleChange('ownermanager', e.target.value)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {/* additionalstakeholders_dropdown & ownermanagerList is same */}
                      {additionalstakeholders_dropdown.map(item => (
                        <MenuItem key={item.id} value={Number(item.id)}>
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

            {/* Tags */}
            <Grid container xs={12}>
              <h3>{t('Tags')}</h3>
              <TextField
                type='text'
                fullWidth
                placeholder={t('Select/AddTag')}
                name='tag'
                value={singleRiskData.tag}
                onChange={e => handleChange('tag', e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    )
  }
}

export default EditRisk
