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
import authConfig from 'src/configs/auth'

import { getFrameworks, createFramework } from './frameworkService'

//third part imports

const AddFrame = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [name, set_name] = useState('')
  const [parent, set_parent] = useState('')
  const [description, set_description] = useState('')

  useEffect(() => {
    getFrameworks(() => {}, setAll)
  }, [])
  const [all, setAll] = useState([])
  console.log('allf:', all)

  // !button methods
  const gotoCancel = () => {
    router.push(`/home/framework`)
  }
  //!states
  const [fwList, setFwList] = useState([])

  const CreateFrames = async () => {
    let successCallback = response => {
      toast.success('Created FrameWork')
      router.push(`/home/framework`)
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }

    let request_data = {
      id: null,
      framework_Name: name,
      framework_Details: description,
      framework_Parent: parent,
      framework_Status: 'active'
    }
    createFramework(request_data, errorCallback, successCallback)
  }

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

  const frameWorksArray = all
  console.log('Frameworks:', frameWorksArray)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{t('Add FrameWork')}</h3>

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
            onClick={CreateFrames}
          >
            {t('Save')}
          </Button>
        </Grid>
      </div>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <h5>{t('FrameWork Name')}</h5>
          <TextField label='FrameWork Name' fullWidth value={name} onChange={e => set_name(e.target.value)} />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <h5>{t('Parent FrameWork')}</h5>
          <Controller
            name='ParentFrameWork'
            control={control}
            rules={{ required: true }}
            defaultValue={data}
            render={({ field: { value, onChange } }) => (
              <Select
                // value={value}
                value={parent}
                defaultValue={''}
                fullWidth
                label={'ParentFrameWork'}
                onChange={e => {
                  // setSelectedRisk(e.target.value)
                  onChange(e)
                  set_parent(e.target.value)
                }}
                error={Boolean(errors?.msg)}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
              >
                <MenuItem value=''>None</MenuItem>
                {/* <MenuItem value={frameWorksArray?.framework_Name}>{frameWorksArray?.framework_Name}</MenuItem> */}
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
            value={description}
            onChange={e => set_description(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AddFrame
