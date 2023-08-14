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
import { getControlList } from 'src/pages/home/governance/controls/controlService'

import withRoot from '../../withRoot'

const AddTest = () => {
  const router = useRouter()

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [additional_stakeholders, set_additional_stakeholders] = useState([])
  const [testers, set_testers] = useState([])
  const [teams, set_teams] = useState([])
  const [test_name, set_test_name] = useState('')
  const [test_frequency, set_test_frequency] = useState('')
  const [last_test_date, set_last_test_date] = useState('')
  const [objective, set_objective] = useState('')
  const [test_steps, set_test_steps] = useState('')
  const [approximate_time, set_approximate_time] = useState('')
  const [expected_results, set_expected_results] = useState('')
  const [tags, set_tags] = useState('')

  const [tester_list, set_tester_list] = useState([])
  const [teams_list, set_teams_list] = useState([])
  const [controls_list, set_controls_list] = useState([])
  const [frameworkControlId, set_frameworkControlId] = useState('')

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
    router.push('/home/compliance/test')
  }

  const submit_test = async () => {
    console.log('Submit test data is')
    console.log(test_name)
    console.log(testers)
    console.log(teams)
    console.log(additional_stakeholders)

    const res = await fetch(`${auth.add_test}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        additionalstakeholders: additional_stakeholders,
        testname: test_name,
        tester: testers,
        teams: teams,
        testfrequency: test_frequency,
        lasttestdate: last_test_date,
        objective: objective,
        teststeps: test_steps,
        approximatetime: approximate_time,
        expectedresults: expected_results,
        tags: tags
      })
    })
    const data = await res.json()
    console.log('add test is', data)
    toast.success('Test added successfully')
    // router.push('/home/compliance/test');
  }

  const fetch_testers = async () => {
    const res = await fetch(`${auth.addi}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    set_tester_list(data.data.users)
    console.log('dropdown data is', data)
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
    console.log('teams data is', data)
  }

  const fetchControlList = async () => {
    console.log('Fetching control list')

    let successCallback = response => {
      set_controls_list(response.data.controls)
    }
    getControlList(() => {}, successCallback)
  }

  useEffect(() => {
    fetchControlList()
    fetch_testers()
    fetch_teams()
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{t('Add Test')}</h1>

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
            <Button
              type='submit '
              size='medium'
              variant='contained'
              onClick={submit_test}
              style={{ marginLeft: '10px' }}
            >
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
              <InputLabel id='demo-simple-select-label'>{t('Framework Control Id')}</InputLabel>
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
              value={test_steps}
              onChange={e => set_test_steps(e.target.value)}
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
                label='date'
                value={last_test_date}
                onChange={e => set_last_test_date(e.target.value)}
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
              value={expected_results}
              onChange={e => set_expected_results(e.target.value)}
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

export default AddTest
