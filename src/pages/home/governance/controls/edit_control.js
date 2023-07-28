import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth'
// import './edit_control.css'
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
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getControlById, updateControl } from 'src/pages/home/governance/controls/controlService'
import { fwa } from 'src/pages/home/framework/frameworkService'
import { getCategoryData, getUsers } from 'src/pages/home/Document/DocService'

const Edit_control = () => {
  const [class1, setClass1] = useState('')
  const [controlType, setControlType] = useState('')
  const [currentMaturity, setCurrentMaturity] = useState('')
  const [desiredMaturity, setDesiredMaturity] = useState('')
  const [family, setFamily] = useState('')
  const [owner, setOwner] = useState('')
  const [phase, setPhase] = useState('')
  const [desc, setDesc] = useState('')
  const [shortname, setShortname] = useState('')
  const [longname, setLongname] = useState('')
  const [supplementalguidance, setSupplementalguidance] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const [controlNumber, setControlNumber] = useState('')
  const [framework, setFramework] = useState([])

  const [classList, setClassList] = useState([])
  const [phaseList, setPhaseList] = useState([])
  const [maturityList, setMaturityList] = useState([])
  const [priorityList, setPriorityList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [familyList, setFamilyList] = useState([])
  const [statusList, setStatusList] = useState([])
  const [ownerList, setOwnerList] = useState([])
  const [frameworkList, setFrameworkList] = useState([])

  const handleChange = event => {
    setClass1(event.target.value)
  }

  const { t, i18n } = useTranslation()

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const router = useRouter()
  console.log('id is', router.query)

  const submitcancel = () => {
    router.push('/home/governance/controls')
  }

  const submitdetails = async () => {
    let successCallback = response => {
      toast.success('Control Edited Successfully')
      router.push('/home/governance/controls')
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }
    let request_data = {
      shortname: shortname,
      number: controlNumber,
      owner: owner,
      priority: priority,
      phase: phase,
      family: family,
      currentmaturity: currentMaturity,
      desiredmaturity: desiredMaturity,
      controltype: controlType,
      class: class1,
      status: status,
      desc: desc,
      supplementalguidance: supplementalguidance,
      frameworkids: framework,
      long_name: longname,
      submission_date: new Date().toISOString(),
      last_audit_date: new Date().toISOString(),
      next_audit_date: new Date().toISOString(),
      desired_frequency: 0,
      mitigation_percent: 0,
      deleted: 0
    }
    updateControl(router.query.keyword, request_data, errorCallback, successCallback)
  }

  const fetch_control_data_by_id = async () => {
    let successCallback = response => {
      setClass1(response.data.class)
      setControlType(response.data.controltype)
      setPhase(response.data.phase)
      setCurrentMaturity(response.data.currentmaturity)
      setDesiredMaturity(response.data.desiredmaturity)
      setPriority(response.data.priority)
      setFamily(response.data.family)
      setStatus(response.data.status)
      setShortname(response.data.shortname)
      setDesc(response.data.desc)
      setSupplementalguidance(response.data.supplementalguidance)
      setOwner(response.data.owner)
      setFramework(response.data.frameworkids)
      setControlNumber(response.data.number)
      setLongname(response.data.long_name)
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }

    getControlById(router.query.keyword, errorCallback, successCallback)
  }

  let commonErrorCallback = response => {
    toast.error('Something went wrong')
  }
  const fetch_classList = async () => {
    getCategoryData(2, commonErrorCallback, setClassList)
  }

  const fetch_phaseList = async () => {
    getCategoryData(3, commonErrorCallback, setPhaseList)
  }

  const fetch_maturityList = async () => {
    getCategoryData(4, commonErrorCallback, setMaturityList)
  }

  const fetch_priorityList = async () => {
    getCategoryData(5, commonErrorCallback, setPriorityList)
  }

  const fetch_typeList = async () => {
    getCategoryData(6, commonErrorCallback, setTypeList)
  }

  const fetch_familyList = async () => {
    getCategoryData(7, commonErrorCallback, setFamilyList)
  }

  const fetch_statusList = async () => {
    getCategoryData(8, commonErrorCallback, setStatusList)
  }

  const fetch_ownerList = async () => {
    let successCallback = response => {
      setOwnerList(response.data.users)
    }
    getUsers(commonErrorCallback, successCallback)
  }

  useEffect(() => {
    fetch_control_data_by_id()
    fetch_classList()
    fetch_phaseList()
    fetch_maturityList()
    fetch_priorityList()
    fetch_ownerList()
    fetch_typeList()
    fetch_familyList()
    fetch_statusList()
    fwa(() => {}, setFrameworkList)
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div>
          <h1>Edit Control</h1>
        </div>
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
            onClick={submitdetails}
            style={{ marginLeft: '10px' }}
          >
            {t('Save')}
          </Button>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Control Short Name')}
              variant='outlined'
              value={shortname}
              onChange={e => setShortname(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Control Long Name')}
              variant='outlined'
              value={longname}
              onChange={e => setLongname(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Control Description')}
              variant='outlined'
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <TextField
              id='outlined-basic'
              label={t('Supplemental Guidance')}
              variant='outlined'
              value={supplementalguidance}
              onChange={e => setSupplementalguidance(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Class')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={class1}
                label={t('Control Class')}
                onChange={e => setClass1(e.target.value)}
              >
                {classList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Phase')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={phase}
                label={t('Control Phase')}
                onChange={e => setPhase(e.target.value)}
              >
                {phaseList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
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
                label={t('Control Number')}
                variant='outlined'
                value={controlNumber}
                onChange={e => setControlNumber(e.target.value)}
              />
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Current Maturity')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={currentMaturity}
                label={t('Current Maturity')}
                onChange={e => setCurrentMaturity(e.target.value)}
              >
                {maturityList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Desired Maturity')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={desiredMaturity}
                label={t('Desired Maturity')}
                onChange={e => setDesiredMaturity(e.target.value)}
              >
                {maturityList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Priority')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={priority}
                label={t('Control Priority')}
                onChange={e => setPriority(e.target.value)}
              >
                {priorityList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Family')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={family}
                label={t('Control Family')}
                onChange={e => setFamily(e.target.value)}
              >
                {familyList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Type')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={controlType}
                label={t('Control Type')}
                onChange={e => setControlType(e.target.value)}
              >
                {typeList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Status')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status}
                label={t('Control Phase')}
                onChange={e => setStatus(e.target.value)}
              >
                {statusList.map(item =>
                  item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Owner')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={owner}
                label={t('Control Owner')}
                onChange={e => setOwner(e.target.value)}
              >
                {ownerList.map(item => (item !== null ? <MenuItem value={item.id}>{item.name}</MenuItem> : ''))}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '40%' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{t('Control Framework')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                multiple
                id='demo-simple-select'
                value={framework}
                label={t('Control Framework')}
                onChange={e => setFramework(e.target.value)}
              >
                {frameworkList.map(item =>
                  item !== null ? <MenuItem value={item.id}>{item.framework_Name}</MenuItem> : ''
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit_control
