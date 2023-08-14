// ** Axios
import axios from 'axios'
// ** Config
import authConfig from 'src/configs/auth'

export const fetchCourse = (params, errorCallback, successCallback) => {
  axios
    .post(authConfig.courseEndpoint, params)
    .then(res => {
      if (res.data.error) {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const fetchTrainingLocations = (params, errorCallback, successCallback) => {
  axios
    .post(authConfig.trainingLocationEndpoint, params)
    .then(res => {
      if (res.data.error) {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getAllTeacher = (params, errorCallback, successCallback) => {
  axios
    .get(authConfig.getAllTeachers, params)
    .then(res => {
      if (res.data.error) {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getAllEmployees = (params, errorCallback, successCallback) => {
  axios
    .get(authConfig.getAllEmployees, params)
    .then(res => {
      if (res.data.error) {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
