import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { category } from 'src/store/apps/Risks/RiskService'

export const getriskList = createAsyncThunk('appRisks/getriskList', async params => {
  const response = await axios.get(authConfig.riskListEndPoint, {
    ...params
  })
  console.log('Risk-List - ', response.data)

  return response.data
})

const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    reviewRisk: [],
    risks: []
  },
  reducers: {
    addRisk: (state, { payload }) => {
      state.risks.push(payload)
      console.log('state.risks :', state.risks)
    },
    reviewRisk: (state, { payload }) => {
      state.reviewRisk.push(payload)
    }
  }
})

// export const { addRisk, reviewRisk } = riskSlice.actions

// export const selectAllRisks = state => state.risks
// export const selectReviewRisk = state => state.risk.reviewRisk

// export default riskSlice.reducer

export const { addRisk, reviewRisk } = riskSlice.actions
export const selectRisks = state => state.risks
export const selectReviewRisks = state => state.risks

export const getCatList = createAsyncThunk('appRisks/getCatList', async params => {
  const response = await axios.get(authConfig.riskCategory, {
    ...params
  })
  console.log('cat-List-', response.data)
  return response.data
})
const catSlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {
    addCat: (state, { payload }) => {
      return [...state, payload]
    }
  }
})
export const { addCat } = catSlice.actions
export const selectCat = state => state.category
