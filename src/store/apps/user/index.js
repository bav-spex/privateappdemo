import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Fetch Employees
export const fetchEmployees = createAsyncThunk('appUsers/fetchEmployees', async params => {
  const response = await axios.get(authConfig.getAllEmployees, {
    params
  })
  console.log('Employees list', response.data.items)

  return response.data
})

// ** Fetch Teachers
export const fetchTeachers = createAsyncThunk('appUsers/fetchTeachers', async params => {
  const response = await axios.get(authConfig.getAllTeachers, {
    params
  })
  console.log('Teachers list', response.data)

  return response.data
})


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    teacherList: [],
    employeesList: [],
    totalTeachers : 1,
    totalEmployees: 1,
    emp_params: {},
    teacher_params: {},
    allTeacherData: [],
    AllEmployeeData : []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employeesList = action.payload.items
      state.totalEmployees = action.payload.medata.totalCount
      state.emp_params = action.payload.medata.pageable
      state.AllEmployeeData = action.payload.medata.totalCount
    }),
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.teacherList = action.payload.items
      state.totalTeachers =  action.payload.medata.totalCount
      state.teacher_params =  action.payload.medata.pageable
      state.allTeacherData =  action.payload.medata.totalCount
    })
  }
})

export default appUsersSlice.reducer
