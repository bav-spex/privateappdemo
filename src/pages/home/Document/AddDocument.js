import React, { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addRisk } from 'src/store/apps/Risks/index'
import { getDocument, edit, saveDocs } from 'src/pages/home/Document/DocService'
import { useRouter } from 'next/router'

//Third party imports
import toast from 'react-hot-toast'

const AddDocument = () => {
  const data = useSelector(state => state.riskList)

  const dispatch = useDispatch()

  //!fetch Documents
  useEffect(() => {
    getDocument(() => {}, setAllDoc)
    console.log('getDocs:', doc)
  }, [])

  //!editDocuments
  useEffect(() => {
    edit(() => {}, setEd)
  }, [])

  //! to save docs

  // useEffect(() => {}, [])
  // const [saveDocs, setSaveDocs] = useState([])
  // ! to select docs
  const setGd = value => {
    let DocSource = value => {
      if (DocSource) {
        setDocs(DocSource)
      }
    }
    console.log('DocsSourceArray:', DocSource)
  }

  const setEdit = value => {
    let editSource = value => {
      if (editSource) {
        setEDocs(editSource)
      }
    }
    console.log('EdidDocs:', EDocs)
  }

  const [doc, setAllDoc] = useState({})
  const [docs, setDocs] = useState([])
  const [ed, setEd] = useState({})
  const [EDocs, setEDocs] = useState([])
  const [save, setSave] = useState({})

  // console.log('allrisk :', allRisk)
  console.log('ED :', ed)

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

  const router = useRouter()
  const docSubmit = values => {
    console.log('values:', values)
    saveDocs(values, () => {}, setSave)
  }

  const AddDocument = () => {
    toast.success('Document Added')
  }

  const upload = e => {
    console.log(e.target.files)
  }

  const gotoCancel = () => {
    router.push(`/home/Document`)
  }

  return (
    <>
      <CardContent>
        {/* {JSON.stringify(data)} */}
        <form onSubmit={handleSubmit(docSubmit)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Add Document</h3>
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
                onClick={AddDocument}
                onSubmit={handleSubmit(docSubmit)}
              >
                Add Document
              </Button>
            </Grid>
          </div>
          <Divider />
          <Grid container spacing={4}>
            <Grid
              item
              sx={{
                width: '40%',
                '@media screen and (max-width:600px)': {
                  flexDirection: 'column',
                  marginLeft: 0
                }
              }}
            >
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  DocumentType
                </InputLabel>
                <Controller
                  name='DocumentType'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      defaultValue={'Management'}
                      fullWidth
                      label={'documenttype'}
                      onChange={e => {
                        // setSelectedRisk(e.target.value)
                        // onChange(e)
                        // setCatRisk(e.target.value)
                        // onChange(e)

                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''> None</MenuItem>
                      <MenuItem value={ed?.data?.doc_type}>{ed?.data?.doc_type}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Document Type  */}
            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>
                <TextField type='text' label='DocumentName' value={ed?.data?.doc_name} />
              </FormControl>
            </Grid>
            {/* end of Documetname */}

            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  FrameWorks
                </InputLabel>

                <Controller
                  name='FrameWorks'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      // defaultValue={'Management'}
                      fullWidth
                      label={'FrameWorks'}
                      onChange={e => {
                        // setSelectedRisk(e.target.value)
                        // onChange(e)
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''> None</MenuItem>
                      <MenuItem value={ed?.data?.framework}> {ed?.data?.framework}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of FrameWorks  */}
            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  Controls
                </InputLabel>

                <Controller
                  name='Controls'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      // defaultValue={'Management'}
                      fullWidth
                      label={'Controls'}
                      onChange={e => {
                        // setSelectedRisk(e.target.value)
                        // onChange(e)
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''> None</MenuItem>
                      <MenuItem value={ed?.data?.control}> {ed?.data?.control}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* //end of controls  */}

            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Additional Stakeholders:
                </InputLabel>
                <Controller
                  name='Additional Stakeholders'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      fullWidth
                      label={'Additional StakeHolders'}
                      onChange={e => {
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None is Selected</MenuItem>
                      {/* <MenuItem value={allRisk.data?.externalreferenceid}>{allRisk.data?.externalreferenceid}</MenuItem> */}
                      {Array.isArray(ed?.data?.additional_stackholder) &&
                        ed?.data?.additional_stackholder.map((e, i) => {
                          return <MenuItem value={e}>{e}</MenuItem>
                        })}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* //end of AdditionalStakeHolders */}
            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  Document Owner
                </InputLabel>

                {/* <Controller
                  name='DocumentOwner'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      // defaultValue={'Management'}
                      fullWidth
                      label={'DocumentOwner'}
                      onChange={e => {
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None</MenuItem>
                    </Select>
                  )}
                /> */}
              </FormControl>
            </Grid>
            {/* end of Document owner*/}
            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Team
                </InputLabel>
                <Controller
                  name='control Regulation'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      fullWidth
                      label={'Team'}
                      onChange={e => {
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None </MenuItem>
                      {Array.isArray(ed?.data?.teams) &&
                        ed?.data?.teams.map((e, i) => {
                          return <MenuItem value={e}>{e}</MenuItem>
                        })}
                    </Select>
                  )}
                />
              </FormControl>
              {/* end of Team  */}
            </Grid>

            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                </InputLabel>

                <TextField type='date' label='creationDate' />
              </FormControl>
              {/* end of creationDate  */}
            </Grid>

            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <TextField type='date' variant='outlined' label='LastReview' />
              </FormControl>
            </Grid>
            {/* end of Last Review */}
            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Review Frequency
                </InputLabel>

                <TextField type='number' variant='outlined' label='ReviewFrequency in Days' />
              </FormControl>
            </Grid>
            {/* end of Review Frequency */}
            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  {/* Next Review Dates */}
                </InputLabel>

                <TextField type='date' label='Next Review Dates' />
              </FormControl>
            </Grid>
            {/* end of next review Dates*/}
            <Grid item sx={{ width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {/* ApprovalDate  */}
                </InputLabel>

                <TextField type='date' variant='outlined' label='ApprovalDate' />
              </FormControl>
            </Grid>
            {/* // end of ApprovalDate */}
            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  ParentDocumnent
                </InputLabel>
                {/* <Controller
                  name='ParentDocument'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      // defaultValue={'Management'}
                      fullWidth
                      label={'ParentDocument'}
                      onChange={e => {
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {/* {Array.isArray(techList) &&
                      techList.map((c, i) => (
                        <MenuItem key={c + i} value={c.lookupId}>
                          {c.lookupName}
                        </MenuItem>
                      ))} */}
                {/* </Select> */}
                {/* )} */}
                {/* >} */}
              </FormControl>
            </Grid>

            {/* end of parent Document  */}

            <Grid item sx={{ width: '40%', marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Document Status
                </InputLabel>
                <Controller
                  name='Document Status'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      fullWidth
                      label={'DocumentStatus'}
                      onChange={e => {
                        setEdit(e.target.value)
                        onChange(e)
                      }}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      <MenuItem value=''>None</MenuItem>
                      <MenuItem value={ed?.data?.status}>{ed?.data?.status}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Documen Status */}
            <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  File
                </InputLabel>
                <TextField type='file' />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  )
}

export default AddDocument
