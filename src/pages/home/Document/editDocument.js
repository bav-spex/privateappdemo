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
import { getCategoryData, getTeams, getUsers, getDocumentById } from 'src/pages/home/Document/DocService'
import { fwa } from 'src/pages/home/framework/frameworkService'
import { getControlList } from 'src/pages/home/governance/controls/controlService'
import { useRouter } from 'next/router'

//Third party imports
import toast from 'react-hot-toast'

const EditDocument = () => {
  const router = useRouter()
  const data = useSelector(state => state.riskList)

  const [doc_id, setDocId] = useState(0)
  const [document_object, setDocumentObject] = useState({})

  const [frameworkIds, setFrameworkIds] = useState([])
  const [frameworkList, setFrameworkList] = useState([])
  const [controlIds, setcontrolIds] = useState([])
  const [controlList, setControlList] = useState([])
  const [doc_name, setDocName] = useState('')
  const [doc_type, setDocType] = useState('')
  const [docTypeList, setDocTypeList] = useState([])
  const [additional_stakeholders, setAdditionalStakeholders] = useState([])
  const [teams_id, setTeamIds] = useState([])
  const [teamList, setTeamList] = useState([])
  const [documentStatusList, setDocumentStatusList] = useState([])
  const [documentStatusIds, setDocumentStatusIds] = useState('')
  const [document_approver, setDocumentApprover] = useState('')
  const [user_list, setUserList] = useState([])
  const [creationDate, setCreationDate] = useState('')
  const [lastReviewDate, setLastReviewDate] = useState('')
  const [review_frequency, setReviewFrequency] = useState('')
  const [next_review_date, setNextReviewDate] = useState('')
  const [approval_date, setApprovalDate] = useState('')

  const dispatch = useDispatch()

  //!fetch Documents
  useEffect(() => {
    getCategoryData(9, () => {}, setDocTypeList)
    setDocId(router.query.keyword)
    getDocumentById(
      router.query.keyword,
      () => {},
      response => {
        const doc_obj = response.data
        console.log('doc_obj res:', doc_obj)
        setDocumentObject(doc_obj)
        setDocType(doc_obj.doc_type)
        setDocName(doc_obj.doc_name)
        setFrameworkIds(doc_obj.framework_ids)
        setcontrolIds(doc_obj.control_ids)
        setAdditionalStakeholders(doc_obj.additional_stakeholders)
        setDocumentApprover(doc_obj.approver)
        setTeamIds(doc_obj.teams_id)
      }
    )

    getCategoryData(9, () => {}, setDocTypeList)
    getCategoryData(10, () => {}, setDocumentStatusList)
    fwa(() => {}, setFrameworkList)

    let controlSuccessCallback = response => {
      setControlList(response.data.controls)
    }
    getControlList(() => {}, controlSuccessCallback)

    let teamSuccessCallback = response => {
      setTeamList(response.data.users)
    }
    getTeams(() => {}, teamSuccessCallback)
    getUsers(
      () => {},
      response => {
        setUserList(response.data.users)
      }
    )
    console.log('document_object:', document_object)
  }, [])

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

  const onSubmit = values => {
    dispatch(addRisk(values))
    saveRisk(values, () => {}, setSaveRisk)
    console.log('values:', values)
  }
  const AddDocument = () => {
    toast.success('Document edited')
  }

  const upload = e => {
    console.log(e.target.files)
  }
  const gotoCancel = () => {
    router.push(`/home/Document`)
  }
  return (
    <>
      {/* <Grid
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
        style={{ justifyContent: 'space-between', display: 'flex' }}
      >
        <Button xs={2} variant='contained' size='medium' style={{ marginLeft: '70%' }} onClick={gotoCancel}>
          cancel
        </Button>
        <Button type='submit ' size='medium' variant='contained' style={{}} onClick={AddDocument}>
          Edit Document
        </Button>
      </Grid> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Edit Document</h3>

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
          <Button type='submit ' size='medium' variant='contained' style={{ marginLeft: '10px' }} onClick={AddDocument}>
            save
          </Button>
        </Grid>
      </div>

      <Divider />
      <CardContent>
        {/* {JSON.stringify(data)} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid
              item
              sx={{
                width: '40%',
                marginBottom: '3vh',
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
                      value={doc_type}
                      fullWidth
                      label={'documenttype'}
                      onChange={e => setDocType(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {docTypeList.map(item =>
                        item !== null ? <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem> : ''
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Document Type  */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>
                <TextField type='text' label='DocumentName' value={doc_name} />
              </FormControl>
            </Grid>
            {/* end of Documetname */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
                      multiple
                      value={frameworkIds}
                      defaultValue={''}
                      fullWidth
                      label={'FrameWorks'}
                      onChange={e => setFrameworkIds(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {frameworkList.map(item =>
                        item !== null ? <MenuItem value={item.id}>{item.framework_Name}</MenuItem> : ''
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of FrameWorks  */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
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
                      fullWidth
                      label={'Controls'}
                      onChange={e => {
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
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  Document Owner
                </InputLabel>

                <Controller
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
                />
              </FormControl>
            </Grid>
            {/* end of Document owner*/}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                </InputLabel>

                <TextField type='text' label='creationDate' value={ed?.data?.creation_date} />
              </FormControl>
              {/* end of creationDate  */}
            </Grid>
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <TextField type='text' variant='outlined' label='LastReview' value={ed?.data?.last__review_date} />
              </FormControl>
            </Grid>
            {/* end of Last Review */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  Review Frequency
                </InputLabel>

                <TextField type='number' variant='outlined' label='ReviewFrequency in Days' />
              </FormControl>
            </Grid>
            {/* end of Review Frequency */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  {/* Next Review Dates */}
                </InputLabel>

                <TextField type='type' label='Next Review Dates' value={ed?.data?.next__review_date} />
              </FormControl>
            </Grid>
            {/* end of next review Dates*/}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {/* ApprovalDate  */}
                </InputLabel>

                <TextField type='text' variant='outlined' label='ApprovalDate' value={ed?.data?.approval_date} />
              </FormControl>
            </Grid>
            {/* // end of ApprovalDate */}
            {/* <Grid item sx={{ width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  ParentDocumnent
                </InputLabel>
                <Controller
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
            {/* </Select>
                  )}
                />
              </FormControl>
            </Grid> */}

            {/* end of parent Document  */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
            <Grid item sx={{ marginBottom: '3vh', width: '40%', marginLeft: 'auto' }}>
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

export default EditDocument
