import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

export const appBatchesSlice = createSlice({
  name: 'createBatch',
  initialState: {
    facilitators: [],
    teachers: [],
    observers: [],
    step: 0
  },
  reducers: {
    updateSchedule: (state, action) => {
      console.log('State in reduces', { ...current(state), ...action.payload })

      return { ...state, ...action.payload }
    },
    updateBatch: (state, action) => {
      console.log('State in reduces', current(state))

      return { ...state, ...action.payload }
    },
    resetBatch: (state, action) => {
      console.log('State in reduces', current(state))

      return {
        ...state,
        ...{
          facilitators: [],
          teachers: [],
          observers: [],
          step: 0
        }
      }
    }
  }
})

export const { updateSchedule, updateBatch, resetBatch } = appBatchesSlice.actions

export default appBatchesSlice.reducer
