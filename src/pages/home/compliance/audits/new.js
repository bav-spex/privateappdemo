import React, { useState, useMemo, useEffect } from 'react'

import { FormControl, InputLabel } from '@mui/material'
import { Button, Divider, Select } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'
import {
  getAdditionlStakeHoldersDropDown,
  getAuditStatusDropDown,
  getCategoryDropDown,
  getFrameworkDropDown
} from 'src/store/apps/common'

const AddAudit = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const currentDate = moment().format('YYYY-MM-DD')

  const [additionalstakeholders_dropdown, set_additionalstakeholders_dropdown] = useState([])
  const [framework_dropdown, set_framework_dropdown] = useState([])
  const [category_dropdown, set_category_dropdown] = useState([])
  const [audit_status_dropdown, set_audit_status_dropdown] = useState([])

  const [singleAuditData, setSingleAuditData] = useState({
    auditDate: currentDate,
    auditName: 'string',
    categoryId: 0,
    frameworkId: 0,
    ownerId: 0,
    statusId: 0
  })

  useEffect(() => {
    getFrameworkDropDown(set_framework_dropdown, () => {})
    getCategoryDropDown(set_category_dropdown, () => {})
    getAuditStatusDropDown(set_audit_status_dropdown, () => {})
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown, () => {})
  }, [])

  // auditName
  // categoryId
  // frameworkId
  // ownerId
  // statusId
  const handleChange = (name, value) => {
    // console.log(name, value)
    setSingleAuditData({ ...singleAuditData, [name]: value })
  }

  // Audit Date
  const handleDateChange = (name, value) => {
    // console.log(name, value)
    setSingleAuditData({ ...singleAuditData, [name]: value })
  }

  //api to save the details of the mitigation
  const onSubmit = async values => {
    const payload = {
      ...singleAuditData,
      auditDate: moment(singleAuditData.auditDate).format('MM/DD/YYYY')
    }
    apiHelper(`${authConfig.complianceDevRakshitah_base_url}audit`, 'post', payload, {})
      .then(res => {
        toast.success(res.data.data.result)
        router.push(`/home/compliance/audits`)
        setSingleAuditData({
          review: '',
          reviewer: 0,
          next_step: 0,
          reviewdate: currentDate,
          comment: ''
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>Add Audit</h3>
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
          <Button xs={2} variant='contained' size='medium' onClick={() => router.push(`/home/compliance/audits`)}>
            Cancel
          </Button>
          <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={onSubmit}>
            Save Audit
          </Button>
        </Grid>
      </div>

      <Divider />
      <Grid container spacing={4} marginTop={'10px'}>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            <TextField
              type='date'
              variant='outlined'
              label={t('Audit Date')}
              name='auditDate'
              value={singleAuditData.auditDate}
              onChange={e => handleDateChange('auditDate', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            <TextField
              type='text'
              style={{ width: '100%' }}
              label={t('Audit Name')}
              name='auditName'
              value={singleAuditData.auditName}
              onChange={e => handleChange('auditName', e.target.value)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              {t('Category')}
            </InputLabel>
            <Select
              value={singleAuditData.categoryId}
              fullWidth
              label={t('Category')}
              onChange={e => {
                handleChange('categoryId', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
            >
              {category_dropdown.map(c => (
                <MenuItem key={c.lookupId} value={Number(c.lookupId)}>
                  {c.lookupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              {t('Framework')}
            </InputLabel>
            <Select
              value={singleAuditData.frameworkId}
              fullWidth
              label={t('Framework')}
              onChange={e => {
                handleChange('frameworkId', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
            >
              {framework_dropdown.map(c => (
                <MenuItem key={c.lookupId} value={Number(c.id)}>
                  {c.framework_Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%' }}>
          <FormControl fullWidth>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              {t('Owner')}
            </InputLabel>
            <Select
              value={singleAuditData.ownerId}
              fullWidth
              label={t('Owner')}
              onChange={e => {
                handleChange('ownerId', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
            >
              {additionalstakeholders_dropdown.map(c => (
                <MenuItem key={c.id} value={Number(c.id)}>
                  {c.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
          <FormControl fullWidth>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              {t('Audit Status')}
            </InputLabel>
            <Select
              value={singleAuditData.statusId}
              fullWidth
              label={t('Audit Status')}
              onChange={e => {
                handleChange('statusId', e.target.value)
              }}
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              required
            >
              {audit_status_dropdown.map(c => (
                <MenuItem key={c.lookupId} value={Number(c.lookupId)}>
                  {c.lookupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default AddAudit
