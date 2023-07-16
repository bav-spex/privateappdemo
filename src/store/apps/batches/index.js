import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** submite batch

export const submitBatch = createAsyncThunk('appBatches/submitBatch', async params => {
  console.log('params', params)

  let storePayload = { ...params }

  storePayload.facilitators = storePayload.facilitators.map(item => ({
    userId: item.userId,
    name: item.fullName,
    phone: item.mobileNumber,
    emailId: item.primaryEmail,
    status: 'nominated'
  }))
  storePayload.teachers = storePayload.teachers.map(item => ({
    userId: item.userId,
    name: item.fullName,
    phone: item.mobileNumber,
    emailId: item.primaryEmail,
    status: 'nominated'
  }))
  storePayload.observers = storePayload.observers.map(item => ({
    userId: item.userId,
    name: item.fullName,
    phone: item.mobileNumber,
    emailId: item.primaryEmail,
    status: 'nominated'
  }))

  const response = await axios.put(authConfig.submitBatch, {
    ...storePayload
  })
  console.log('Batch status - ', response.data)

  return response.data
})

export const getBatchList = createAsyncThunk('appBatches/getBatchList', async params => {
  const response = await axios.get(authConfig.batchList, {
    ...params
  })
  console.log('Batch list - ', response.data)

  return response.data
})

export const batchSlice = createSlice({
  name: 'appBatches',
  initialState: {
    batchList: [],
    batchSubmissionStatus: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(submitBatch.fulfilled, (state, action) => {
      state.batchSubmissionStatus = action.payload
    }),
      builder.addCase(getBatchList.fulfilled, (state, action) => {
        ;(state.batchList = action.payload.items), (state.medata = action.payload.medata)
      })
  }
})

export default batchSlice.reducer
