import React, { useState, useMemo, useEffect } from 'react'

import { useTheme } from '@material-ui/core/styles'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { Button, Divider, Select } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getFrameworkById, getFrameworks, updateFramework } from './frameworkService'

const EditFrame = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [fwDetails, setFwDetails] = useState([])
  const [name, set_name] = useState('')
  const [parent, set_parent] = useState('')
  const [description, set_description] = useState('')

  const fetch_framework_details = async () => {
    let successCallback = response => {
      setFwDetails(response)
      set_name(response.framework_Name)
      set_parent(response.framework_Parent)
      set_description(response.framework_Details)
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }
    getFrameworkById(router.query.keyword, errorCallback, successCallback)
  }

  const edit_framework = async () => {
    let successCallback = response => {
      toast.success('FrameWork Edited')
      router.push(`/home/framework`)
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }

    let request_data = {
      id: router.query.keyword,
      framework_Name: name,
      framework_Details: description,
      framework_Parent: parent,
      framework_Status: 'active'
    }
    updateFramework(router.query.keyword, request_data, errorCallback, successCallback)
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
        <h3>{t('Edit FrameWork')}</h3>

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
            onClick={edit_framework}
          >
            {t('Save')}
          </Button>
        </Grid>
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
                  // setSelectedRisk(e.target.value)
                  onChange(e)
                  // setCatRisk(e.target.value)
                  // onChange(e)
                  set_parent(e.target.value)
                }}
                error={Boolean(errors?.msg)}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
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
          />
        </Grid>
      </Grid>
    </>
  )
}

export default EditFrame
