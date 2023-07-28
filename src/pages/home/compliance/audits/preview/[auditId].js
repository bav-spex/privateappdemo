import React, { useState, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { CircularProgress, FormControl, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Button, Divider, Select } from '@mui/material'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { getAdditionlStakeHoldersDropDown, getAuditStatusDropDown, getCategoryDropDown } from 'src/store/apps/common'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import apiHelper from 'src/store/apiHelper'

const PreviewAudit = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const currentDate = moment().format('YYYY-MM-DD')

  const [loading, setLoading] = useState(true)

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
    // getFrameworkDropDown(set_framework_dropdown, () => {})
    getCategoryDropDown(set_category_dropdown, () => {})
    getAuditStatusDropDown(set_audit_status_dropdown, () => {})
    getAdditionlStakeHoldersDropDown(set_additionalstakeholders_dropdown, () => {})
  }, [])

  useEffect(() => {
    apiHelper(`${authConfig.compliance}audit/${router.query.auditId}`, 'get', null, {})
      .then(res => {
        setSingleAuditData({
          ...res.data.data,
          auditDate: moment(res.data.data.auditDate).format('YYYY-MM-DD')
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [router.query.auditId])

  // auditName
  // categoryId
  // frameworkId
  // ownerId
  // statusId
  // const handleChange = (name, value) => {
  //   // console.log(name, value)
  //   setSingleAuditData({ ...singleAuditData, [name]: value })
  // }

  // const handleDateChange = (name, value) => {
  //   // console.log(name, value)
  //   setSingleAuditData({ ...singleAuditData, [name]: value })
  // }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <h3>Audit Preview</h3>
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
            Back
          </Button>
        </Grid>
      </div>

      <Divider />
      {loading ? (
        <Box
          sx={{
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress disableShrink sx={{ mt: 6, color: '#060056' }} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item sx={{ width: '40%' }}>
            <FormControl fullWidth>
              <TextField
                type='date'
                variant='outlined'
                label={t('Audit Date')}
                name='auditDate'
                value={singleAuditData.auditDate}
                // onChange={e => handleDateChange('auditDate', e.target.value)}
                disabled={true}
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
                // onChange={e => handleChange('auditName', e.target.value)}
                required
                disabled={true}
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
                // onChange={e => {
                //   handleChange('categoryId', e.target.value)
                // }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
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
                // onChange={e => {
                //   handleChange('frameworkId', e.target.value)
                // }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
              >
                {framework_dropdown.map(c => (
                  <MenuItem key={c.lookupId} value={Number(c.lookupId)}>
                    {c.lookupName}
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
                // onChange={e => {
                //   handleChange('ownerId', e.target.value)
                // }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
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
                // onChange={e => {
                //   handleChange('statusId', e.target.value)
                // }}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                required
                disabled={true}
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
      )}
    </>
  )
}

export default PreviewAudit
