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
import {
  createDocument,
  updateDocument,
  getCategoryData,
  getTeams,
  getUsers,
  getDocumentById,
  convertDateFormat
} from 'src/pages/home/Document/DocService'
import { getControlList } from 'src/pages/home/governance/controls/controlService'
import { useRouter } from 'next/router'

//Third party imports
import toast from 'react-hot-toast'
import { getFrameworks } from '../governance/framework/frameworkService'

const AddDocument = () => {
  const data = useSelector(state => state.riskList)
  const router = useRouter()
  const dispatch = useDispatch()

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

  //!fetch Documents
  /* For Edit document start */
  useEffect(() => {
    if (router.query.keyword != undefined) {
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
          setDocumentStatusIds(doc_obj.status)
          setCreationDate(convertDateFormat(doc_obj.creation_date))
          setLastReviewDate(convertDateFormat(doc_obj.last_review_date))
          setReviewFrequency(doc_obj.review_frequency)
          setNextReviewDate(convertDateFormat(doc_obj.next_review_date))
          setApprovalDate(convertDateFormat(doc_obj.approval_date))
        }
      )
    }

    /* For Edit document end */
    getCategoryData(9, () => {}, setDocTypeList)
    getCategoryData(10, () => {}, setDocumentStatusList)
    getFrameworks(() => {}, setFrameworkList)

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
  }, [])

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

  const saveDocument = () => {
    let request_data = {
      doc_name: doc_name,
      doc_type: doc_type,
      // "framework_ids": frameworkIds,
      framework_ids: [],
      control_ids: controlIds,
      creation_date: creationDate,
      last_review_date: lastReviewDate,
      review_frequency: review_frequency,
      next_review_date: next_review_date,
      approval_date: approval_date,
      approver: document_approver,
      status: documentStatusIds,
      additional_stakeholders: additional_stakeholders,
      teams_id: teams_id
    }
    console.log(JSON.stringify(request_data))
    console.log('doc_id:', doc_id)
    if (doc_id == 0) {
      let errorCallback = response => {
        toast.error('Something went wrong.')
      }

      let successCallback = response => {
        toast.success('Document Added')
        router.push(`/home/Document`)
      }
      createDocument(JSON.stringify(request_data), errorCallback, successCallback)
    } else if (doc_id > 0) {
      let errorCallback = response => {
        toast.error('Something went wrong.')
      }

      let successCallback = response => {
        toast.success('Document updated')
        router.push(`/home/Document`)
      }
      updateDocument(doc_id, JSON.stringify(request_data), errorCallback, successCallback)
    }
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
        <form>
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
                type='button'
                size='medium'
                variant='contained'
                style={{ marginLeft: '10px' }}
                onClick={saveDocument}
              >
                Save
              </Button>
            </Grid>
          </div>
          <Divider />
          <Grid container spacing={4}>
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
                        item !== null ? (
                          <MenuItem key={item.lookupId} value={item.lookupId}>
                            {item.lookupName}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Document Type  */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                {/* <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                >Document Name</InputLabel> */}
                <TextField
                  type='text'
                  label='Document Name'
                  value={doc_name}
                  onChange={e => setDocName(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* end of Documetname */}

            {/* <Grid item sx={{marginBottom: '3vh', width: '40%' }}>
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
                      onChange={(e)=> setFrameworkIds(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {frameworkList.map((item) => (item !== null ?
                        <MenuItem value={item.id}>{item.framework_Name}</MenuItem>: ""
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid> */}
            {/* end of FrameWorks  */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
                      multiple
                      value={controlIds}
                      // defaultValue={'Management'}
                      fullWidth
                      label={'Controls'}
                      onChange={e => setcontrolIds(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {controlList.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item['control-number']}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* //end of controls  */}

            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
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
                      multiple
                      value={additional_stakeholders}
                      fullWidth
                      label={'Additional StakeHolders'}
                      onChange={e => setAdditionalStakeholders(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {user_list.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* //end of AdditionalStakeHolders */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  Document Approver
                </InputLabel>

                <Controller
                  name='control Regulation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={document_approver}
                      fullWidth
                      label={'Document Approver'}
                      onChange={e => setDocumentApprover(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {user_list.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Document Approver*/}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
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
                      multiple
                      value={teams_id}
                      fullWidth
                      label={'Team'}
                      onChange={e => setTeamIds(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {teamList.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
              {/* end of Team  */}
            </Grid>

            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                </InputLabel>

                <TextField
                  type='date'
                  label='Creation Date'
                  InputLabelProps={{ shrink: true }}
                  value={creationDate}
                  onChange={e => setCreationDate(e.target.value)}
                />
              </FormControl>
              {/* end of creationDate  */}
            </Grid>

            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <TextField
                  type='date'
                  variant='outlined'
                  label='Last Review'
                  InputLabelProps={{ shrink: true }}
                  value={lastReviewDate}
                  onChange={e => setLastReviewDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* end of Last Review */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.msg)}
                  htmlFor='validation-basic-select'
                ></InputLabel>

                <TextField
                  type='number'
                  variant='outlined'
                  label='Review Frequency in Days'
                  value={review_frequency}
                  onChange={e => setReviewFrequency(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* end of Review Frequency */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {' '}
                  {/* Next Review Dates */}
                </InputLabel>

                <TextField
                  type='date'
                  label='Next Review Dates'
                  InputLabelProps={{ shrink: true }}
                  value={next_review_date}
                  onChange={e => setNextReviewDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* end of next review Dates*/}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
              <FormControl fullWidth>
                <InputLabel id='validation-basic-select' error={Boolean(errors.msg)} htmlFor='validation-basic-select'>
                  {/* ApprovalDate  */}
                </InputLabel>

                <TextField
                  type='date'
                  variant='outlined'
                  label='Approval Date'
                  InputLabelProps={{ shrink: true }}
                  value={approval_date}
                  onChange={e => setApprovalDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* // end of ApprovalDate */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }} style={{ marginLeft: 'auto' }}>
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
                      value={documentStatusIds}
                      fullWidth
                      label={'DocumentStatus'}
                      onChange={e => setDocumentStatusIds(e.target.value)}
                      error={Boolean(errors?.msg)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {documentStatusList.map(item =>
                        item !== null ? (
                          <MenuItem key={item.id} value={item.lookupId}>
                            {item.lookupName}
                          </MenuItem>
                        ) : (
                          ''
                        )
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* end of Documen Status */}
            <Grid item sx={{ marginBottom: '3vh', width: '40%' }}>
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
