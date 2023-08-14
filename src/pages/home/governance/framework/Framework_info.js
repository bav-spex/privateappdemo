import React, { useState, useMemo, useEffect } from 'react'

import { useTheme } from '@material-ui/core/styles'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { Button, Divider, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import authConfig from 'src/configs/auth'

import withRoot from '../../withRoot'
import { getFrameworkById, getFrameworks } from './frameworkService'

const Framework_info = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [fwDetails, setFwDetails] = useState([])
  const [name, set_name] = useState('')
  const [parent, set_parent] = useState('')
  const [description, set_description] = useState('')

  const fetch_framework_details = async () => {
    const res = await fetch(`${authConfig.frameWorkbyId}/${router.query.keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('framework is', data)
    setFwDetails(data)
    set_name(data.framework_Name)
    set_parent(data.framework_Parent)
    set_description(data.framework_Details)
  }

  useEffect(() => {
    fetch_framework_details()
  }, [])

  // useEffect(() => {
  //   getFrameworkById(() => {}, setFwDetails)
  //   console.log('fwDetails:', fwDetails)
  // }, [])

  const [fwList, setFwList] = useState([])
  //!  to feth Parent fw
  useEffect(() => {
    getFrameworks(() => {}, setFwList)
    console.log('allframeaworks:', fwList)
  }, [])

  const frameWorksArray = fwList
  const frameWorksDetails = fwDetails
  console.log('Frameworks:', frameWorksArray)
  console.log('Frameworks Details:', frameWorksDetails)

  // !button methods
  const gotoCancel = () => {
    router.push(`/home/framework`)
  }
  //!states

  const [cat, setCat] = useState({})

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
      return frameWorksDetails
    }, [frameWorksDetails])
  })

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{t('FrameWork Information')}</h3>

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
        ></Grid>
      </div>

      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <h5>{t('FrameWork Name')}</h5>
          <TextField
            label='FrameWork'
            fullWidth
            //  value={frameWorksDetails.framework_Name}
            value={name}
            onChange={e => set_name(e.target.value)}
            disabled={true}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <h5>{t('Parent FrameWork')}</h5>
          <Controller
            name='ParentFrameWork'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                // value={value}
                value={parent}
                // onChange={(e)=> set_parent(e.target.value)}
                // defaultValue={'Management'}
                fullWidth
                label={'Parent FrameWork'}
                onChange={e => {
                  setSelectedRisk(e.target.value)
                  onChange(e)
                  setCatRisk(e.target.value)
                  onChange(e)
                  set_parent(e.target.value)
                }}
                error={Boolean(errors?.msg)}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
                disabled={true}
              >
                {Array.isArray(frameWorksArray) &&
                  frameWorksArray.map((f, i) => {
                    return (
                      <MenuItem key={f.id} value={f.id}>
                        {f.framework_Name}
                      </MenuItem>
                    )
                  })}
              </Select>
            )}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <h5>{t('Framework description')}</h5>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={5}
            placeholder=''
            style={{ width: '100%' }}
            fullWidth
            // value={frameWorksDetails.framework_Details}
            value={description}
            onChange={e => set_description(e.target.value)}
            disabled={true}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Framework_info
