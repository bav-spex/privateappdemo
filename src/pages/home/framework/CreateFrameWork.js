import React, { useState, useMemo, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { Button, Divider, Select } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useRouter } from 'next/router'
// import { allFrameWorks, fwa } from 'src/pages/home/frameworks/frameworkService'
import { allFrameWorks, fwa } from './frameworkService'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

//third part imports
import toast from 'react-hot-toast'

const AddFrame = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  useEffect(() => {
    fwa(() => {}, setAll)
  }, [])
  const [all, setAll] = useState([])
  console.log('allf:', all)

  // !button methods
  const gotoCancel = () => {
    router.push(`/home/framework`)
  }
  //!states
  const [fwList, setFwList] = useState([])

  const CreateFrames = () => {
    toast.success('Created FrameWork')
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
        <h3>Add FrameWork</h3>

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
            cancel
          </Button>
          <Button
            type='submit '
            size='medium'
            variant='contained'
            style={{ marginLeft: '10px' }}
            onClick={CreateFrames}
          >
            Save
          </Button>
        </Grid>
      </div>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <h5>FrameWork Name</h5>
          <TextField label='FrameWork' fullWidth />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <h5>parent FrameWork</h5>
          <Controller
            name='ParentFrameWork'
            control={control}
            rules={{ required: true }}
            defaultValue={data}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                defaultValue={''}
                fullWidth
                label={'ParentFrameWork'}
                onChange={e => {
                  // setSelectedRisk(e.target.value)
                  // onChange(e)
                }}
                error={Boolean(errors?.msg)}
                labelId='validation-basic-select'
                aria-describedby='validation-basic-select'
              >
                <MenuItem value=''>None</MenuItem>
                {/* <MenuItem value={frameWorksArray?.framework_Name}>{frameWorksArray?.framework_Name}</MenuItem> */}
                {Array.isArray(frameWorksArray) &&
                  frameWorksArray.map((f, i) => {
                    return <MenuItem value={f.id}>{f.framework_Name}</MenuItem>
                  })}
              </Select>
            )}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <h5>Frame work description</h5>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={5}
            placeholder=''
            style={{ width: '100%' }}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AddFrame
