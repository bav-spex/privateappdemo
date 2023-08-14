import { useState, useEffect, useCallback } from 'react'

import { useTheme } from '@material-ui/core/styles'
import {
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import auth from 'src/configs/auth'
import 'react-toastify/dist/ReactToastify.css'
import { createTest, updateTest, getTestById } from 'src/pages/home/complaince/test/complaince_service'
import { getControlList } from 'src/pages/home/governance/controls/controlService'
import { convertDateFormat } from 'src/util/common'

import withRoot from '../../withRoot'

const SaveTest = () => {
  const router = useRouter()

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [additional_stakeholders, set_additional_stakeholders] = useState([])
  const [testers, set_testers] = useState([])
  const [teams, set_teams] = useState([])
  const [test_name, set_test_name] = useState('')
  const [test_frequency, set_test_frequency] = useState('')
  const [lastassessmentdate, set_lastassessmentdate] = useState('')
  const [objective, set_objective] = useState('')
  const [teststeps, set_teststeps] = useState('')
  const [approximate_time, set_approximate_time] = useState('')
  const [expectedresults, set_expectedresults] = useState('')
  const [tags, set_tags] = useState('')

  const [tester_list, set_tester_list] = useState([])
  const [teams_list, set_teams_list] = useState([])
  const [controls_list, set_controls_list] = useState([])
  const [controls_dict, set_controls_dict] = useState({})
  const [frameworkControlId, set_frameworkControlId] = useState('')
  const [mode, setMode] = useState('create')
  const [id, setId] = useState(null)

  const add_framework_control = e => {
    set_frameworkControlId(e.target.value)
    console.log('frameworkControlId:', frameworkControlId)
  }

  const add_stakeholders = e => {
    set_additional_stakeholders(e.target.value)
    console.log(additional_stakeholders)
  }

  const add_testers = e => {
    set_testers(e.target.value)
  }

  const add_teams = e => {
    set_teams(e.target.value)
  }

  const submitcancel = () => {
    router.push('/home/complaince/test')
  }

  const save_test = async () => {
    let request_data = {
      additionalstakeholders: additional_stakeholders,
      testname: test_name,
      testers: testers,
      teams: teams,
      testfrequency: test_frequency,
      lastassessmentdate: lastassessmentdate,
      lasttestdate: lastassessmentdate,
      objective: objective,
      teststeps: teststeps,
      approximatetime: approximate_time,
      expectedresults: expectedresults,
      tags: tags,
      frameworkControlId: frameworkControlId
    }

    let successCallback = response => {
      toast.success('Test saved successfully.')
      router.push('/home/complaince/test')
    }

    let errorCallback = response => {
      console.log('ERROR:', response)
      toast.error('Something went wrong')
    }
    if (mode == 'create') {
      createTest(request_data, errorCallback, successCallback)
    } else {
      updateTest(router.query.keyword, request_data, errorCallback, successCallback)
    }
  }

  const fetch_testers = async () => {
    const res = await fetch(`${auth.owner_list}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    set_tester_list(data.data.users)
  }

  const fetch_teams = async () => {
    const res = await fetch(`${auth.team_list}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    set_teams_list(data.data.users)
  }

  const fetchControlList = async () => {
    console.log('Fetching control list')

    let successCallback = response => {
      let d = {}
      let controls = response.data.controls
      controls.map(row => {
        d[row['control-number']] = row.id
      })
      set_controls_dict(d)
      set_controls_list(controls)
    }
    getControlList(() => {}, successCallback)
  }

  const setTestById = async id => {
    let successCallback = response => {
      let data = response.data
      set_test_name(data.testname)
      set_testers(data.testers)
      set_additional_stakeholders(data.additionalstakeholders)
      set_teams(data.teams)
      set_test_frequency(data.testfrequency)
      set_approximate_time(data.approximatetime)
      set_tags(data.tags)
      let control_id = controls_dict[data.controlnumber] || null
      // set_frameworkControlId(control_id);
      set_objective(0)
      set_teststeps(0)
      set_expectedresults(0)
      let last_assessment_date = data.lastassessmentdate || null
      if (last_assessment_date) {
        last_assessment_date = convertDateFormat(data.lastassessmentdate)
        console.log('lastassessmentdate1:', last_assessment_date)
        set_lastassessmentdate(last_assessment_date)
      }
      // control id, objective, test setps, expected_results, lastassessmentdate todo
    }

    let errorCallback = response => {
      console.log('ERROR:', response)
      toast.error('Something went wrong')
    }
    getTestById(id, errorCallback, successCallback)
  }

  useEffect(() => {
    fetchControlList()
    fetch_testers()
    fetch_teams()

    let keyword = router.query.keyword || null
    if (keyword) {
      setMode('update')
      setId(keyword)
      setTestById(keyword)
    } else {
      setMode('create')
    }
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ textTransform: 'capitalize' }}>{t(`${mode} Test`)}</h1>

          <ToastContainer />
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
            <Button xs={2} variant='contained' size='medium' onClick={submitcancel}>
              {t('Cancel')}
            </Button>
            <Button type='submit ' size='medium' variant='contained' onClick={save_test} style={{ marginLeft: '10px' }}>
              {t('Save')}
            </Button>
          </Grid>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                id='outlined-basic'
                label={t('Test Name')}
                variant='outlined'
                value={test_name}
                onChange={e => set_test_name(e.target.value)}
              />
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Tester')}</InputLabel>
              <Select
                multiple
                value={testers}
                onChange={add_testers}
                labelId='demo-simple-select-label'
                label={t('Tester')}
                inputProps={{
                  name: 'selectedValues',
                  id: 'selected-values'
                }}
              >
                {tester_list.map(item =>
                  item !== null ? (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ) : (
                    ''
                  )
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Additional Stakeholders')}</InputLabel>
              <Select
                multiple
                value={additional_stakeholders}
                onChange={add_stakeholders}
                labelId='demo-simple-select-label'
                label={t('Additional Stakeholders')}
                inputProps={{
                  name: 'selectedValues',
                  id: 'selected-values'
                }}
              >
                {tester_list.map(item =>
                  item !== null ? (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ) : (
                    ''
                  )
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Teams')}</InputLabel>
              <Select
                multiple
                value={teams}
                onChange={add_teams}
                labelId='demo-simple-select-label'
                label={t('Teams')}
                inputProps={{
                  name: 'selectedValues',
                  id: 'selected-values'
                }}
              >
                {teams_list.map(item =>
                  item !== null ? (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ) : (
                    ''
                  )
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                id='outlined-basic'
                label={t('Test Frequency')}
                variant='outlined'
                type='number'
                value={test_frequency}
                onChange={e => set_test_frequency(e.target.value)}
              />
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control ')}</InputLabel>
              <Select
                value={frameworkControlId}
                onChange={add_framework_control}
                labelId='demo-simple-select-label'
                label={t('Framework Control Id')}
                inputProps={{
                  name: 'selectedValues',
                  id: 'selected-values'
                }}
              >
                {controls_list.map(item =>
                  item !== null ? (
                    <MenuItem key={item.id} value={item.id}>
                      {item['control-number']}
                    </MenuItem>
                  ) : (
                    ''
                  )
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Objective')}
              variant='outlined'
              value={objective}
              onChange={e => set_objective(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Test Steps')}
              variant='outlined'
              value={teststeps}
              onChange={e => set_teststeps(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                id='outlined-basic'
                label={t('Approximate Time')}
                variant='outlined'
                type='number'
                value={approximate_time}
                onChange={e => set_approximate_time(e.target.value)}
              />
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                id='outlined-basic'
                variant='outlined'
                type='date'
                label='Last AssessmentDate'
                value={lastassessmentdate}
                onChange={e => set_lastassessmentdate(e.target.value)}
              />
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Expected Results')}
              variant='outlined'
              value={expectedresults}
              onChange={e => set_expectedresults(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Tags')}
              variant='outlined'
              value={tags}
              onChange={e => set_tags(e.target.value)}
            />
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default SaveTest
